import { Container, Sprite, Stage, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState, useMemo } from 'react';
import { BlurFilter } from 'pixi.js';
import { shortString } from 'starknet';
import { useDojo } from '../DojoContext';

// import heart from '../assets/heart1.png';
// import skull from '../assets/skull.png';
import { TileType, useComponentStates } from '../hooks/useComponentStates';
import { useGrid } from '../hooks/useGrid';
import useIP from '../hooks/useIP';

import { Coordinate, GridElement } from '../type/GridElement';

// import { fetchData } from '../utils/fetchData';
import { HEIGHT, H_OFFSET, WIDTH, areCoordsEqual, generateGrid, to_grid_coordinate, to_screen_coordinate } from '../utils/grid';

// import { getNeighbors } from '../utils/pathfinding';
import { useElementStore } from '../utils/store';

import Boat, { BoatType } from './Boat';
import NewGame from './NewGame';
import Map from './Map';

// import GameOverModal from './GameOverModal'; // importez le composant
// import Map from './Map';
// import Mob, { MobType } from './Mob';
// import NewGame from './NewGame';
// import PassTurnButton from './PassTurnButton';
// import ResetButton from './ResetButton';
// import Sword from './Sword';
// import TurnStatus from './TurnStatus';

interface CanvasProps {
    setMusicPlaying: (bool: boolean) => void;
  }

