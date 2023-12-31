import { Sprite, Graphics } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import { useEffect, useState, useCallback } from 'react';
import groundTile from '../assets/0_1.png';
import waterTile from '../assets/water_full.png';
import highwaterTile from '../assets/high_water.png';

// import waterTile2 from '../assets/tilesets/water_left.png';
// import waterTile1 from '../assets/tilesets/water_middle.png';
// import waterTile3 from '../assets/tilesets/water_right.png';
import { Coordinate, GridElement } from '../type/GridElement';
import { H_OFFSET, WIDTH, generateGrid, to_screen_coordinate } from '../utils/grid';
import { useElementStore } from '../utils/store';
import WindArrow from './WindArrow';


interface MapProps {
  hoveredTile?: Coordinate;
}

const Map: React.FC<MapProps> = ({ hoveredTile }) => {
  
  const [grid, setGrid] = useState<GridElement[][]>([]);

  const { ip, hit_mob, map } = useElementStore((state) => state);
  // console.log("Draw MAP", map);
  useEffect(() => {
    setGrid(generateGrid(map));
    console.log("[MAP] grid generated", grid);
  }, [map]);

  if (!map.size) return null;

  
  // const newGrid = grid;
  const newGrid = [
    [
      { x: -2, y: 0, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 1, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 2, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 3, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 4, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 5, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 6, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -2, y: 7, layer: 'base', type: 'high_water', wind_speed: 0 },
    ],
    [
      { x: -1, y: 0, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 1, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 2, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 3, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 4, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 5, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 6, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: -1, y: 7, layer: 'base', type: 'high_water', wind_speed: 0 },
    ],
    ...grid,
    [
      { x: 8, y: 0, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 1, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 2, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 3, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 4, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 5, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 6, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 8, y: 7, layer: 'base', type: 'high_water', wind_speed: 0 },
    ],
    [
      { x: 9, y: 0, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 1, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 2, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 3, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 4, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 5, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 6, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: 9, y: 7, layer: 'base', type: 'high_water', wind_speed: 0 },
    ],
  ];

  // console.log("render", newGrid);

  return newGrid.map((row: any, i) => {
    const newRow = [
      { x: i - 2, y: -2, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: i - 2, y: -1, layer: 'base', type: 'high_water', wind_speed: 0 },
      ...row,
      { x: i - 2, y: 8, layer: 'base', type: 'high_water', wind_speed: 0 },
      { x: i - 2, y: 9, layer: 'base', type: 'high_water', wind_speed: 0 },
    ];
    return newRow.map((tile: any) => {
      // map.winds.foreach ((wind) => {
      // });
      const screenPos = to_screen_coordinate(tile);
      const adjustment =
        hoveredTile && hoveredTile.x === tile.x && hoveredTile.y === tile.y ? 5 : 0;
      
      // Use water tile for border and your original tile for inside
      let tileImage = groundTile;
      if (tile.type === 'water') {
        tileImage = waterTile;
      }
      else if (tile.type === 'high_water') {
        tileImage = highwaterTile;
      }

      Texture.from(tileImage).baseTexture.scaleMode = SCALE_MODES.NEAREST;


      return (
        <>
          <Sprite
            key={`${tile.x}-${tile.y}`}
            image={tileImage}
            anchor={0.5}
            scale={2}
            x={screenPos.x + WIDTH / 2}
            y={screenPos.y + H_OFFSET - adjustment}
          />
          {/* <Graphics draw={draw} /> */}
          <WindArrow 
            x={screenPos.x + WIDTH / 2} 
            y={screenPos.y + H_OFFSET - adjustment} 
            force={tile.wind_speed} 
            direction={tile.wind_direction !== undefined ? tile.wind_direction : {x:0, y:0}} 
          />
        </>
                
      );
    });
  });
};

export default Map;
