import { SetupNetworkResult } from "./setupNetwork";
import { Account } from "starknet";
import { poseidonHashMany } from 'micro-starknet';
import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { updatePositionWithDirection } from "../utils";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Boat, Game, Moves }: ClientComponents
) {

    const create = async (
        signer: Account, 
        ip: number,
        seed: number,
        pseudo: string
    ) => {
        console.log("CREAAATE");
        // const entityId = signer.address.toString() as EntityIndex;
        console.log('who', BigInt(ip).toString(16));


        // const gameId = uuid();
        // Game.addOverride(gameId, {
        //     entity: entityId,
        //     value: { game_id: gameId, over: 0, seed: seed },
        // });

        try {
            const tx = await execute(signer, "actions", 'create', [ip, seed, pseudo]);
            const events = getEvents(
                await signer.waitForTransaction(tx.transaction_hash,
                    { retryInterval: 100 }
                )
            );
            console.log('events', events);
            
            
            setComponentsFromEvents(contractComponents, events);

        } catch (e) {
            console.log(e)
            //Game.removeOverride(gameId);
        } finally {
            //Game.removeOverride(gameId);
        }
    };

    const spawn = async (signer: Account) => {
        console.log("SPAWWWWN");
        const entityId = signer.address.toString() as EntityIndex;

        const positionId = uuid();
        Boat.addOverride(positionId, {
            entity: entityId,
            value: { x: 10, y: 10 },
        });

        const movesId = uuid();
        Moves.addOverride(movesId, {
            entity: entityId,
            value: { remaining: 10 },
        });

        try {
            const tx = await execute(signer, "actions", 'spawn', []);
            setComponentsFromEvents(contractComponents,
                getEvents(
                    await signer.waitForTransaction(tx.transaction_hash,
                        { retryInterval: 100 }
                    )
                )
            );

        } catch (e) {
            console.log(e)
            Boat.removeOverride(positionId);
            Moves.removeOverride(movesId);
        } finally {
            Boat.removeOverride(positionId);
            Moves.removeOverride(movesId);
        }
    };

    const move = async (signer: Account, direction: Direction) => {
        const entityId = signer.address.toString() as EntityIndex;

        const positionId = uuid();
        Boat.addOverride(positionId, {
            entity: entityId,
            value: updatePositionWithDirection(direction, getComponentValue(Boat, entityId)),
        });

        const movesId = uuid();
        Moves.addOverride(movesId, {
            entity: entityId,
            value: { remaining: (getComponentValue(Moves, entityId)?.remaining || 0) - 1 },
        });

        try {
            const tx = await execute(signer, "actions", "move", [direction]);
            setComponentsFromEvents(contractComponents,
                getEvents(
                    await signer.waitForTransaction(tx.transaction_hash,
                        { retryInterval: 100 }
                    )
                )
            );

        } catch (e) {
            console.log(e)
            Boat.removeOverride(positionId);
            Moves.removeOverride(movesId);
        } finally {
            Boat.removeOverride(positionId);
            Moves.removeOverride(movesId);
        }

    };

    return {
        create,
        spawn,
        move
    };
}

export enum Direction {
    Left = 1,
    Right = 2,
    Up = 3,
    Down = 4,
}

// DISCUSSION: MUD expects Numbers, but entities in Starknet are BigInts (from poseidon hash)
// so I am converting them to Numbers here, but it means that there is a bigger risk of collisions
export function getEntityIdFromKeys(keys: bigint[]): EntityIndex {
    if (keys.length === 1) {
    return parseInt(keys[0].toString()) as EntityIndex;
    }
    // calculate the poseidon hash of the keys
    const poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
    return parseInt(poseidon.toString()) as EntityIndex;
}