const Canvas: React.FC<CanvasProps> = ({ setMusicPlaying }) => {
    const {
      setup: {
        systemCalls: { create, spawn, move },
        network: { graphSdk },
      },
      account: { account },
    } = useDojo();
  
    const contractState = useComponentStates();
    const { game, map: mapState, boat } = contractState;
  
    // const [score, setScore] = useState<number>(0);
    // const [level, setLevel] = useState<number>(0);
    const [grid, setGrid] = useState<GridElement[][]>([]);
    const [hoveredTile, setHoveredTile] = useState<Coordinate | undefined>(undefined);
    // const [hoveredMob, setHoveredMob] = useState<MobType | undefined>(undefined);
    const [absolutePosition, setAbsolutePosition] = useState<Coordinate | undefined>(undefined);
    // const [isGameOver, setIsGameOver] = useState(false);
    // const [hasPlayed, setHasPlayed] = useState(false);
  
    const { map, add_hole, set_size, reset_holes, set_ip, set_wind } =
      useElementStore((state) => state);
  
    // useEffect(() => {
    //   if (turn === TileType.Knight) {
    //     setHasPlayed(false);
    //   }
    // }, [turn]);
  
    const [pseudo, setPseudo] = useState('');
    const { ip, loading, error } = useIP();
    useEffect(() => {
      if (!loading && ip) {
        set_ip(ip);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ip, loading]);
  
    const generateNewGame = async () => {
      // setScore(0);
      const storedIsMusicPlaying = localStorage.getItem('isMusicPlaying');
      if (storedIsMusicPlaying === null) {
        setMusicPlaying(true);
      } else {
        setMusicPlaying(JSON.parse(storedIsMusicPlaying));
      }
      reset_holes();
  
      console.log("pseudo", pseudo);
      const pseudoFelt = pseudo !== undefined ? shortString.encodeShortString(pseudo): "anonymous";
      console.log("pseudoFelt", pseudoFelt);
      // create(account, ip, 1000, pseudoFelt); //, set_hit_mob, set_turn);
      create(account, ip, 1000, "ZEEZ", add_hole, set_size, set_wind); //, set_hit_mob, set_turn);
    };
  
    // useEffect(() => {
    //   if (game.over === 1) {
    //     setIsGameOver(true);
    //   }
    // }, [game.over]);
  
    // useEffect(() => {
    //   const fetchAndProcessData = async () => {
    //     const array = await fetchData(graphSdk);
    //     array.forEach((e) => add_to_leaderboard(e));
    //   };
  
    //   fetchAndProcessData();
    // }, [isGameOver]);
  
    useEffect(() => {
      console.log("[CANVAS] generateGrid", map);
      setGrid(generateGrid(map));
    }, [map]);
  
    // useEffect(() => {
    //   if (mapState.score) setScore(mapState.score);
    // }, [mapState.score]);
  
    // useEffect(() => {
    //   if (mapState.level) setLevel(mapState.level);
    // }, [mapState]);
  
    useEffect(() => {
      if (mapState.spawn === 0) {
        // spawn(account, ip, add_hole, set_size, reset_holes, set_hit_mob, set_turn);
        // console.log("AUTO SPAWN !!")
        // spawn(account);
      }
    }, [mapState.spawn]); 
  

    useEffect(() => {
      if (boat !== undefined) {
        // console.log("[CANVAS] boat (use efect)", boat);
      }
    }, [boat]);
    // const { knightNeighbors, barbarianNeighbors, bowmanNeighbors, wizardNeighbors } = useGrid(grid);
  
    // const passTurn = () => {
    //   // pass turn is a play but with same position
    //   if (knight.position)
    //     play(account, ip, knight.position?.x, knight.position?.y, add_hole, set_size, reset_holes, set_hit_mob, set_turn);
    // };
  
    // PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    // PIXI.Texture.from(skull).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const blurFilter = useMemo(() => new BlurFilter(4), []);

    // a tile is considered composed of 100x100 so absolute boat position (90, 90) is represented by position (0.9, 0.9) in the grid
    // since the centre of tile_0_0 is at absolute position (100, 100), we set an offset of (-1,-1)
    const boat_position = { x: (Number(boat.position.x) / 100) - 1, y: (Number(boat.position.y) / 100) - 1 };
    const boat_position_screen = to_screen_coordinate(boat_position);    
    // console.log("[Canvas] BOAT ", boat, boat_position, boat_position_screen);
    const boat_direction = { x: Number(boat.direction.x), y: Number(boat.direction.y) };
  // console.log("[Canvas] BOAT ", boat, boat_direction); //, boat_position_screen);

    return (
        <div style={{ position: 'relative' }}>
          {map.size === 0 && <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />}
            <Stage
            width={WIDTH}
            height={HEIGHT}
            options={{ backgroundColor: 'steelblue' }} //'#242424' }}
            onPointerMove={(e) => {
                const gridPos = to_grid_coordinate({
                x: e.nativeEvent.offsetX - WIDTH / 2,
                y: e.nativeEvent.offsetY - H_OFFSET + 18, // 18 otherwise mouse not centered on the tile
                });
                
                const tileX = Math.round(gridPos.x);
                const tileY = Math.round(gridPos.y);
    
                const tileCoords = { x: tileX, y: tileY };
                if (hoveredTile === undefined || !areCoordsEqual(hoveredTile, tileCoords)) {
                  setHoveredTile(tileCoords);
                // setAbsolutePosition({
                //     x: e.nativeEvent.offsetX,
                //     y: e.nativeEvent.offsetY,
                // });
                }
            }}
            >
                <Container sortableChildren={true}>
                {/* <Text text="Hello World" anchor={{ x: 0, y: 0 }} filters={[blurFilter]} /> */}
                {/* <Text text={game?.seed} anchor={{ x: 0.02, y: 0.02 }} /> */}
                <Text text={boat?.position?.x} anchor={{ x: 0, y: 0 }} />
                {/* <Text text={boat.position?.y} anchor={{ x: 5, y: 5 }} /> */}
                <Map hoveredTile={hoveredTile} />  
                {boat !== undefined && boat.health !== undefined && (
                  <Boat
                    type="classic"
                    targetPosition={boat_position_screen}
                    isHovered={false} 
                    health={boat.health}
                    position={boat_position_screen}
                    direction={boat_direction}
                  />
                )}
                

                </Container>
            </Stage>
            
        </div>
    );
  };
  

export default Canvas;