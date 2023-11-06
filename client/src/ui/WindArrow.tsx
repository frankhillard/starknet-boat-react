

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
  direction: number,
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



  let scaling = 1;
  if (force < 6) {
    scaling = 0;
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

  if (force === 0){
    return null; 
  } else {
    return <Graphics draw={draw} scale={scaling} rotation={2} x={x} y={y-10} /> 
  }
  
};

export default WindArrow;
