import { useRef, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Man } from "./Man7";
import { Text3D, Text, Environment, Sphere } from "@react-three/drei";
import * as THREE from 'three';
import Noise3d from "./noise3d";
import font from '../assets/Fonts/Montserrat Thin_Regular.json';
import AmertoFont from '../assets/Fonts/AmertonFont.json';
import DevIconFont from '../assets/Fonts/devicon_Regular.json';
import DevIconNormal from '../assets/Fonts/devicon.ttf'
import diffuseMap from '../assets/Textures/lines4.jpg';
import { IconVertex } from "./shaders/IconShaders";
import { IconFragment } from "./shaders/IconFragment";
import { LayerMaterial } from "lamina";
import { Gradient } from "lamina";

export const Background = ()=>{
    const bgScene = useRef()
    const diffuseTexture = useLoader(TextureLoader, diffuseMap);
    const fragShader = /* glsl */`
        varying vec2 vUv;
        varying vec3 vPos;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float uTime;
        uniform sampler2D uTexture;
        varying float vElevation;

        void main() {
            vec2 points = vec2(vUv * 1.0);
            vec4 texture = texture2D(uTexture, points);
            texture.r = texture.r * 0.05;
            texture.g = texture.g * 0.05;
            texture.b = texture.b * 0.05;
            vec3 col = mix(colorA, colorB, vElevation);
            gl_FragColor = texture;
        }
    `;
    
    const vertShader = /* glsl */`
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uTime;
        varying float vElevation;
        ${Noise3d}    
        void main() {
            // vec3 pos = vec3(position.x, position.y, position.z + snoise(vec3(uv, uTime*0.1)) * sin(uv.x * 20.) * sin(uv.y * 20.));
            // vec3 pos = vec3(position.x, position.y, position.z + snoise(vec3(uv, uTime*0.5)) * sin(uv.x * 20.));
            vec3 pos = vec3(position.x, position.y, position.z + 0.3 * sin(uv.x * 20. + uTime * 0.7));
            float depth = 1.0 - (pos.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
            vUv = uv;
            vPos = position;
            vElevation = depth;
        }
    `;
    useFrame(({clock})=>{
        // console.log(bgScene.current.material)
        bgScene.current.material.uniforms.uTime.value = clock.elapsedTime; 
    })
    console.log(vertShader)
    return(
        <>
            <mesh receiveShadow ref={bgScene}>
                <planeGeometry attach="geometry" args={[5, 3, 70, 70]} />
                <shaderMaterial
                    attach="material"
                    vertexShader={vertShader}
                    fragmentShader={fragShader}
                    // wireframe
                    uniforms={{
                        colorA: { value: new THREE.Color("#330a38") },
                        colorB: { value: new THREE.Color("#000000") },
                        uTime:  { value: 0},
                        uTexture: { value: diffuseTexture}
                    }}
                 />
            </mesh>
        </>
    )
}

