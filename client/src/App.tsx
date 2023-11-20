import { useDojo } from './DojoContext';
import { Direction, } from './dojo/createSystemCalls'
import { useComponentValue } from "@latticexyz/react";
import { Entity } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { setComponentsFromGraphQLEntities } from '@dojoengine/utils';
import Canvas from './ui/Canvas';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import skull from "./skull.png";
import { useElementStore } from './utils/store';

function App() {
  const {
    setup: {
      systemCalls: { spawn, move, turn },
      components,
      network: { graphSdk, contractComponents }
    },
    account: { create, list, select, account, isDeploying }
  } = useDojo();

  // extract query
  const { getEntities } = graphSdk()

  // entity id - this example uses the account address as the entity id
  const entityId = account.address.toString();

  // get current component values
  const position = useComponentValue(components.Boat, entityId as Entity);
  const moves = useComponentValue(components.Moves, entityId as Entity);


  const [isMusicPlaying, setMusicPlaying] = useState(false);

  const { ip, hit_mob, map: map_store, position: store_position, add_hole, reset_holes, set_size, set_wind } = useElementStore((state) => state);
  // console.log('ip', ip);


  // use graphql to current state data
  useEffect(() => {
    if (!entityId) return;

    const fetchData = async () => {
      try {
        const { data } = await getEntities();
        if (data && data.entities) {
          console.log("[App] fetching data:", data.entities.edges);
          setComponentsFromGraphQLEntities(contractComponents, data.entities.edges);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [entityId, contractComponents]);

  // return(
  //   <>
  //   <h1>Welcome to my app</h1>
  //   <button onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</button>
  //   <img src={skull} />
  //   <Stage 
  //     width={300} 
  //     height={300} 
  //     options={{ 
  //     backgroundColor: 0x012b30, 
  //     antialias: true 
  //     }}>
  //     <Sprite image={skull} />
  //   </Stage>
  //   </>
  // );


  return (
    <>
      <button onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</button>
      <div className="card">
        select signer:{" "}
        <select onChange={e => select(e.target.value)}>
          {list().map((account, index) => {
            return <option value={account.address} key={index}>{account.address}</option>
          })}i
        </select>
      </div>
      <div className="card">
        <button onClick={() => spawn(account)}>Spawn</button>
        <div className="flex-grow mx-auto mt-2">
          <Canvas setMusicPlaying={setMusicPlaying} />
        </div>
        <div>Moves Left: {moves ? `${moves['remaining']}` : 'Need to Spawn'}</div>
        <div>Position: {position && position.vec ? `${position?.vec['x']}, ${position?.vec['y']}` : 'Need to Spawn'}</div>
      </div>
      <div className="card">
        <button onClick={() => move(account, Direction.Up)}>Step</button> <br />
        <button onClick={() => turn(account, 45)}>Turn</button> <br />
      </div>
    </>
  );
}

export default App;
