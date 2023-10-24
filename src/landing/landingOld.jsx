
const Floor = ()=>{
    return(
        <mesh rotation-x={-(Math.PI / 2)} position-y={-5} position-z={-50} receiveShadow>
            <planeGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

const Building = ({pos})=>{
    return(
        <mesh rotation-x={-(Math.PI / 2)} position={pos} receiveShadow>
            <boxGeometry attach="geometry" args={[6, 6, 10]} />
            <meshStandardMaterial attach="material" color="silver" />
        </mesh>
    )
}

const ManyBuildings = () => {
    const tot = 100;
    const buildings = [];
    const positions = new Set(); // Store the positions of the existing buildings
    const gridSize = 20; // Size of the grid blocks
    const gridSpacing = 15; // Spacing between the grid blocks
    const maxOffset = 0; // Maximum offset from the grid position
  
    for (let i = 0; i < tot; i++) {
      let pos;
      
        // Generate a new position on a grid-like pattern with some random offset
        while(true){
            pos = [
                Math.floor(Math.random() * gridSize) * gridSpacing - 50 + Math.random() * maxOffset * 2 - maxOffset,
                0,
                (Math.floor(Math.random() * gridSize) * gridSpacing - 50 + Math.random() * maxOffset * 2 - maxOffset)-40,
              ];
            if((pos[0] >= -47 && pos[0] <= 47 && pos[2] > -97 && pos[2] < -3 ) && !positions.has(pos)){
                break
            }
        }
        
        console.log(pos[0], pos[1], pos[2])
     
  
      buildings.push(<Building pos={pos} />);
      positions.add(pos);
    }
  
    return (
      <>
        {buildings}
      </>
    );
};


const Landing = ()=>{
    return(
        <>
            <ManyBuildings />
            {/* <Building pos={[0,0,-3]} /> */}
            {/* <Building pos={[0,0,-97]} /> */}
            {/* <Building pos={[0,0,-50]} /> */}
            {/* <Building pos={[-47,0,-50]} /> */}
            {/* <Building pos={[47,0,-50]} /> */}
            <Floor />
        </>
    )
}

export default Landing