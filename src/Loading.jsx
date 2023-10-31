import { useProgress } from "@react-three/drei"
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CircularProgress from "./ProgressLoading";

function CustomLoader() {
    const  { progress } = useProgress()
    const [loadingState, setLoadingState] = useState(false)
    const [started, setStarted] = useState(false)
    console.log(progress)
    useEffect(()=>{
        if(progress==100){
            setTimeout(()=>{
                setLoadingState(true)
            },1000)
        }
    },[progress])
    return (
        <div className={`${loadingState && 'hidden'} h-screen w-screen fixed flex justify-center items-center top-0 bg-black z-20`}>
            <div className={`absolute flex w-full h-screen justify-center items-center mt-14 ml-14 ${loadingState && 'hidden'} `}>
                <CircularProgress progress={progress}/>
            </div>
            <h1 className="font-absolutHeadline text-2xl text-[#8fb3b3]">{progress}%</h1>
        </div>
    ) 
    
    

}

export default CustomLoader