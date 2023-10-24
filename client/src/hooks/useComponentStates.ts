import { useComponentValue } from '@dojoengine/react';
import { EntityIndex } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { useDojo } from '../DojoContext';
import { getEntityIdFromKeys } from '../dojo/createSystemCalls';
import { Coordinate } from '../type/GridElement';
import { MobType } from '../ui/Mob';
import { useElementStore } from '../utils/store';

export enum TileType {
  Ground,
  Water,
  Boat,
//   Hole,
//   Knight,
//   Barbarian,
//   Bowman,
//   Wizard,
}

interface Boat {
  health?: number;
  position?: Coordinate;
  direction?: Coordinate;
  hitter?: number;
}

const mobFromIndex = ['ground', 'water', 'Knight'];

const createBoat = (type: string, health?: number, mob_position?: Coordinate, mob_direction?: Coordinate, hitter?: number): Boat => {
  //console.log(type, health, mob_position?.x, mob_position?.y, 'hitter', mobFromIndex[hitter ? hitter : 0], hit);
  return { health, position: mob_position, direction: mob_direction, hitter };
};

const getHitter = (
  boat_1: Boat | undefined,
  boat_2: Boat | undefined,
): number => {
  if (boat_1 && boat_1.hitter && boat_1.hitter !== 0) return boat_1.hitter;
  else if (boat_2 && boat_2.hitter && boat_2.hitter !== 0) return boat_2.hitter;
  return 0;
};

// const getHitPosition = (
//   hitMob: MobType | undefined,
//   knight_position: Coordinate | undefined,
//   barbarian_position: Coordinate | undefined,
//   wizard_position: Coordinate | undefined,
//   bowman_position: Coordinate | undefined
// ): Coordinate | undefined => {
//   if (hitMob === undefined) return undefined;
//   else if (hitMob === 'knight' && knight_position) return knight_position;
//   else if (hitMob === 'barbarian' && barbarian_position) return barbarian_position;
//   else if (hitMob === 'wizard' && wizard_position) return wizard_position;
//   else if (hitMob === 'bowman' && bowman_position) return bowman_position;

//   return undefined;
// };

export const useComponentStates = () => {
  const {
    setup: {
      components: { Game, Boat, Tile },
    },
  } = useDojo();

  const { ip, hit_mob } = useElementStore((state) => state);
  console.log('ip', ip);
//   const computed = getEntityIdFromKeys([
//     BigInt(ip),
//   ]);
//   console.log('computed', computed);

  const entityId = ip as EntityIndex;
//   const entityId = undefined as EntityIndex;
  
  const game = useComponentValue(Game, entityId);

  const [hitPosition, setHitPosition] = useState<Coordinate | undefined>(undefined);

//   useEffect(() => {
//     const a = getHitPosition(hit_mob, knight_position, barbarian_position, wizard_position, bowman_position);
//     setHitPosition(a);
//   }, [hit_mob]);

  useEffect(() => {
    console.log('game', game);
  }, [game]);
  console.log('game', game);
  const entityId2 = game?.game_id as EntityIndex;
  const map = useComponentValue(Map, entityId2);
  console.log('map', map);

  // ===================================================================================================================
  // BOAT
  const boat = useComponentValue(
    Boat,
    getEntityIdFromKeys([game?.game_id ? BigInt(game?.game_id) : BigInt(0), BigInt(TileType.Boat)])
  );

  console.log('boat', boat);
  let entityId3 = 0 as EntityIndex;
  if (game && game.game_id !== undefined && map && map.level !== undefined && boat && boat.index !== undefined)
    entityId3 = getEntityIdFromKeys([
      game?.game_id ? BigInt(game?.game_id) : BigInt(0),
      BigInt(map?.level),
      BigInt(boat?.index),
    ]);
  const boat_position = useComponentValue(Tile, entityId3);

  return {
    game: { id: game?.game_id, over: game?.over, seed: game?.seed },
    map: { level: map?.level, size: map?.size, spawn: map?.spawn, score: map?.score, over: map?.over, name: map?.name },
    boat: createBoat('classic', 1000, { x: 0.75, y: 0.75 }, undefined), //boat_position, boat?.hitter),
    hitter: getHitter(boat, undefined),
    hitPosition,
  };
};
