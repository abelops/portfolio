import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import './App.css'
import Landing from './landing/landing';
import { OrbitControls, CameraControls, useHelper, View, Loader } from '@react-three/drei';
import { motion, useScroll, useSpring } from "framer-motion";

import LandingNormal from './landing/LandingNormal';
import { Background } from './landing/landing';
import CustomLoader from './Loading';

const setUp = ({gl})=>{
  // gl.setClearColor("#2e2e2e")
  console.log("DO sth")
}
const ScreenWidth = window.screen.width
const ScreenHeight = window.screen.height
const aspect = ScreenWidth / ScreenHeight
console.log(ScreenWidth, ScreenHeight)

function App() {
  const canvasRef = useRef();
  const cameraRef = useRef()
  const light1 = useRef();
  const light2 = useRef();
  const loaderRef = useRef()
  // console.log(light2)
  // window.addEventListener('mousemove', (e)=>{
    //   light2.current.position.
  // })
  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
    //   stiffness: 100,
    //   damping: 30,
    //   restDelta: 0.001
    // });
    
    // console.log(scaleX)  
    
  console.log(loaderRef)
  return (
    <>
        <Canvas
          camera={{
            fov: 25,
            aspect,
          }}
          onCreated={setUp}
          ref={canvasRef}
          id="canvas"
          gl={{toneMappingExposure: 1}}
          >
            {/* <CameraControls ref={cameraRef} /> */}
            <ambientLight intensity={0.05} distance={1} castShadow color={"a89e32"}/>
            {/* <pointLight color={"red"} ref={light1} intensity={0.4} scale={30} distance={15} position={[2,0,2]} decay={3}/> */}
            {/* <pointLight color={"green"} ref={light2} intensity={0.4} distance={15} position={[-2,1,2]} decay={2}/> */}
            {/* <axesHelper scale={100}/> */}
            {/* <pointLight color={"#00b39b"} intensity={1} distance={10} position={[0,1,2]}/>
            <gridHelper scale={10} position={[0,-4,-50]}/>
            {/* <ambientLight intensity={0.2} castShadow color={"white"}/> */}
            {/* <spotLight position={[10, 15, 10]} angle={0.8} castShadow color={"yellow"}/> */}
            {/* <OrbitControls /> */}
            {/* <color attach="background" args={['#000000']} /> */}
            {/* <color attach="background" args={['#EFEFEF']} /> */}
            <fog attach="fog" args={['#17171b', 40, 800]} />
            <Suspense fallback={null}>
              <Landing canvasRef={canvasRef} cameraRef={cameraRef}/>
            </Suspense>
        </Canvas>
        <CustomLoader />
        {/* <motion.div className="progress-bar" style={{ scaleX }}/> */}
        <LandingNormal />
    </>
  )
}

export default App
