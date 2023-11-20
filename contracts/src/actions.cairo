use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_examples::models::boat::{Boat,Vec2};
use dojo_examples::models::moves::{Moves, Direction};
use starknet::{ContractAddress, ClassHash};

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn create(self: @TContractState, player_id: felt252, seed: felt252, name: felt252);
    fn spawn(self: @TContractState);
    fn move(self: @TContractState, direction: Direction);
    fn turn(self: @TContractState, angle: u16);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use core::option::OptionTrait;
    use starknet::{ContractAddress, get_caller_address};
    use dojo_examples::models::boat::{Boat, BoatTrait, Vec2};
    use dojo_examples::models::moves::{Moves, Direction};
    use dojo_examples::models::game::{Game, GameTrait};
    use dojo_examples::models::wind::{Wind, WindTrait};
    use dojo_examples::models::map::{Map, MapTrait};
    use dojo_examples::models::tile::{TileType, Tile, TileTrait};
    use cubit::f128::types::fixed::{Fixed, FixedTrait};
    use debug::PrintTrait;
    use dojo_examples::utils::next_position;
    use super::IActions;

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
        Created: Created,
        Turn: Turn,
    }

    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Moved {
        player: ContractAddress,
        direction: Direction
    }

    #[derive(Drop, starknet::Event)]
    struct Created {
        player: felt252,
        game_id: u32,
        over: bool,
        seed: felt252
    }

    #[derive(Drop, starknet::Event)]
    struct Turn {
        player: ContractAddress,
        direction: Vec2
    }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionsImpl of IActions<ContractState> {
        // ContractState is defined by system decorator expansion
        fn create(self: @ContractState, player_id: felt252, seed: felt252, name: felt252) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // // Retrieve the player's current position from the world.
            // let current_game = get!(world, player, (Game));

            // let mut game_id = 0_u32;
            // if (current_game.game_id > 0_u32) {
            //     game_id = current_game.game_id + 1_u32;
            // }
            
            // [Command] Game entity
            let game_id = 0_u32;
            let mut game = GameTrait::new(player_id, game_id, seed);
            set!(world, (game));

            // Emit an event to the world to notify about the game creation.
            emit!(world, Created { player: player_id, game_id: game_id, over: false, seed: seed });

            // [Command] Map entity
            let mut map = MapTrait::new(game_id, 8, 8);
            set!(world, (map));

            // [Command] GroundTile entity
            let mut tile_hole = TileTrait::new(0, 0);
            TileTrait::set_type(ref tile_hole, TileType::Land);
            set!(world, (tile_hole));

            // [Command] Wind entities
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 0_u32, 1_u32, 1_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 1_u32, 1_u32, 1_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 2_u32, 1_u32, 2_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 3_u32, 1_u32, 3_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 4_u32, 1_u32, 4_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 5_u32, 1_u32, 4_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 0_u32, 6_u32, 1_u32, 4_u32, 4);
            set!(world, (wind_cell));

            let mut wind_cell = WindTrait::new(game_id, 1_u32, 0_u32, 1_u32, 1_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 1_u32, 1_u32, 1_u32, 1_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 1_u32, 2_u32, 1_u32, 3_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 1_u32, 3_u32, 1_u32, 4_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 1_u32, 4_u32, 1_u32, 4_u32, 6);
            set!(world, (wind_cell));

            let mut wind_cell = WindTrait::new(game_id, 2_u32, 1_u32, 1_u32, 2_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 2_u32, 2_u32, 1_u32, 4_u32, 8);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 2_u32, 3_u32, 1_u32, 4_u32, 8);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 2_u32, 4_u32, 1_u32, 6_u32, 6);
            set!(world, (wind_cell));

            let mut wind_cell = WindTrait::new(game_id, 3_u32, 0_u32, 1_u32, 2_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 3_u32, 1_u32, 1_u32, 3_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 3_u32, 2_u32, 1_u32, 6_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 3_u32, 3_u32, 1_u32, 6_u32, 8);
            set!(world, (wind_cell));

            let mut wind_cell = WindTrait::new(game_id, 4_u32, 2_u32, 1_u32, 6_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 4_u32, 3_u32, 1_u32, 3_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 4_u32, 4_u32, 1_u32, 2_u32, 6);
            set!(world, (wind_cell));

            let mut wind_cell = WindTrait::new(game_id, 5_u32, 6_u32, 1_u32, 0_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 6_u32, 5_u32, 1_u32, 0_u32, 6);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 6_u32, 6_u32, 1_u32, 0_u32, 4);
            set!(world, (wind_cell));
            let mut wind_cell = WindTrait::new(game_id, 7_u32, 7_u32, 1_u32, 0_u32, 4);
            set!(world, (wind_cell));            
        }

        // ContractState is defined by system decorator expansion
        fn spawn(self: @ContractState) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            // Retrieve the player's current position from the world.
            let boat = get!(world, player, (Boat));

            // Retrieve the player's move data, e.g., how many moves they have left.
            let moves = get!(world, player, (Moves));

            // Update the world state with the new data.
            // 1. Increase the player's remaining moves by 10.
            // 2. Move the player's position 10 units in both the x and y direction.
            set!(
                world,
                (
                    Moves {
                        player, remaining: moves.remaining + 10, last_direction: Direction::None(())
                    },
                    Boat {
                        player, 
                        // vec: Vec2 { x: FixedTrait::from_unscaled_felt(90).into(), y: FixedTrait::from_unscaled_felt(90).into() },
                        // direction: Vec2 { x: FixedTrait::from_unscaled_felt(1).into(), y: FixedTrait::from_unscaled_felt(3).into() }
                        position_x: FixedTrait::from_unscaled_felt(90).into(), 
                        position_y: FixedTrait::from_unscaled_felt(90).into(),
                        dx: FixedTrait::from_unscaled_felt(1).into(), 
                        dy: FixedTrait::from_unscaled_felt(3).into(),

                    },
                )
            );
        }

        // Implementation of the move function for the ContractState struct.
        fn move(self: @ContractState, direction: Direction) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let game = get!(world, player, Game);
            assert(game.game_id == 0, 'game_id is wrong');
            
            // Retrieve the player's current position and moves data from the world.
            let (mut boat, mut moves) = get!(world, player, (Boat, Moves));

            // Deduct one from the player's remaining moves.
            moves.remaining -= 1;

            // Update the last direction the player moved in.
            moves.last_direction = direction;

            // Calculate the player's next position based on the provided boat direction and wind.
            // let cur_wind_cell: (u32, u32) = WindTrait::get_wind_cell(boat.vec.x, boat.vec.y);
            let cell_size: Fixed = FixedTrait::from_unscaled_felt(100);
            let cell_x = FixedTrait::from_felt(boat.position_x) / cell_size;
            let cell_y = FixedTrait::from_felt(boat.position_y) / cell_size;
            let cell_x_u32: u32 = FixedTrait::floor(cell_x).try_into().unwrap();
            let cell_y_u32: u32 = FixedTrait::floor(cell_y).try_into().unwrap();

            let mut cur_wind = get!(world, (game.game_id, cell_x_u32, cell_y_u32), (Wind));
            let wx_felt : felt252 = cur_wind.wx.into();
            let wy_felt : felt252 = cur_wind.wy.into();
            let wx_fixed : Fixed = FixedTrait::from_unscaled_felt(wx_felt); //cur_wind.wx;
            let wy_fixed : Fixed = FixedTrait::from_unscaled_felt(wy_felt); //cur_wind.wy;
            let wind_spd = FixedTrait::from_unscaled_felt(cur_wind.force.into()); //cur_wind.speed;
            let next = BoatTrait::step(boat, wx_fixed, wy_fixed, wind_spd); 



            // Update the world state with the new moves data and position.
            set!(world, (moves, next));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Moved { player, direction });
        }

        fn turn(self: @ContractState, angle: u16) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            let game = get!(world, player, Game);
            assert(game.game_id == 0, 'game_id is wrong');
            
            // Retrieve the player's current position and moves data from the world.
            let mut boat = get!(world, player, Boat);

            // Calculate the player's next direction vector based on the provided angle and current direction.
            let next = BoatTrait::turn(boat, angle);
            let direction: Vec2 = Vec2 { x: next.dx, y: next.dy };
            // Update the world state with the boat direction.
            set!(world, (next));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Turn { player, direction });
        }
    }
}

