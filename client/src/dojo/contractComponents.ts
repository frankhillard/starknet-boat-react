/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Moves: (() => {
      const name = "Moves";
      return defineComponent(
        world,
        {
          remaining: RecsType.Number,
          last_direction: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u8", "Direction"],
          },
        }
      );
    })(),
    Boat: (() => {
      const name = "Boat";
      return defineComponent(
        world,
        {
          vec: {
            x: RecsType.BigInt,
            y: RecsType.BigInt
          },
          direction: {
            x: RecsType.BigInt,
            y: RecsType.BigInt
          }
        },
        {
          metadata: {
            name: name,
            types: ["Vec2", "Vec2"],
          },
        }
      );
    })(),
    Game: (() => {
      const name = 'Game';
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          over: RecsType.Number,
          seed: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u32", "u8", "u32"],
          },
        }
      );
    })(),
    Tile: (() => {
      const name = 'Tile';
      return defineComponent(
        world,
        {
          _type: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u32", "u32", "u32"],
          },
        }
      );
    })(),
    Map: (() => {
      const name = 'Map';
      return defineComponent(
        world,
        {
          length: RecsType.Number,
          width: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u32", "u32", "u32"],
          },
        }
      );
    })(),
    Wind: (() => {
      const name = 'Wind';
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
          wx: RecsType.Number,
          wy: RecsType.Number,
          force: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u32", "u32", "u32", "u32", "u32"],
          },
        }
      );
    })(),
  };
}
