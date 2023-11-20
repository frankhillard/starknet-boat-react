import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Enum: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
};

export type Boat = {
  __typename?: 'Boat';
<<<<<<< HEAD
  dx?: Maybe<Scalars['felt252']['output']>;
  dy?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  position_x?: Maybe<Scalars['felt252']['output']>;
  position_y?: Maybe<Scalars['felt252']['output']>;
=======
  entity?: Maybe<Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  vec?: Maybe<Vec2>;
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
};

export type BoatConnection = {
  __typename?: 'BoatConnection';
  edges?: Maybe<Array<Maybe<BoatEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type BoatEdge = {
  __typename?: 'BoatEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Boat>;
};

export type BoatOrder = {
  direction: OrderDirection;
  field: BoatOrderField;
};

export enum BoatOrderField {
<<<<<<< HEAD
  Dx = 'DX',
  Dy = 'DY',
  Player = 'PLAYER',
  PositionX = 'POSITION_X',
  PositionY = 'POSITION_Y'
}

export type BoatWhereInput = {
  dx?: InputMaybe<Scalars['felt252']['input']>;
  dxEQ?: InputMaybe<Scalars['felt252']['input']>;
  dxGT?: InputMaybe<Scalars['felt252']['input']>;
  dxGTE?: InputMaybe<Scalars['felt252']['input']>;
  dxLT?: InputMaybe<Scalars['felt252']['input']>;
  dxLTE?: InputMaybe<Scalars['felt252']['input']>;
  dxNEQ?: InputMaybe<Scalars['felt252']['input']>;
  dy?: InputMaybe<Scalars['felt252']['input']>;
  dyEQ?: InputMaybe<Scalars['felt252']['input']>;
  dyGT?: InputMaybe<Scalars['felt252']['input']>;
  dyGTE?: InputMaybe<Scalars['felt252']['input']>;
  dyLT?: InputMaybe<Scalars['felt252']['input']>;
  dyLTE?: InputMaybe<Scalars['felt252']['input']>;
  dyNEQ?: InputMaybe<Scalars['felt252']['input']>;
=======
  Player = 'PLAYER',
  Vec = 'VEC'
}

export type BoatWhereInput = {
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
<<<<<<< HEAD
  position_x?: InputMaybe<Scalars['felt252']['input']>;
  position_xEQ?: InputMaybe<Scalars['felt252']['input']>;
  position_xGT?: InputMaybe<Scalars['felt252']['input']>;
  position_xGTE?: InputMaybe<Scalars['felt252']['input']>;
  position_xLT?: InputMaybe<Scalars['felt252']['input']>;
  position_xLTE?: InputMaybe<Scalars['felt252']['input']>;
  position_xNEQ?: InputMaybe<Scalars['felt252']['input']>;
  position_y?: InputMaybe<Scalars['felt252']['input']>;
  position_yEQ?: InputMaybe<Scalars['felt252']['input']>;
  position_yGT?: InputMaybe<Scalars['felt252']['input']>;
  position_yGTE?: InputMaybe<Scalars['felt252']['input']>;
  position_yLT?: InputMaybe<Scalars['felt252']['input']>;
  position_yLTE?: InputMaybe<Scalars['felt252']['input']>;
  position_yNEQ?: InputMaybe<Scalars['felt252']['input']>;
=======
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
};

export type Entity = {
  __typename?: 'Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  systemCall: SystemCall;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Event>;
};

export type Game = {
  __typename?: 'Game';
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u32']['output']>;
  over?: Maybe<Scalars['bool']['output']>;
  player?: Maybe<Scalars['felt252']['output']>;
  seed?: Maybe<Scalars['felt252']['output']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Game>;
};

export type GameOrder = {
  direction: OrderDirection;
  field: GameOrderField;
};

export enum GameOrderField {
  GameId = 'GAME_ID',
  Over = 'OVER',
  Player = 'PLAYER',
  Seed = 'SEED'
}

export type GameWhereInput = {
  game_id?: InputMaybe<Scalars['u32']['input']>;
  game_idEQ?: InputMaybe<Scalars['u32']['input']>;
  game_idGT?: InputMaybe<Scalars['u32']['input']>;
  game_idGTE?: InputMaybe<Scalars['u32']['input']>;
  game_idLT?: InputMaybe<Scalars['u32']['input']>;
  game_idLTE?: InputMaybe<Scalars['u32']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  over?: InputMaybe<Scalars['bool']['input']>;
  overEQ?: InputMaybe<Scalars['bool']['input']>;
  overGT?: InputMaybe<Scalars['bool']['input']>;
  overGTE?: InputMaybe<Scalars['bool']['input']>;
  overLT?: InputMaybe<Scalars['bool']['input']>;
  overLTE?: InputMaybe<Scalars['bool']['input']>;
  overNEQ?: InputMaybe<Scalars['bool']['input']>;
  player?: InputMaybe<Scalars['felt252']['input']>;
  playerEQ?: InputMaybe<Scalars['felt252']['input']>;
  playerGT?: InputMaybe<Scalars['felt252']['input']>;
  playerGTE?: InputMaybe<Scalars['felt252']['input']>;
  playerLT?: InputMaybe<Scalars['felt252']['input']>;
  playerLTE?: InputMaybe<Scalars['felt252']['input']>;
  playerNEQ?: InputMaybe<Scalars['felt252']['input']>;
  seed?: InputMaybe<Scalars['felt252']['input']>;
  seedEQ?: InputMaybe<Scalars['felt252']['input']>;
  seedGT?: InputMaybe<Scalars['felt252']['input']>;
  seedGTE?: InputMaybe<Scalars['felt252']['input']>;
  seedLT?: InputMaybe<Scalars['felt252']['input']>;
  seedLTE?: InputMaybe<Scalars['felt252']['input']>;
  seedNEQ?: InputMaybe<Scalars['felt252']['input']>;
};

export type Map = {
  __typename?: 'Map';
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u32']['output']>;
  length?: Maybe<Scalars['u32']['output']>;
  width?: Maybe<Scalars['u32']['output']>;
};

export type MapConnection = {
  __typename?: 'MapConnection';
  edges?: Maybe<Array<Maybe<MapEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MapEdge = {
  __typename?: 'MapEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Map>;
};

export type MapOrder = {
  direction: OrderDirection;
  field: MapOrderField;
};

export enum MapOrderField {
  GameId = 'GAME_ID',
  Length = 'LENGTH',
  Width = 'WIDTH'
}

export type MapWhereInput = {
  game_id?: InputMaybe<Scalars['u32']['input']>;
  game_idEQ?: InputMaybe<Scalars['u32']['input']>;
  game_idGT?: InputMaybe<Scalars['u32']['input']>;
  game_idGTE?: InputMaybe<Scalars['u32']['input']>;
  game_idLT?: InputMaybe<Scalars['u32']['input']>;
  game_idLTE?: InputMaybe<Scalars['u32']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  length?: InputMaybe<Scalars['u32']['input']>;
  lengthEQ?: InputMaybe<Scalars['u32']['input']>;
  lengthGT?: InputMaybe<Scalars['u32']['input']>;
  lengthGTE?: InputMaybe<Scalars['u32']['input']>;
  lengthLT?: InputMaybe<Scalars['u32']['input']>;
  lengthLTE?: InputMaybe<Scalars['u32']['input']>;
  lengthNEQ?: InputMaybe<Scalars['u32']['input']>;
  width?: InputMaybe<Scalars['u32']['input']>;
  widthEQ?: InputMaybe<Scalars['u32']['input']>;
  widthGT?: InputMaybe<Scalars['u32']['input']>;
  widthGTE?: InputMaybe<Scalars['u32']['input']>;
  widthLT?: InputMaybe<Scalars['u32']['input']>;
  widthLTE?: InputMaybe<Scalars['u32']['input']>;
  widthNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  id?: Maybe<Scalars['ID']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type MetadataConnection = {
  __typename?: 'MetadataConnection';
  edges?: Maybe<Array<Maybe<MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MetadataEdge = {
  __typename?: 'MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Metadata>;
};

export type Model = {
  __typename?: 'Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Model>;
};

export type ModelUnion = Boat | Game | Map | Moves | Tile | Wind;

export type Moves = {
  __typename?: 'Moves';
  entity?: Maybe<Entity>;
  last_direction?: Maybe<Scalars['Enum']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  remaining?: Maybe<Scalars['u8']['output']>;
};

export type MovesConnection = {
  __typename?: 'MovesConnection';
  edges?: Maybe<Array<Maybe<MovesEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MovesEdge = {
  __typename?: 'MovesEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Moves>;
};

export type MovesOrder = {
  direction: OrderDirection;
  field: MovesOrderField;
};

export enum MovesOrderField {
  LastDirection = 'LAST_DIRECTION',
  Player = 'PLAYER',
  Remaining = 'REMAINING'
}

export type MovesWhereInput = {
  last_direction?: InputMaybe<Scalars['Enum']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  remaining?: InputMaybe<Scalars['u8']['input']>;
  remainingEQ?: InputMaybe<Scalars['u8']['input']>;
  remainingGT?: InputMaybe<Scalars['u8']['input']>;
  remainingGTE?: InputMaybe<Scalars['u8']['input']>;
  remainingLT?: InputMaybe<Scalars['u8']['input']>;
  remainingLTE?: InputMaybe<Scalars['u8']['input']>;
  remainingNEQ?: InputMaybe<Scalars['u8']['input']>;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  boatModels?: Maybe<BoatConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  events?: Maybe<EventConnection>;
  gameModels?: Maybe<GameConnection>;
  mapModels?: Maybe<MapConnection>;
  metadata: Metadata;
  metadatas?: Maybe<MetadataConnection>;
  model: Model;
  models?: Maybe<ModelConnection>;
  movesModels?: Maybe<MovesConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  tileModels?: Maybe<TileConnection>;
  windModels?: Maybe<WindConnection>;
};


export type QueryBoatModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BoatOrder>;
  where?: InputMaybe<BoatWhereInput>;
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGameModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameOrder>;
  where?: InputMaybe<GameWhereInput>;
};


export type QueryMapModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MapOrder>;
  where?: InputMaybe<MapWhereInput>;
};


export type QueryMetadataArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMovesModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MovesOrder>;
  where?: InputMaybe<MovesWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTileModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TileOrder>;
  where?: InputMaybe<TileWhereInput>;
};


export type QueryWindModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WindOrder>;
  where?: InputMaybe<WindWhereInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  entityUpdated: Entity;
  modelRegistered: Model;
};


export type SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type System = {
  __typename?: 'System';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  system_id?: Maybe<Scalars['ID']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<System>;
};

export type Tile = {
  __typename?: 'Tile';
  _type?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u32']['output']>;
  index?: Maybe<Scalars['u32']['output']>;
<<<<<<< HEAD
=======
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type TileConnection = {
  __typename?: 'TileConnection';
  edges?: Maybe<Array<Maybe<TileEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TileEdge = {
  __typename?: 'TileEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Tile>;
};

export type TileOrder = {
  direction: OrderDirection;
  field: TileOrderField;
};

export enum TileOrderField {
  GameId = 'GAME_ID',
  Index = 'INDEX',
  X = 'X',
  Y = 'Y',
  Type = '_TYPE'
}

export type TileWhereInput = {
  _type?: InputMaybe<Scalars['Enum']['input']>;
  game_id?: InputMaybe<Scalars['u32']['input']>;
  game_idEQ?: InputMaybe<Scalars['u32']['input']>;
  game_idGT?: InputMaybe<Scalars['u32']['input']>;
  game_idGTE?: InputMaybe<Scalars['u32']['input']>;
  game_idLT?: InputMaybe<Scalars['u32']['input']>;
  game_idLTE?: InputMaybe<Scalars['u32']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  index?: InputMaybe<Scalars['u32']['input']>;
  indexEQ?: InputMaybe<Scalars['u32']['input']>;
  indexGT?: InputMaybe<Scalars['u32']['input']>;
  indexGTE?: InputMaybe<Scalars['u32']['input']>;
  indexLT?: InputMaybe<Scalars['u32']['input']>;
  indexLTE?: InputMaybe<Scalars['u32']['input']>;
  indexNEQ?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Vec2 = {
  __typename?: 'Vec2';
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

<<<<<<< HEAD
export type TileConnection = {
  __typename?: 'TileConnection';
  edges?: Maybe<Array<Maybe<TileEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TileEdge = {
  __typename?: 'TileEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Tile>;
};

export type TileOrder = {
  direction: OrderDirection;
  field: TileOrderField;
};

export enum TileOrderField {
  GameId = 'GAME_ID',
  Index = 'INDEX',
  X = 'X',
  Y = 'Y',
  Type = '_TYPE'
}

export type TileWhereInput = {
  _type?: InputMaybe<Scalars['Enum']['input']>;
  game_id?: InputMaybe<Scalars['u32']['input']>;
  game_idEQ?: InputMaybe<Scalars['u32']['input']>;
  game_idGT?: InputMaybe<Scalars['u32']['input']>;
  game_idGTE?: InputMaybe<Scalars['u32']['input']>;
  game_idLT?: InputMaybe<Scalars['u32']['input']>;
  game_idLTE?: InputMaybe<Scalars['u32']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  index?: InputMaybe<Scalars['u32']['input']>;
  indexEQ?: InputMaybe<Scalars['u32']['input']>;
  indexGT?: InputMaybe<Scalars['u32']['input']>;
  indexGTE?: InputMaybe<Scalars['u32']['input']>;
  indexLT?: InputMaybe<Scalars['u32']['input']>;
  indexLTE?: InputMaybe<Scalars['u32']['input']>;
  indexNEQ?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

=======
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
export type Wind = {
  __typename?: 'Wind';
  entity?: Maybe<Entity>;
  force?: Maybe<Scalars['u32']['output']>;
  game_id?: Maybe<Scalars['u32']['output']>;
  wx?: Maybe<Scalars['u32']['output']>;
  wy?: Maybe<Scalars['u32']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type WindConnection = {
  __typename?: 'WindConnection';
  edges?: Maybe<Array<Maybe<WindEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type WindEdge = {
  __typename?: 'WindEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Wind>;
};

export type WindOrder = {
  direction: OrderDirection;
  field: WindOrderField;
};

export enum WindOrderField {
  Force = 'FORCE',
  GameId = 'GAME_ID',
  Wx = 'WX',
  Wy = 'WY',
  X = 'X',
  Y = 'Y'
}

export type WindWhereInput = {
  force?: InputMaybe<Scalars['u32']['input']>;
  forceEQ?: InputMaybe<Scalars['u32']['input']>;
  forceGT?: InputMaybe<Scalars['u32']['input']>;
  forceGTE?: InputMaybe<Scalars['u32']['input']>;
  forceLT?: InputMaybe<Scalars['u32']['input']>;
  forceLTE?: InputMaybe<Scalars['u32']['input']>;
  forceNEQ?: InputMaybe<Scalars['u32']['input']>;
  game_id?: InputMaybe<Scalars['u32']['input']>;
  game_idEQ?: InputMaybe<Scalars['u32']['input']>;
  game_idGT?: InputMaybe<Scalars['u32']['input']>;
  game_idGTE?: InputMaybe<Scalars['u32']['input']>;
  game_idLT?: InputMaybe<Scalars['u32']['input']>;
  game_idLTE?: InputMaybe<Scalars['u32']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  wx?: InputMaybe<Scalars['u32']['input']>;
  wxEQ?: InputMaybe<Scalars['u32']['input']>;
  wxGT?: InputMaybe<Scalars['u32']['input']>;
  wxGTE?: InputMaybe<Scalars['u32']['input']>;
  wxLT?: InputMaybe<Scalars['u32']['input']>;
  wxLTE?: InputMaybe<Scalars['u32']['input']>;
  wxNEQ?: InputMaybe<Scalars['u32']['input']>;
  wy?: InputMaybe<Scalars['u32']['input']>;
  wyEQ?: InputMaybe<Scalars['u32']['input']>;
  wyGT?: InputMaybe<Scalars['u32']['input']>;
  wyGTE?: InputMaybe<Scalars['u32']['input']>;
  wyLT?: InputMaybe<Scalars['u32']['input']>;
  wyLTE?: InputMaybe<Scalars['u32']['input']>;
  wyNEQ?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


<<<<<<< HEAD
export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Boat', position_x?: any | null, position_y?: any | null, dx?: any | null, dy?: any | null } | { __typename: 'Game', game_id?: any | null, over?: any | null, seed?: any | null } | { __typename: 'Map', game_id?: any | null, length?: any | null, width?: any | null } | { __typename: 'Moves', remaining?: any | null, last_direction?: any | null } | { __typename: 'Tile', game_id?: any | null, index?: any | null, _type?: any | null, x?: any | null, y?: any | null } | { __typename: 'Wind', game_id?: any | null, x?: any | null, y?: any | null, wx?: any | null, wy?: any | null, force?: any | null } | null> | null } | null } | null> | null } | null };
=======
export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Boat', vec?: { __typename?: 'Vec2', x?: any | null, y?: any | null } | null } | { __typename: 'Game', game_id?: any | null, over?: any | null, seed?: any | null } | { __typename: 'Map', game_id?: any | null, length?: any | null, width?: any | null } | { __typename: 'Moves', remaining?: any | null, last_direction?: any | null } | { __typename: 'Tile', game_id?: any | null, index?: any | null, _type?: any | null, x?: any | null, y?: any | null } | { __typename: 'Wind', game_id?: any | null, x?: any | null, y?: any | null, wx?: any | null, wy?: any | null, force?: any | null } | null> | null } | null } | null> | null } | null };
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228


export const GetEntitiesDocument = gql`
    query getEntities {
  entities(keys: ["%"]) {
    edges {
      node {
        keys
        models {
          __typename
          ... on Moves {
            remaining
            last_direction
          }
          ... on Boat {
<<<<<<< HEAD
            position_x
            position_y
            dx
            dy
          }
          ... on Game {
            game_id
            over
            seed
          }
          ... on Map {
            game_id
            length
            width
          }
          ... on Tile {
            game_id
            index
            _type
            x
            y
          }
          ... on Wind {
            game_id
            x
            y
            wx
            wy
            force
=======
            vec {
              x
              y
            }
>>>>>>> 565150ce0f37756286192e5623d2fa9ab7417228
          }
          ... on Game {
            game_id
            over
            seed
          }
          ... on Map {
            game_id
            length
            width
          }
          ... on Tile {
            game_id
            index
            _type
            x
            y
          }
          ... on Wind {
            game_id
            x
            y
            wx
            wy
            force
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getEntities(variables?: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEntitiesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEntitiesQuery>(GetEntitiesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEntities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;