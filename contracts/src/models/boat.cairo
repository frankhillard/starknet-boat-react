use core::traits::TryInto;
use array::ArrayTrait;
use core::debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};
use cubit::f128::types::fixed::{Fixed, FixedTrait};
use cubit::f128::math::trig::PI_u128;
use dojo_examples::models::polar::{PolarTrait};

#[derive(Copy, Drop, Serde, Print, Introspect)]
struct Vec2 {
    x: felt252,
    y: felt252
}

trait Vec2Trait {
    // fn is_zero(self: Vec2) -> bool;
    fn is_equal(self: Vec2, b: Vec2) -> bool;
}

impl Vec2Impl of Vec2Trait {
    // fn is_zero(self: Vec2) -> bool {
    //     if self.x - self.y == 0 {
    //         return true;
    //     }
    //     false
    // }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}

#[derive(Model, Copy, Drop, Print, Serde)]
struct Boat {
    #[key]
    player: ContractAddress,
    vec: Vec2,
    direction: Vec2,
}

trait BoatTrait {
    // fn is_zero(self: Vec2) -> bool;
    fn step(self: Boat, wind_vx: Fixed, wind_vy: Fixed, wind_speed: Fixed) -> Boat;
}

fn compute_angle(v1_x: Fixed, v1_y: Fixed, v2_x: Fixed, v2_y: Fixed) -> Fixed {
    let v1 = FixedTrait::sqrt(v1_x * v1_x + v1_y * v1_y);
    let v2 = FixedTrait::sqrt(v2_x * v2_x + v2_y * v2_y);
    let dot = v1_x * v2_x + v1_y * v2_y;
    let mut cos = dot / (v1 * v2);
    if (cos < FixedTrait::new_unscaled(1, true)) {
        // 'underflow'.print();
        cos = FixedTrait::new_unscaled(1, true);
    } else if (cos > FixedTrait::new_unscaled(1, false)) {
        // 'overflow'.print();
        cos = FixedTrait::new_unscaled(1, false);
    }
    let angle = FixedTrait::acos(cos);
    angle
}

impl BoatImpl of BoatTrait {
    fn step(self: Boat, wind_vx: Fixed, wind_vy: Fixed, wind_speed: Fixed) -> Boat {
        let position_x = FixedTrait::from_felt(self.vec.x);
        let position_y = FixedTrait::from_felt(self.vec.y);
        let direction_x = FixedTrait::from_felt(self.direction.x);
        let direction_y = FixedTrait::from_felt(self.direction.y);

        if wind_vx == FixedTrait::new_unscaled(0, false) && wind_vy == FixedTrait::new_unscaled(0, false) {
            return Boat {
                player: self.player,
                vec: Vec2 { x: position_x.into(), y: position_y.into() },
                direction: Vec2 { x: direction_x.into(), y: direction_y.into() }
            };
        } else {
            //inverse wind vector because polar of the boat considers the boat is going against the wind
            let wind_vx_inversed = -wind_vx;
            let wind_vy_inversed = -wind_vy;
            // compute angle between wind and boat direction in radians
            let angle = compute_angle(direction_x, direction_y, wind_vx_inversed, wind_vy_inversed);
            // convert angle to degrees
            let angle_deg = angle * FixedTrait::new_unscaled(180, false) / FixedTrait::new(PI_u128, false);
            let angle_abs = FixedTrait::abs(angle_deg);
            // compute boat speed
            let boat_speed = PolarTrait::get_boat_speed(wind_speed, angle_abs);
            // normalize direction vector
            let boat_direction_norm = FixedTrait::sqrt(direction_x * direction_x + direction_y * direction_y);
            let delta_x = boat_speed * direction_x / boat_direction_norm;
            let delta_y = boat_speed * direction_y / boat_direction_norm;
            // update position
            let new_x = position_x + delta_x;
            let new_y = position_y + delta_y;
            Boat {
                player: self.player,
                vec: Vec2 { x: new_x.into(), y: new_y.into() },
                direction: Vec2 { x: direction_x.into(), y: direction_y.into() }
            }
        }
      
    }

    // fn change_direction(self: Position, vx: Fixed, vy: Fixed) -> Position {
    //     Position {
    //         player: self.player,
    //         x: self.x,
    //         y: self.y,
    //         vx: vx,
    //         vy: vy
    //     }
    // }

}

// impl SchemaIntrospectionFixed of SchemaIntrospection::<Fixed>{
//     #[inline(always)]
//     fn unpacked_size() -> usize {
//         2
//     }
//     fn packed_size() -> usize {
//         1
//     }

// }

#[cfg(test)]
mod tests {
    use debug::PrintTrait;
    use super::{Boat, BoatTrait, Vec2, Vec2Trait};
    use dojo_examples::models::wind::{Wind, WindTrait};
    use cubit::f128::types::fixed::{Fixed, FixedTrait};

    // #[test]
    // #[available_gas(100000)]
    // fn test_vec_is_zero() {
    //     assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    // }

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }

    #[test]
    #[available_gas(100000000)]
    fn test_position_step() {
        let player = starknet::contract_address_const::<0x0>();
        let boat = Boat { 
            player,
            vec: Vec2 { 
                x: FixedTrait::from_unscaled_felt(90).into(), 
                y: FixedTrait::from_unscaled_felt(90).into() 
            },
            direction: Vec2 { 
                x: FixedTrait::from_unscaled_felt(1).into(), 
                y: FixedTrait::from_unscaled_felt(3).into() 
            }
        };
        let wind = Wind { 
            game_id: 0,
            x: 0, 
            y: 0, 
            wx: 1, //FixedTrait::new_unscaled(1, false), 
            wy: 1, //FixedTrait::new_unscaled(1, false),
            force: 6, //FixedTrait::new_unscaled(6, false) 
        };
        let new_position = BoatTrait::step(boat, FixedTrait::new_unscaled(wind.wx.into(), false), FixedTrait::new_unscaled(wind.wy.into(), false), FixedTrait::new_unscaled(wind.force.into(), false));

        // new_position.x.print();
        assert(new_position.player == player, 'player should not change');
        assert(new_position.vec.x == 1684648798116665289347_u128.into(), 'x should be different'); //91,32499434 or 0x5b5332d43c3896ea83 
        assert(new_position.vec.y == 1733532461082276577163_u128.into(), 'y should be different'); //93,974983019 or 0x5df9987cb4a9c4bf8b
        assert(new_position.direction.x == FixedTrait::from_unscaled_felt(1).into(), 'vx should not change');
        assert(new_position.direction.y == FixedTrait::from_unscaled_felt(3).into(), 'vy should not change');
    }
}
