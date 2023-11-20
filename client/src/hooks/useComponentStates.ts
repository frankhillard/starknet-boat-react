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
      components: { Game, Boat, Tile, Map, Wind },
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
    console.log('[useComponentSates] game (use effect)', game);
  }, [game]);
  
  // ===================================================================================================================
  // MAP
  const entityId2 = 0x0 as EntityIndex; //game?.game_id as EntityIndex;
  // console.log('[useComponentSates] entityId2', entityId2);
  const map = useComponentValue(Map, entityId2);
  useEffect(() => {
    console.log('[useComponentSates] map (use effect)', map);
  }, [map]);
  // console.log('[useComponentSates] map', map);




// ===================================================================================================================
  // Tile

  // const entityId3 = "0x0" as EntityIndex; //game?.game_id as EntityIndex;
  // // console.log('[useComponentSates] entityId2', entityId2);

  // const tile = useComponentValue(Tile, entityId3);
  // useEffect(() => {
  //   // console.log('[useComponentSates] map (use effect)', map);
  //   if (tile !== undefined)
  //     set_size(map.length);
  // }, [tile]);

  // ===================================================================================================================
  // BOAT
 
  // console.log('account', account);
  const boat = useComponentValue(
    Boat,
    account.address
    // getEntityIdFromKeys([game?.game_id ? BigInt(game?.game_id) : BigInt(0), BigInt(TileType.Boat)])
  );

  useEffect(() => {
    console.log('[useComponentSates] boat (use effect)', boat);
    const prime = BigInt("3618502788666131213697322783095070105623107215331596699973092056135872020480");
    
    if (boat !== undefined) {
      const boat_position = {
        x: boat.position_x / BigInt(Math.pow(2, 64)), 
        y: boat.position_y / BigInt(Math.pow(2, 64))
      };
      console.log('retrieve boat position (use effect)', boat_position);
      // const boat_direction = (boat !== undefined) ? {
      //   x: boat.dx / BigInt(Math.pow(2, 64)), 
      //   y: boat.dy / BigInt(Math.pow(2, 64))} : {x: 0, y: 1};

      // console.log('retrieve boat direction (use effect)', boat_direction);
    }
      // set_position(boat?.vec);
  }, [boat]);

  // console.log('[useComponentSates] boat ', boat);
  // if (boat !== undefined) {
  // const tt = boat.position_x / BigInt(Math.pow(2, 64));
  // console.log("tt", tt);
  // }

  // translate bigint (felt) to number (float)
  const boat_position = (boat !== undefined) ? {
      x: boat.position_x / BigInt(Math.pow(2, 64)), 
      y: boat.position_y / BigInt(Math.pow(2, 64))} : {x: 0, y: 0};

  const prime = BigInt("3618502788666131213697322783095070105623107215331596699973092056135872020480");
  let boat_direction = {x: 0, y: 1};
  if (boat !== undefined) {
    let direction_x = undefined;
    if (boat.dx > BigInt(Math.pow(2, 128))) {
      let number = (prime - boat.dx) / BigInt(Math.pow(2, 64));
      // let mag = (prime - boat.dx).toString(16);
      // console.log('boat.dx', boat.dx.toString(16));
      // console.log('number', number);
      // console.log('BOAT DX', 0 - Number(number));
      direction_x = 0 - Number(number);
    } else {
      direction_x = Number(boat.dx / BigInt(Math.pow(2, 64)));
    }
    let direction_y = undefined;
    if (boat.dy > BigInt(Math.pow(2, 128))) {
      let number = (prime - boat.dy) / BigInt(Math.pow(2, 64));
      // let mag = (prime - boat.dx).toString(16);
      // console.log('number', number);
      // console.log('BOAT DY', 0 - Number(number));
      direction_y = 0 - Number(number);
    } else {
      direction_y = Number(boat.dy / BigInt(Math.pow(2, 64)));
    }
    boat_direction = {
      x: direction_x, 
      y: direction_y
    }
  }

  return {
    game: { id: game?.game_id, over: game?.over, seed: game?.seed },
    map: { level: 0, size: 8, spawn: 0, score: 0, over: 0, name: "toto" },
    // map: { level: map?.level, size: map?.size, spawn: map?.spawn, score: map?.score, over: map?.over, name: map?.name },
    boat: createBoat('classic', 1000, boat_position, boat_direction),
  };
};
