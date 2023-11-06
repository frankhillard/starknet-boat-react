

import { AnimatedSprite, useTick, Sprite, Graphics } from '@pixi/react';
// import { Container, Sprite, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState, useCallback } from 'react';
// import { ActionableTile } from '../hooks/useGrid';
import { Coordinate } from '../type/GridElement';
// import { to_center, to_grid_coordinate, to_screen_coordinate } from '../utils/grid';
import { H_OFFSET, HEIGHT, WIDTH, generateGrid, to_screen_coordinate } from '../utils/grid';

interface WindProps {
  x: number,
  y: number,
  force: number,
  direction: Coordinate,
}

const WindArrow: React.FC<WindProps> = ({
  x,
  y,
  force,
  direction,
}) => {
  // console.log("Draw Wind", force, direction);

  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0x440000, 0.5);
    g.lineStyle(1, 0x440000, 0.5);
    g.moveTo(0, 0);
    g.lineTo(0-4, 0);
    g.lineTo(0, 0+10);
    g.lineTo(0+4, 0);
    g.lineTo(0+2, 0);
    g.lineTo(0+2, 0-10);
    g.lineTo(0-2, 0-10);
    g.lineTo(0-2, 0);
    g.endFill();  
  }, [x, y, direction]);

  if (force === 0){
    return null; 
  } else {
    let scaling = 1;
    if (force < 3) {
      scaling = 0;
    } else if (force < 6) { 
      scaling = 0.5;
    } else if (force < 8) {
      scaling = 1;
    } else if (force < 10) {
      scaling = 1.2;
    } else if (force < 12) {
      scaling = 1.4;
    } else if (force < 14) {
      scaling = 1.6;
    } else if (force < 18) {
      scaling = 1.8;
    } else if (force > 20) {
      scaling = 2;
    }
  
    let angle_result = 0;
    if (direction.x !== 0 && direction.y !== 0) {
      const south = {x: 0, y:1};
      const prod = south.x * direction.x + south.y * direction.y;
      const south_norm = Math.sqrt(south.x * south.x + south.y * south.y);
      const direction_norm = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      // console.log("cos", prod /(south_norm * direction_norm));
      const angle_result_rad = Math.acos(prod /(south_norm * direction_norm))
      // console.log("angle_result_rad", angle_result_rad);
      angle_result = angle_result_rad * 360 / Math.PI
    }

    return <Graphics 
      key={`wind-${x}-${y}`}
      draw={draw} 
      scale={scaling} 
      angle={angle_result} 
      x={x} 
      y={y-10} /> 
  }
  
};

export default WindArrow;
