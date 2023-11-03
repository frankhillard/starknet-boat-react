export type Coordinate = {
    x: number;
    y: number;
  };
  
export type Layer = 'base' | 'object';

export type ElementType = 'water' | 'ground' | 'high_water';

export type WindDirection = {
  x: number;
  y: number;
};

export type GridElement = Coordinate & {
  layer: Layer;
  type: ElementType;
  wind: WindDirection;
};

