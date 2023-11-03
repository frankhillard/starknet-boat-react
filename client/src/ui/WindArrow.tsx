

import { AnimatedSprite, useTick, Sprite, Graphics } from '@pixi/react';
// import { Container, Sprite, Stage, Text } from '@pixi/react';
// import { Assets, Texture } from 'pixi.js';
import { useEffect, useState, useCallback } from 'react';
// import { ActionableTile } from '../hooks/useGrid';
import { Coordinate } from '../type/GridElement';
// import { to_center, to_grid_coordinate, to_screen_coordinate } from '../utils/grid';
import { H_OFFSET, WIDTH, generateGrid, to_screen_coordinate } from '../utils/grid';

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
  console.log("Draw Wind", force, direction);

  const draw = useCallback((g) => {
    g.clear();
    // g.lineStyle(1, 0x00d900, 1);
    // g.drawRect(
    //   x,
    //   y - 16,
    //   1,
    //   10,
    // );

    g.beginFill(0xffd900);
    g.lineStyle(1, 0xffd900, 1);
    g.moveTo(x, y - 13);
    g.lineTo(x-4, y-13);
    g.lineTo(x, y+10-13);
    g.lineTo(x+4, y-13);
    g.endFill();

  }, [direction]);

  return <Graphics draw={draw} />
};

export default WindArrow;
