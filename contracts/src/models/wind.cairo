#[derive(Model, Copy, Drop, Print, Serde)]
struct Wind {
    #[key]
    game_id: u32,
    #[key]
    x: u32,
    #[key]
    y: u32,
    wx: u32,
    wy: u32,
    force: u32,
}

trait WindTrait {
    fn new(game_id: u32, x: u32, y: u32, wx: u32, wy: u32, force: u32) -> Wind;
}

impl WindTraitImpl of WindTrait {
    fn new(game_id: u32, x: u32, y: u32, wx: u32, wy: u32, force: u32) -> Wind {
        Wind {
            game_id: game_id,
            x: x,
            y: y,
            wx: wx,
            wy: wy,
            force: force,
        }
    }
}