#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use cubit::f128::types::fixed::{Fixed, FixedTrait};
    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use debug::PrintTrait;
    // import models
    use dojo_examples::models::boat::{boat};
    use dojo_examples::models::moves::{moves};
    use dojo_examples::models::game::{game};
    use dojo_examples::models::map::{map};

    use dojo_examples::models::boat::{Boat, Vec2};
    use dojo_examples::models::moves::{Moves, Direction}; 
    use dojo_examples::models::game::{Game}; 
    use dojo_examples::models::map::{Map};

    // import actions
    use super::{actions, IActionsDispatcher, IActionsDispatcherTrait};

    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![boat::TEST_CLASS_HASH, moves::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        // call spawn()
        actions_system.spawn();

        // call move with direction right
        actions_system.move(Direction::Right(()));

        // Check world state
        let moves = get!(world, caller, Moves);

        // casting right direction
        let right_dir_felt: felt252 = Direction::Right(()).into();

        // check moves
        assert(moves.remaining == 9, 'moves is wrong');

        // check last direction
        assert(moves.last_direction.into() == right_dir_felt, 'last direction is wrong');

        // get new_position
        let new_boat = get!(world, caller, Boat);

        // Position should not change since no wind has been set (with create entrypoint)
        // check new position x
        let expected_x: felt252 = FixedTrait::new_unscaled(90, false).into();
        assert(new_boat.position_x == expected_x, 'boat x is wrong');

        // check new position y
        let expected_y: felt252 = FixedTrait::new_unscaled(90, false).into();
        assert(new_boat.position_y == expected_y, 'boat y is wrong');
    }

    #[test]
    #[available_gas(300000000)]
    fn test_create() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![boat::TEST_CLASS_HASH, moves::TEST_CLASS_HASH, game::TEST_CLASS_HASH, map::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        let player: felt252 = 'player_id'.into();
        let seed: felt252 = 1000.into();
        
        // call spawn()
        actions_system.create(player, seed, 'name');

        // Check world state
        
        let game = get!(world, player, Game);

        // check moves
        assert(game.game_id == 0, 'game_id is wrong');

        // check seed
        assert(game.seed == seed, 'seed is wrong');

        // get Map
        let mapKey:felt252 = game.game_id.into();
        let map = get!(world, mapKey, Map);

        // check new position x
        assert(map.length == 8, 'map length is wrong');

        // check new position y
        assert(map.width == 8, 'map width is wrong');
    }

    #[test]
    #[available_gas(300000000)]
    fn test_create_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![boat::TEST_CLASS_HASH, moves::TEST_CLASS_HASH, game::TEST_CLASS_HASH, map::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        let player: felt252 = 'player_id'.into();
        let seed: felt252 = 1000.into();
        
        // call spawn()
        actions_system.create(player, seed, 'name');

        let game = get!(world, player, Game);

        // check moves
        assert(game.game_id == 0, 'game_id is wrong');

        // call spawn()
        actions_system.spawn();

        // call move with direction right
        actions_system.move(Direction::Right(()));

        // Check world state
        let moves = get!(world, caller, Moves);

        // casting right direction
        let right_dir_felt: felt252 = Direction::Right(()).into();

        // check moves
        assert(moves.remaining == 9, 'moves is wrong');

        // check last direction
        assert(moves.last_direction.into() == right_dir_felt, 'last direction is wrong');

        // get new_position
        let new_boat = get!(world, caller, Boat);

        // check new position x
        let expected_x: felt252 = 1684648798116665289347_u128.into(); //91,32499434
        assert(new_boat.position_x == expected_x, 'boat x is wrong');

        // check new position y
        let expected_y: felt252 = 1733532461082276577163_u128.into(); //93,974983019
        assert(new_boat.position_y == expected_y, 'boat y is wrong');
    }

    #[test]
    #[available_gas(300000000)]
    fn test_create_turn_45() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![boat::TEST_CLASS_HASH, moves::TEST_CLASS_HASH, game::TEST_CLASS_HASH, map::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        let player: felt252 = 'player_id'.into();
        let seed: felt252 = 1000.into();
        
        // call spawn()
        actions_system.create(player, seed, 'name');

        let game = get!(world, player, Game);

        // check moves
        assert(game.game_id == 0, 'game_id is wrong');

        // call spawn()
        actions_system.spawn();

        // call move with direction right
        actions_system.turn(45_u16);

        // get new_position
        let new_boat = get!(world, caller, Boat);

        // check new direction x
        // [1 3] * [cos(45) -sin(45)] = [1 3] * [sqrt(2)/2 -sqrt(2)/2] = -2 * sqrt(2)/2
        let halfsqrt2 = FixedTrait::new(13043817825332782214_u128, false);
        let expected_x: Fixed = halfsqrt2 * FixedTrait::new_unscaled(2_u128, true);
        let cdx: Fixed = FixedTrait::from_felt(new_boat.dx);
        let diff = cdx - expected_x;
        // almost the same at a precision of 5/2^64 
        assert(diff.abs() < FixedTrait::from_felt('0x5'), 'boat x is wrong');
        // assert(new_boat.dx == expected_x_felt, 'boat x is wrong');

        // check new direction y
        // [1 3] * [sin(45) cos(45)] = [1 3] * [sqrt(2)/2 0sqrt(2)/2] = 4 * sqrt(2)/2
        // let expected_y: felt252 = 52175271301331128858_u128.into(); 
        let expected_y: Fixed = halfsqrt2 * FixedTrait::new_unscaled(4_u128, false);
        let cdy: Fixed = FixedTrait::from_felt(new_boat.dy);
        let diff = cdy - expected_y;
        assert(diff.abs() < FixedTrait::from_felt('0x5'), 'boat y is wrong');
        // assert(new_boat.dy == expected_y.into(), 'boat y is wrong');
    }

    #[test]
    #[available_gas(300000000)]
    fn test_create_turn_90() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![boat::TEST_CLASS_HASH, moves::TEST_CLASS_HASH, game::TEST_CLASS_HASH, map::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions_system = IActionsDispatcher { contract_address };

        let player: felt252 = 'player_id'.into();
        let seed: felt252 = 1000.into();
        
        // call spawn()
        actions_system.create(player, seed, 'name');

        let game = get!(world, player, Game);

        // check moves
        assert(game.game_id == 0, 'game_id is wrong');

        // call spawn()
        actions_system.spawn();

        // call move with direction right
        actions_system.turn(90_u16);

        // get new_position
        let new_boat = get!(world, caller, Boat);

        // check new direction x
        // [1 3] * [cos(90) -sin(90)] = [1 3] * [0 -1] = -3
        // let halfsqrt2 = FixedTrait::new(13043817825332782214_u128, false);
        let expected_x: Fixed = FixedTrait::new_unscaled(3_u128, true);
        let cdx: Fixed = FixedTrait::from_felt(new_boat.dx);
        let diff = cdx - expected_x;
        // almost the same at a precision of 5/2^64 
        assert(diff.abs() < FixedTrait::from_felt('0x5'), 'boat x is wrong');
        // assert(new_boat.dx == expected_x_felt, 'boat x is wrong');

        // check new direction y
        // [1 3] * [sin(90) cos(90)] = [1 3] * [1 0] = 1
        // let expected_y: felt252 = 52175271301331128858_u128.into(); 
        let expected_y: Fixed = FixedTrait::new_unscaled(1_u128, false);
        let cdy: Fixed = FixedTrait::from_felt(new_boat.dy);
        let diff = cdy - expected_y;
        assert(diff.abs() < FixedTrait::from_felt('0x5'), 'boat y is wrong');
        // assert(new_boat.dy == expected_y.into(), 'boat y is wrong');
    }

}
