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
import { HEIGHT, H_OFFSET, WIDTH, areCoordsEqual, generateGrid, to_grid_coordinate } from '../utils/grid';

// import { getNeighbors } from '../utils/pathfinding';
import { useElementStore } from '../utils/store';

import Boat, { BoatType } from './Boat';
import NewGame from './NewGame';

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
    const { game, map: mapState, boat, hitter, hitPosition } = contractState;
  
    const [score, setScore] = useState<number>(0);
    const [level, setLevel] = useState<number>(0);
    const [grid, setGrid] = useState<GridElement[][]>([]);
    const [hoveredTile, setHoveredTile] = useState<Coordinate | undefined>(undefined);
    // const [hoveredMob, setHoveredMob] = useState<MobType | undefined>(undefined);
    const [absolutePosition, setAbsolutePosition] = useState<Coordinate | undefined>(undefined);
    // const [isGameOver, setIsGameOver] = useState(false);
    // const [hasPlayed, setHasPlayed] = useState(false);
  
    const { _ip, hit_mob, map, add_hole, set_size, reset_holes, set_ip } =
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
      setScore(0);
      const storedIsMusicPlaying = localStorage.getItem('isMusicPlaying');
      if (storedIsMusicPlaying === null) {
        setMusicPlaying(true);
      } else {
        setMusicPlaying(JSON.parse(storedIsMusicPlaying));
      }
      reset_holes();
  
      const pseudoFelt = shortString.encodeShortString(pseudo);
      // create(account, ip, 1000, pseudoFelt); //, set_hit_mob, set_turn);
      create(account, ip, 1000, pseudoFelt); //, set_hit_mob, set_turn);
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
        
        spawn(account);
      }
    }, [mapState.spawn]);
  
    // const { knightNeighbors, barbarianNeighbors, bowmanNeighbors, wizardNeighbors } = useGrid(grid);
  
    // const passTurn = () => {
    //   // pass turn is a play but with same position
    //   if (knight.position)
    //     play(account, ip, knight.position?.x, knight.position?.y, add_hole, set_size, reset_holes, set_hit_mob, set_turn);
    // };
  
    // PIXI.Texture.from(heart).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    // PIXI.Texture.from(skull).baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const blurFilter = useMemo(() => new BlurFilter(4), []);
    console.log("[Canvas] BOAT", boat);
    return (
        <div style={{ position: 'relative' }}>
          {map.size === 0 && <NewGame onClick={generateNewGame} onPseudoChange={setPseudo} />}
            <Stage
            width={WIDTH}
            height={HEIGHT}
            options={{ backgroundColor: 'goldenrod' }} //'#242424' }}
            // onPointerMove={(e) => {
            //     const gridPos = to_grid_coordinate({
            //     x: e.nativeEvent.offsetX - WIDTH / 2,
            //     y: e.nativeEvent.offsetY - H_OFFSET + 18, // 18 otherwise mouse not centered on the tile
            //     });
            //     const tileX = Math.round(gridPos.x);
            //     const tileY = Math.round(gridPos.y);
    
            //     const tileCoords = { x: tileX, y: tileY };
            //     if (hoveredTile === undefined || !areCoordsEqual(hoveredTile, tileCoords)) {
            //     setHoveredTile(tileCoords);
            //     setAbsolutePosition({
            //         x: e.nativeEvent.offsetX,
            //         y: e.nativeEvent.offsetY,
            //     });
            //     }
            // }}
            >
                <Container sortableChildren={true}>
                <Text text="Hello World" anchor={{ x: 0, y: 0 }} filters={[blurFilter]} />
                <Text text="Hello World" anchor={{ x: 0.02, y: 0.02 }} />
                    {/* <Map hoveredTile={hoveredTile} /> */}
                    {boat.position && boat.health !== undefined && (
                      <Boat
                        type="classic"
                        targetPosition={boat.position}
                        isHovered={false} 
                        health={boat.health}
                        position={boat.position}
                      />
                    )}
                </Container>
            </Stage>
            
        </div>
    );
  };
  

export default Canvas;