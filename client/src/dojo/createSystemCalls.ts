import { SetupNetworkResult } from "./setupNetwork";
import { Account, shortString } from "starknet";
import { poseidonHashMany } from 'micro-starknet';
// import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { Component, Components, EntityIndex, Schema, getComponentValue, setComponent, updateComponent } from '@latticexyz/recs';
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { updatePositionWithDirection } from "../utils";
import { getEvents } from "@dojoengine/utils";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import { Vec2 } from "../generated/graphql";
import { TileType } from '../hooks/useComponentStates';
import Boat from "../ui/Boat";

export type SystemCalls = ReturnType<typeof createSystemCalls>;
let Number_of_holes = 0;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Boat, Game, Moves, Map }: ClientComponents
) {

    const create = async (
        signer: Account, 
        ip: number,
        seed: number,
        pseudo: string,
        add_hole: (x: number, y: number) => void,
        set_size: (size: number) => void,
        set_wind: (x: number, y: number, force: number, wx: number, wy: number) => void,
    ) => {
        console.log("CREAAATE");
        const entityId = signer.address.toString() as EntityIndex;
        console.log('who', BigInt(ip).toString(16));


        // const gameId = uuid();
        // Game.addOverride(gameId, {
        //     entity: entityId,
        //     value: { game_id: gameId, over: 0, seed: seed },
        // });

        // const mapId = uuid();
        // Map.addOverride(mapId, {
        //     entity: entityId,
        //     value: { game_id: 0, over: 0, seed: seed },
        // });

        try {
            const tx = await execute(signer, "actions", 'create', [ip, seed, pseudo]);
            const events = getEvents(
                await signer.waitForTransaction(tx.transaction_hash,
                    { retryInterval: 100 }
                )
            );
            console.log('events', events);
            if (events.length !== 0) {
                const transformed_events = await setComponentsFromEvents(contractComponents, events);
                // setComponentsFromEvents(contractComponents, events);
                await executeEvents(transformed_events, add_hole, set_size, set_wind);
            }
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

        // const positionId = uuid();
        // Boat.addOverride(positionId, {
        //     entity: entityId,
        //     value: { x: 10, y: 10 },
        // });

        // const movesId = uuid();
        // Moves.addOverride(movesId, {
        //     entity: entityId,
        //     value: { remaining: 10 },
        // });

        try {
            const tx = await execute(signer, "actions", 'spawn', []);
            const events = getEvents(
              await signer.waitForTransaction(tx.transaction_hash,
                  { retryInterval: 100 }
                )
            );
            console.log('spawnevents', events);
            const transformed_events = await setComponentsFromEvents(contractComponents, events);
            // setComponentsFromEvents(contractComponents, events);
            await executeEvents(transformed_events, undefined, undefined, undefined);

            // setComponentsFromEvents(contractComponents,
            //     getEvents(
            //         await signer.waitForTransaction(tx.transaction_hash,
            //             { retryInterval: 100 }
            //         )
            //     )
            // );

        } catch (e) {
            console.log(e)
            // Boat.removeOverride(positionId);
            // Moves.removeOverride(movesId);
        } finally {
            // Boat.removeOverride(positionId);
            // Moves.removeOverride(movesId);
        }
    };

    const move = async (
      signer: Account, 
      direction: Direction, 
    ) => {
        const entityId = signer.address.toString() as EntityIndex;
        console.log("MOOOOVE");
        // const positionId = uuid();
        // Boat.addOverride(positionId, {
        //     entity: entityId,
        //     value: updatePositionWithDirection(direction, getComponentValue(Boat, entityId)),
        // });

        const movesId = uuid();
        Moves.addOverride(movesId, {
            entity: entityId,
            value: { remaining: (getComponentValue(Moves, entityId)?.remaining || 0) - 1 },
        });

        try {
            const tx = await execute(signer, "actions", "move", [direction]);
            const events = getEvents(
              await signer.waitForTransaction(tx.transaction_hash,
                  { retryInterval: 100 }
                )
            );
            console.log('moveevents', events);
            const transformed_events = await setComponentsFromEvents(contractComponents, events);
            // setComponentsFromEvents(contractComponents, events);
            await executeEvents(transformed_events, undefined, undefined);

        } catch (e) {
            console.log(e)
            // Boat.removeOverride(positionId);
            Moves.removeOverride(movesId);
        } finally {
            // Boat.removeOverride(positionId);
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

function hexToAscii(hex: string) {
    let str = '';
    for (let n = 2; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function toHex(str: string) {
  let result = '';
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}


export async function executeEvents(
    events: TransformedEvent[],
    add_hole: (x: number, y: number) => void,
    set_size: (size: number) => void,
    set_wind: (x: number, y: number, force: number, wx: number, wy: number) => void
    // set_position: (x: number, y: number) => void,
    // reset_holes: () => void,
    // set_hit_mob: (mob: MobType) => void,
    // set_turn: (mob: TileType) => void
  ) {
    const gameEvents = events.filter((e): e is GameEvent & ComponentData => e.type === 'Game');
    // console.log('gameEvents', gameEvents);
    for (const e of gameEvents) {
      setComponent(e.component, e.entityIndex, e.componentValues);
    }
  
    const boatEvents = events.filter((e): e is BoatEvent & ComponentData => e.type === 'Boat');
    console.log('boatEvents', boatEvents);
    for (const e of boatEvents) {
      // set_position(e.vec.x, e.vec.y);
      console.log('[executeEvents] Boat', e.entityIndex, e.componentValues, e);
      // console.log('[executeEvents] Boat', {vec: {x: e.vec.x, y: e.vec.y}, direction: {x: e.direction.x, y: e.direction.y} });
      // setComponent(e.component, e.entityIndex, {vec: {x: e.vec.x, y: e.vec.y}, direction: {x: e.direction.x, y: e.direction.y} });
      setComponent(e.component, e.entityIndex, {position_x: e.vec.x, position_y: e.vec.y, dx: e.direction.x, dy: e.direction.y });
      // setComponent(e.component, e.entityIndex, e.componentValues);

      // const result = getComponentValue(Boat, e.entityIndex);
      // console.log('[executeEvents] verify Boat', result);
    }

    const mapEvents = events.filter((e): e is MapEvent & ComponentData => e.type === 'Map');
    // console.log('mapEvents', mapEvents);
    for (const e of mapEvents) {
        console.log("[executeEvents] SET SIZE", e.size);
        set_size(e.size);
  
    //   Map_size = e.size;
    //   if (e.spawn === 0) {
    //     reset_holes();
    //   }
        setComponent(e.component, e.entityIndex, e.componentValues);
    }
  
    const tileEvents = events.filter((e): e is TileEvent & ComponentData => e.type === 'Tile');
    // console.log('tileEvents', tileEvents);
    for (const e of tileEvents) {
      if (e._type === TileType.Ground) {
        console.log("[executeEvents] ADD HOLE", e.x, e.y);
        add_hole(e.x, e.y);
        Number_of_holes++;
      }
      setComponent(e.component, e.entityIndex, e.componentValues);
    }

    const windEvents = events.filter((e): e is WindEvent & ComponentData => e.type === 'Wind');
    // console.log('windEvents', windEvents);
    for (const e of windEvents) {
        console.log("[executeEvents] SET WIND", e.x, e.y, e.force, e.wx, e.wy);
        set_wind(e.x, e.y, e.force, e.wx, e.wy);
        setComponent(e.component, e.entityIndex, e.componentValues);
    }

    // const otherEvents = events;
    // // console.log('gameEvents', gameEvents);
    // for (const e of otherEvents) {
    //   setComponent(e.component, e.entityIndex, e.componentValues);
    // }

  
    await sleep(1000);
  }
  
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  type MapEvent = ComponentData & {
    type: 'Map';
    game_id: number;
    level: number;
    size: number;
    spawn: number;
    score: number;
    over: boolean;
    name: string;
  };
  
  function handleMapEvent(
    keys: bigint[],
    values: string[]
  ): Omit<MapEvent, 'component' | 'componentValues' | 'entityIndex'> {
    const [game_id] = keys;
    const [level, size, spawn, score, over, name] = values;
    console.log(
      `[Map: KEYS: (game_id: ${game_id}) - VALUES: (level: ${level}, size: ${size}, spawn: ${spawn}, score: ${Number(
        score
      )}), over: ${Boolean(Number(over))}, name: ${name}]`
    );
  
    return {
      type: 'Map',
      game_id: Number(game_id),
      level: Number(level),
      size: Number(size),
      spawn: Number(spawn),
      score: Number(score),
      over: Boolean(over),
      name: "Default", //shortString.decodeShortString(name),
    };
  }

  type GameEvent = ComponentData & {
    type: 'Game';
    player_id: number;
    game_id: number;
    over: boolean;
    seed: number;
  };
  
  function handleGameEvent(
    keys: bigint[],
    values: string[]
  ): Omit<GameEvent, 'component' | 'componentValues' | 'entityIndex'> {
    const [player_id] = keys.map((k) => Number(k));
    const [game_id, over, seed] = values.map((v) => Number(v));
    console.log(
      `[Game: KEYS: (player_id: ${player_id}) - VALUES: (game_id: ${game_id}, over: ${Boolean(over)}, seed: ${seed}, )]`
    );
    return {
      type: 'Game',
      player_id,
      game_id,
      over: Boolean(over),
      seed,
    };
  }

  type BoatEvent = ComponentData & {
    type: 'Boat';
    player: string;
    vec: Vec2;
    direction: Vec2;
  };

  
  function handleBoatEvent(
    keys: bigint[],
    values: string[]
  ): Omit<BoatEvent, 'component' | 'componentValues' | 'entityIndex'> {
    console.log("handleBoatEvent", values);
    const [player] = keys.map((k) => k.toString(16));
    const [x, y, dir_x, dir_y] = values.map((v) => BigInt(v));
    console.log(
      `[Boat: KEYS: (player: ${player}) - VALUES: (x: ${x}, y: ${y}, dir_x: ${dir_x}, dir_y: ${dir_y} )]`
    );
    return {
      type: 'Boat',
      player,
      vec: {x: x, y: y},
      direction: {x: dir_x, y: dir_y},
    };
  }



  type TileEvent = ComponentData & {
    type: 'Tile';
    game_id: number;
    index: number;
    _type: number;
    x: number;
    y: number;
  };

  
  function handleTileEvent(
    keys: bigint[],
    values: string[]
  ): Omit<TileEvent, 'component' | 'componentValues' | 'entityIndex'> {
    console.log("handleTileEvent", values);
    const [game_id,  index] = keys.map((k) => Number(k));
    const [_type, x, y] = values.map((v) => Number(v));
    console.log(
      `[Tile: KEYS: (game_id: ${game_id},index: ${index}) - VALUES: (_type: ${_type}, x: ${x}, y: ${y})]`
    );
    return {
      type: 'Tile',
      game_id,
      index,
      _type,
      x,
      y
    };
  }



  type WindEvent = ComponentData & {
    type: 'Wind';
    game_id: number;
    x: number;
    y: number;
    wx: number;
    wy: number;
    force: number;
  };

  
  function handleWindEvent(
    keys: bigint[],
    values: string[]
  ): Omit<WindEvent, 'component' | 'componentValues' | 'entityIndex'> {
    console.log("handleWindEvent", values);
    const [game_id, x, y] = keys.map((k) => Number(k));
    const [wx, wy, force] = values.map((v) => Number(v));
    console.log(
      `[Wind: KEYS: (game_id: ${game_id},x: ${x}, y: ${y}) - VALUES: (wx: ${wx}, wy: ${wy}, force:${force})]`
    );
    return {
      type: 'Wind',
      game_id,
      x,
      y, 
      wx,
      wy, 
      force
    };
  }




type ComponentData = {
    component: Component;
    componentValues: Schema;
    entityIndex: EntityIndex;
  };
  
  type TransformedEvent = GameEvent | MapEvent | TileEvent | BoatEvent | WindEvent | ComponentData;
  
  export async function setComponentsFromEvents(components: Components, events: Event[]): Promise<TransformedEvent[]> {
    const transformedEvents = [];
    for (const event of events) {
      const componentName = hexToAscii(event.data[0]);
      const keysNumber = parseInt(event.data[1]);
      const keys = event.data.slice(2, 2 + keysNumber).map((key) => BigInt(key));
      let index = 2 + keysNumber + 1;
      const numberOfValues = parseInt(event.data[index++]);
      const values = event.data.slice(index, index + numberOfValues);
  
      // Component
      const component = components[componentName];
      const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
        const value = values[index];
        acc[key] = Number(value);
        return acc;
      }, {});
      const entity = getEntityIdFromKeys(keys);

      const baseEventData = {
        component,
        componentValues,
        entityIndex: entity,
      };
  
      switch (componentName) {
        case 'Map':
            transformedEvents.push({ ...handleMapEvent(keys, values), ...baseEventData });
            break;
        case 'Game':
            transformedEvents.push({ ...handleGameEvent(keys, values), ...baseEventData });
            break;
        case 'Boat':
            transformedEvents.push({ ...handleBoatEvent(keys, values), ...baseEventData });
            break;
        case 'Tile':
            transformedEvents.push({ ...handleTileEvent(keys, values), ...baseEventData });
            break;
        case 'Wind':
            transformedEvents.push({ ...handleWindEvent(keys, values), ...baseEventData });
            break;
        default:

      }
    }
  
    return transformedEvents;
  }
  