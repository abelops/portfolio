import React, {useEffect, useState} from 'react'
import { delay, motion, useScroll } from 'framer-motion';



export const CustomRevealFromBottom = ({content}) => {
    const wordList = content.split("")
    const ret = wordList.map((l, i)=>(
            <motion.span 
                className='inline-block'
                initial={{
                    opacity: 0,
                    y: 50
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    type: 'spring',
                    duration: 1,
                    bounce: 0.4,
                    delay: i/10,
                    repeatType: 'loop',
                }}
                >
                    {l == " " ? "\u00A0" : l}
            </motion.span>
    ))
    return <div className='flex flex-wrap'>{ret}</div>
}

export const CustomReveal = ({content, delay=0}) =>{
    const [showComponent, setShowComponent] = useState(false);
    const wordList = content.split("")
    const ret = wordList.map((l, i)=>(
            <motion.span
                className='block'
                initial={{
                    opacity: 0.4,
                }}
                whileInView={{
                    opacity: 1,
                }}
                transition={{
                    type: 'spring',
                    duration: 0.1,
                    bounce: 0.4,
                    delay: i / 30,
                    repeatType: 'loop',
                }}
                >
                    {l == " " ? "\u00A0" : l}
            </motion.span>
    ))
    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowComponent(true);
        }, delay * 1000);
    
        return () => clearTimeout(timeout);
      }, []);
    
      if (!showComponent) {
        return null; // Render nothing while waiting
      }
    return <div className='flex flex-wrap'>{ret}</div>
}