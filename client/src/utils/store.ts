import { create } from 'zustand';
import { TileType } from '../hooks/useComponentStates';
import { Coordinate, WindDirection } from '../type/GridElement';
import { BoatType } from '../ui/Boat';

export type WindCell = Coordinate & {
  force: number;
  direction: WindDirection;
};

export interface Map {
  size: number;
  holes: Coordinate[];
  winds: WindCell[];
}

// export interface Score {
//   stage: number;
//   score: number;
//   player: string;
// }

interface State {
  ip: number | undefined;
  hit_mob: BoatType | undefined;
  map: Map;
  position: Coordinate | undefined;
  add_hole: (x: number, y: number) => void;
  set_size: (size: number) => void;
  reset_holes: () => void;
  set_ip: (ip: number) => void;
  set_wind: (x: number, y: number, force: number, wx: number, wy: number) => void;
  // set_position: (x: number, y: number) => void;
//   set_hit_mob: (mob: MobType) => void;
//   set_turn: (mob: TileType) => void;
}

export const useElementStore = create<State>((set) => ({
  ip: undefined,
  hit_mob: undefined,
  map: { size: 0, holes: [] },
  add_hole: (x: number, y: number) =>
    set((state) => ({
      map: { size: state.map.size, holes: [...state.map.holes, { x, y }], winds: state.map.winds },
    })),
  reset_holes: () =>
    set((state) => ({
      map: { size: state.map.size, holes: [], winds: [] },
    })),
  set_size: (size: number) => set((state) => ({ map: { size, holes: state.map.holes, winds: state.map.winds } })),
  set_ip: (ip: number) => set(() => ({ ip })),
  set_wind: (x: number, y: number, force: number, wx: number, wy: number) =>
    set((state) => ({
      map: { 
        size: state.map.size, 
        holes: state.map.holes, 
        winds: [...state.map.winds, { x, y, force: force, direction: { x: wx, y: wy } }] },
    })),

  // set_position: (x: number, y: number) =>
  //   set((state) => ({
  //     position: { x, y },
  //   })),
//   add_to_leaderboard: (s: Score) => set((state) => ({ leaderboard: [...state.leaderboard, s] })),
//   set_hit_mob: (mob: MobType) => set(() => ({ hit_mob: mob })),
//   set_turn: (mob: TileType) => set(() => ({ turn: mob })),
}));
