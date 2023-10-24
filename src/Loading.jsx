import { useProgress } from "@react-three/drei"
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomLoader() {
    const  { progress } = useProgress()
    const [loadingState, setLoadingState] = useState(false)
    console.log(progress)
    useEffect(()=>{
        if(progress==100){
            setLoadingState(true)
        }
    },[progress])
    if(progress<100){
        return (
            <div className="h-screen w-screen fixed flex justify-center items-center top-0 bg-black z-20">
                CustomLoader
            </div>
        ) 
    }
    

}

export default CustomLoader