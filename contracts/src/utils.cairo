use dojo_examples::models::boat::{Boat};
use dojo_examples::models::moves::{Direction};

fn next_position(mut boat: Boat, direction: Direction) -> Boat {
    match direction {
        Direction::None(()) => {
            return boat;
        },
        Direction::Left(()) => {
            boat.vec.x -= 1;
        },
        Direction::Right(()) => {
            boat.vec.x += 1;
        },
        Direction::Up(()) => {
            boat.vec.y -= 1;
        },
        Direction::Down(()) => {
            boat.vec.y += 1;
        },
    };

    boat
}
