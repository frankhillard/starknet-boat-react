#[derive(Model, Copy, Drop, Print, Serde)]
struct Map {
    #[key]
    game_id: u32,
    length: u32,
    width: u32,
}

trait MapTrait {
    fn new(game_id: u32, length: u32, width: u32) -> Map;
}

impl MapTraitImpl of MapTrait {
    fn new(game_id: u32, length: u32, width: u32) -> Map {
        Map {
            game_id: game_id,
            length: length,
            width: width,
        }
    }
}