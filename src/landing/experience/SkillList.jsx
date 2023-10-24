import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Box, useTexture } from '@react-three/drei';
import develpmentTexture from '../../assets/svgs/development.17795f81.svg';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Suspense } from 'react';

const SkillText = ({texture, position}) =>{
    return(
        <>
            <ambientLight
                />
            <Physics>
                {texture.map((_,i)=>(
                    <RigidBody colliders="cuboid"  shape='capsule'>
                        <mesh position={[i+(i%2)-4,i%3+((i%2) * 0.4 ),1]}>
                            <boxGeometry args={[2,0.7,0.1]}/>
                            <meshBasicMaterial map={useTexture('/svgs/'+ (Number(i)+1).toString() +".svg")} transparent={true} />
                        </mesh>
                    </RigidBody>
                ))}
                
                <RigidBody type="fixed">
                    <Box args={[20,1,20]} position={[0,-3.4,0]} rotateX={Math.PI}>
                        <meshStandardMaterial color={"greenyellow"} transparent={true} opacity={0}/>
                    </Box>
                </RigidBody>
                <RigidBody type="fixed" >
                    <CuboidCollider args={[10,10,0.1]} position={[0,0,1.3]}/>
                    <CuboidCollider args={[10,10,0.1]} position={[0,0,1]}/>
                    <CuboidCollider args={[0.1,5,1]} position={[-5,0,2]}/>
                    <CuboidCollider args={[0.1,5,1]} position={[7,0,2]}/>
                </RigidBody>
            </Physics>
        </>
    )
}
const SkillList = ()=>{
    const textureList = new Array(9).fill(0)
    return(
        <>
            <Suspense>
                <SkillText texture={textureList} position={[0,0,0]}/>
            </Suspense>
            {/* <SkillText texture={"web-design.9bbe69be.svg"} position={[0,3,0]}/>
            <SkillText texture={"user-experience.acd1223f.svg"} position={[0,3,0]}/>
            <SkillText texture={"animation.96a952dc.svg"} position={[0,3,0]}/> */}
        </>
    )
}

export default SkillList