export const Background1 = ()=>{
    const bgScene = useRef()
    const diffuseTexture = useLoader(TextureLoader, diffuseMap);
    const fragShader = /* glsl */`
        varying vec2 vUv;
        varying vec3 vPos;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float uTime;
        uniform sampler2D uTexture;
        varying float vElevation;

        void main() {
            vec2 points = vec2(vUv * 1.0);
            vec4 texture = texture2D(uTexture, points);
            texture.r = texture.r * 0.05;
            texture.g = texture.g * 0.05;
            texture.b = texture.b * 0.05;
            vec3 col = mix(colorA, colorB, vElevation);
            gl_FragColor = texture;
        }
    `;
    
    const vertShader = /* glsl */`
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uTime;
        varying float vElevation;
        ${Noise3d}    
        void main() {
            // vec3 pos = vec3(position.x, position.y, position.z + snoise(vec3(uv, uTime*0.1)) * sin(uv.x * 20.) * sin(uv.y * 20.));
            // vec3 pos = vec3(position.x, position.y, position.z + snoise(vec3(uv, uTime*0.5)) * sin(uv.x * 20.));
            vec3 pos = vec3(position.x, position.y, position.z + 0.3 * sin(uv.x * 20. + uTime * 0.7));
            float depth = 1.0 - (pos.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
            vUv = uv;
            vPos = position;
            vElevation = depth;
        }
    `;
    useFrame(({clock})=>{
        // console.log(bgScene.current.material)
        bgScene.current.material.uniforms.uTime.value = clock.elapsedTime; 
    })
    console.log(vertShader)
    return(
        <>
        <Environment preset="sunset" />
          <Sphere scale={[100,100,100]} rotateY={Math.PI/2} ref={bgScene}>
            <shaderMaterial
                attach="material"
                vertexShader={vertShader}
                fragmentShader={fragShader}
                // wireframe
                uniforms={{
                    colorA: { value: new THREE.Color("#330a38") },
                    colorB: { value: new THREE.Color("#000000") },
                    uTime:  { value: 0},
                    uTexture: { value: diffuseTexture}
                }}
                lighting="physical"
                transmission={1.3}
                side={THREE.BackSide}
            >
                <Gradient
                    colorA={"blue"}
                    colorB={"red"}
                />
            </shaderMaterial>
          </Sphere>
        </>
    )
}

const ScreenWidth = window.screen.width
const ScreenHeight = window.screen.height
const aspect = ScreenWidth / ScreenHeight



const Landing = ({canvasRef, cameraRef})=>{
    const introRef = useRef()
    const iconRef = useRef()
    
    
    // useFrame(({clock})=>{
        // introRef.current.rotation.y = Math.sin(clock) * 0.02;
        // cameraRef.current.rotate(Math.PI * 0.002, 0, true);
        // if(iconRef.current){
        //     iconRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
        // }
    // })
    console.log(introRef)
    const iconUniforms = {
        uTime: {value: 0},
        uMin: {value: new THREE.Vector3(0,0,0)},
        uMax: {value: new THREE.Vector3(0,0,0)}
    }
    // useEffect(()=>{
    //     if(iconRef.current){
    //         // console.log(iconRef.current.geometry)
    //         iconRef.current.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0,0,0), 3.5)
    //         iconRef.current.geometry.computeBoundingBox()
    //         iconRef.current.material.uniforms.uMin.value = iconRef.current.geometry.boundingBox.min
    //         iconRef.current.material.uniforms.uMax.value = iconRef.current.geometry.boundingBox.max
    //         // iconRef.current.geometry.center()
    //         console.log(iconRef.current.material.uniforms)
    //     }
    // },[])
    return(
        <>
          {/* <Background /> */}
          <Environment preset="warehouse" />
          {/* <Sphere scale={[100,100,100]} rotateY={Math.PI/2}>
            <LayerMaterial
                lighting="physical"
                transmission={1.3}
                side={THREE.BackSide}
            >
                <Gradient
                    colorA={"black"}
                    colorB={"red"}x
                    axes="y"
                />
            </LayerMaterial>
          </Sphere> */}
          {/* <Background1 /> */}
          <Man canvasRef={canvasRef}/>
          {/* <Text3D 
            color="white"
            font={font}
            fontSize={0.1}
            scale={2}
            // rotateY={45}
            position={[-1,0,0]}
            ref={iconRef}
            bevelEnabled
            bevelThickness={0}
            bevelSize={0}
            curveSegments={10}
            >
                <shaderMaterial 
                    vertexShader={IconVertex}
                    fragmentShader={IconFragment}
                    uniforms={iconUniforms}
                />
                hello world Hello again hereeee</Text3D> */}
            {/* <Text3D 
                color="white"
                font={DevIconFont}
                fontSize={20}
                scale={0.1}
                rotateY={45}
                position={[-1,-0,1]}
                ref={introRef}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
            >            </Text3D> */}
            {/* <Text
                position={[-1,0,-1]}
                fontSize={0.4}
                font={DevIconNormal}
                >
                    
            </Text> */}
        </>
    )
}

export default Landing