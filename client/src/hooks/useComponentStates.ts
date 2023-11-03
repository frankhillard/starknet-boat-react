import { useComponentValue } from '@dojoengine/react';
import { EntityIndex } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { useDojo } from '../DojoContext';
import { getEntityIdFromKeys } from '../dojo/createSystemCalls';
import { Coordinate } from '../type/GridElement';
import { MobType } from '../ui/Mob';
import { useElementStore } from '../utils/store';

export enum TileType {
  Water,
  Ground,
  Boat,
}

interface Boat {
  health?: number;
  position?: Coordinate;
  direction?: Coordinate;
  hitter?: number;
}

const mobFromIndex = ['ground', 'water', 'Knight'];

const createBoat = (type: string, health?: number, mob_position?: Coordinate, mob_direction?: Coordinate): Boat => {
  //console.log(type, health, mob_position?.x, mob_position?.y, 'hitter', mobFromIndex[hitter ? hitter : 0], hit);
  return { health, position: mob_position, direction: mob_direction };
};

export const useComponentStates = () => {
  const {
    setup: {
      components: { Game, Boat, Tile, Map },
    },
    account: { create, list, select, account, isDeploying }
  } = useDojo();

  const { ip, hit_mob, map: map_store, position, add_hole, reset_holes, set_size, set_wind } = useElementStore((state) => state);
  // console.log('ip', ip);

  // ===================================================================================================================
  // GAME

  let entityId = undefined as EntityIndex;
  if (ip) {
    // console.log('ip (hex)', ip?.toString(16) as EntityIndex);
    const ip_hex = ip?.toString(16) as EntityIndex;
    entityId = `0x${ip_hex}`;
  } else {
    entityId = `0x0`;
  }
  const game = useComponentValue(Game, entityId);
  // console.log('[useComponentSates] game', game);

  useEffect(() => {
    // console.log('[useComponentSates] game (use effect)', game);
  }, [game]);
  
  // ===================================================================================================================
  // MAP

  const entityId2 = "0x0" as EntityIndex; //game?.game_id as EntityIndex;
  // console.log('[useComponentSates] entityId2', entityId2);

  const map = useComponentValue(Map, entityId2);
  useEffect(() => {
    // console.log('[useComponentSates] map (use effect)', map);
    if (map !== undefined)
      set_size(map.length);
  }, [map]);
  // console.log('[useComponentSates] map', map);

  // ===================================================================================================================
  // BOAT
 
  // console.log('account', account);
  const boat = useComponentValue(
    Boat,
    account.address
    // getEntityIdFromKeys([game?.game_id ? BigInt(game?.game_id) : BigInt(0), BigInt(TileType.Boat)])
  );

  useEffect(() => {
    // console.log('[useComponentSates] boat (use effect)', boat);
    // if (boat !== undefined)
    //   set_position(boat?.vec);
  }, [boat]);

  const boat_position = (boat !== undefined) ? boat.vec : {x: 0, y: 0};

  return {
    game: { id: game?.game_id, over: game?.over, seed: game?.seed },
    map: { level: 0, size: 4, spawn: 0, score: 0, over: 0, name: "toto" },
    // map: { level: map?.level, size: map?.size, spawn: map?.spawn, score: map?.score, over: map?.over, name: map?.name },
    boat: createBoat('classic', 1000, boat_position),
  };
};
