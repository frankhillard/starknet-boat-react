use array::ArrayTrait;
use core::debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};

#[derive(Serde, Copy, Drop, Print, PartialEq, Introspect)]
enum TileType {
    Water: (),
    Land: (),
    Mountain: (),
    Forest: (),
    City: (),
    Port: (),
    Ship: (),
}

impl TileTypePrintImpl of PrintTrait<TileType> {
    fn print(self: TileType) {
        match self {
            TileType::Water(()) => 0.print(),
            TileType::Land(()) => 1.print(),
            TileType::Mountain(()) => 2.print(),
            TileType::Forest(()) => 3.print(),
            TileType::City(()) => 4.print(),
            TileType::Port(()) => 5.print(),
            TileType::Ship(()) => 6.print(),
        }
    }
}

impl TileTypeIntoFelt252 of Into<TileType, felt252> {
    fn into(self: TileType) -> felt252 {
        match self {
            TileType::Water(()) => 0,
            TileType::Land(()) => 1,
            TileType::Mountain(()) => 2,
            TileType::Forest(()) => 3,
            TileType::City(()) => 4,
            TileType::Port(()) => 5,
            TileType::Ship(()) => 6,
        }
    }
}


#[derive(Model, Copy, Drop, Print, Serde)]
struct Tile {
    #[key]
    game_id: u32,    
    #[key]
    index: u32,
    _type: TileType,
    x: u32,
    y: u32,
}

trait TileTrait {
    fn new(x: u32, y: u32) -> Tile;
    fn is_ground(self: Tile) -> bool;
    fn is_water(self: Tile) -> bool;
    fn set_type(ref self: Tile, _type: TileType);
}

impl TileImpl of TileTrait {
    fn new(x: u32, y: u32) -> Tile {
        Tile { game_id: 0_32, index: 0_32, _type: TileType::Water, x, y }
    }

    fn is_ground(self: Tile) -> bool {
        self._type == TileType::Land || self._type == TileType::Mountain || self._type == TileType::Forest || self._type == TileType::City || self._type == TileType::Port
    }

    fn is_water(self: Tile) -> bool {
        self._type == TileType::Water || self._type == TileType::Port
    }

    fn set_type(ref self: Tile, _type: TileType) {
        self._type = _type;
    }
}

#[cfg(test)]
mod tests {
    use debug::PrintTrait;
    use super::{Tile, TileTrait, TileType};

    #[test]
    #[available_gas(100000)]
    fn test_water_tile() {
        let tile = TileTrait::new(0, 0);
        // TileTrait::set_type(tile, TileType::Water);
        assert(TileTrait::is_water(tile), 'should be a water tile');
    }

    #[test]
    #[available_gas(100000)]
    fn test_land_tile() {
        let mut tile = TileTrait::new(1, 0);
        TileTrait::set_type(ref tile, TileType::Land);
        assert(TileTrait::is_ground(tile), 'should be a ground tile');
    }
    
    #[test]
    #[available_gas(100000)]
    fn test_moutain_tile() {
        let mut tile = TileTrait::new(1, 0);
        TileTrait::set_type(ref tile, TileType::Mountain);
        assert(TileTrait::is_ground(tile), 'should be a ground tile');
    }

    #[test]
    #[available_gas(100000)]
    fn test_port_tile() {
        let mut tile = TileTrait::new(1, 0);
        TileTrait::set_type(ref tile, TileType::Port);
        assert(TileTrait::is_ground(tile), 'should be a ground tile');
        assert(TileTrait::is_water(tile), 'should be a water tile');
    }
}
