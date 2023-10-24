import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import gsap from "gsap";
import { Canvas } from '@react-three/fiber';
import ScrollTrigger from "gsap/ScrollTrigger";
import ReactCurvedText from 'react-curved-text';
import { motion, useScroll, useSpring } from 'framer-motion';
import {CustomRevealFromBottom, CustomReveal} from './CustomText';
import { AiFillGithub, AiFillLinkedin, AiFillMail, AiOutlineShareAlt} from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { GoLinkExternal } from 'react-icons/go';
import ScrollOpacityComponent from './TextRevealAnimation';
import SkillList from './experience/SkillList';
import { OrbitControls } from '@react-three/drei';
import { Text } from '@react-three/drei';
import DevIconNormal from '../assets/Fonts/devicon.ttf'
import Lottie from "lottie-react";
import designAnimation from '../assets/Video/i5zjWBvIVT.json'
import {FiExternalLink } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);
const screenHeight = window.innerHeight

const Socials = ()=>{
    return(
        <div className='absolute flex flex-col gap-6 bottom-20 w-20 px-10 text-3xl'>
            <AiFillGithub />
            <AiFillLinkedin />
            <AiFillMail />
            <BsTelegram />
        </div>
    )
}

const NavScroll = ()=>{
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return (
        <div>
            <div className='fixed bottom-3 px-10 h-20 right-20 left-20 overflow-hidden rounded-3xl bg-black border-2 border-[#282e38]'>
                <motion.div className="absolute h-full bg-[#282e38] origin-[0%] right-0 left-0 z-10" style={{ scaleX }} />
                <div className='flex items-center h-full justify-between'>
                    <div className='z-20'>
                        Personal Portifolio
                    </div>
                    <div className='flex gap-20 z-20'>
                        <a>About</a>
                        <a>Skills</a>
                        <a>Works</a>
                    </div>
                    <div className='z-20'>
                        <button className='flex justify-center items-center rounded-md border-2 h-12 w-32 border-slate-100'>Contact Me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const CustomCursor = ()=>{
    const [isIntersecting, setIsIntersecting] = useState(false);
    const divRef = useRef()
    const MoveCursor = ()=>{
        gsap.to('.cursor', {
            x: event.clientX - 100,
            y: event.clientY - 50,
            stagger: 0
        })
    }

    const checkForIntersection = () => {
        const divRect = divRef.current.getBoundingClientRect();
        const textElements = document.querySelectorAll('h1');
        let isIntersecting = false;
      
        textElements.forEach((textElement) => {
          const textRect = textElement.getBoundingClientRect();
      
          if (
            divRect.left < textRect.right &&
            divRect.right > textRect.left &&
            divRect.top < textRect.bottom &&
            divRect.bottom > textRect.top
          ) {
            isIntersecting = textElement.textContent;
            return; // Exit the loop early if an intersection is detected
          }
        });
      
        setIsIntersecting(isIntersecting);
      };
      
      

    useEffect(() => {
        document.addEventListener('mousemove', () => {
            MoveCursor()
            checkForIntersection();
        });
      
        return () => {
          document.removeEventListener('mousemove', () => {
            MoveCursor()
            checkForIntersection();
          });
        };
      }, []);
      
      
    // useEffect(()=>{
    //     window.addEventListener('mousemove', MoveCursor)
    // },[])
    return(
        <div ref={divRef} className={`cursor absolute h-12 w-12 rounded-full mix-blend-multiply block !z-30 ${isIntersecting ? ' bg-red-600 h-52 w-52' : "bg-cyan-600"}`} style={{transition: "height 0.1s ease-in-out, width 0.1s ease-in-out"}}>
  
        </div>
    )
  }


const MainAbout = ()=>{
    return(
        <div className='w-full h-screen flex flex-col gap-4 justify-center px-32'>
        
            <h1 className='font-mono font-bold text-cyan-600 ml-16'>About me</h1>
        
            {/* <div className=' text-white py-4 mt-4 font-absolutHeadline font-bold text-7xl'>                
                <CustomReveal delay={1} content={"I am a developer based in Addis Ababa, Ethiopia and I enjoy creating immersive experinces."} />
            </div> */}
            <div className=' text-white py-4 mt-4 font-playFair font-bold text-6xl flex w-full justify-center'>                
                <ScrollOpacityComponent content='I am a full stack software developer specializing in frontend development and I enjoy creating immersive experinces. I also enjoy problem solving with programming and I have solved 450+ problems on leetcode.' />
            </div>
        </div>
    )
}
function LandingNormal() {
    const [menu, setMenu] = useState(false)
    const component = useRef();
    const slider = useRef();
    const serviceSlider = useRef()
    

    
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
        let panels = gsap.utils.toArray(".panel");
        let servicePanels = gsap.utils.toArray(".servicePanel");
        gsap.to(servicePanels, {
            xPercent: -100 * (servicePanels.length - 1),
            ease: "easeIn",
            scrollTrigger: {
                trigger: serviceSlider.current,
                pin: true,
                scrub: 0.8,
                snap: 0,
                end: () => "+=" + serviceSlider.current.offsetWidth
            }
        });

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: slider.current,
                pin: true,
                scrub: 0.8,
                // snap: 1 / (panels.length - 1),
                
                end: () => "+=" + slider.current.offsetWidth
            }
        });


        }, component);
        return () => ctx.revert();
    });


    
    return (
        <div ref={component} className='w-full z-10 relative mt-10'>
            {/* <CustomCursor /> */}
            <div className='h-screen absolute'>
                <Socials />
            </div>
            <div className='!z-50 w-full h-32 flex justify-between fixed top-10 px-4 md:px-10 lg:px-20'>
                <div>
                    <div className='absolute top-[-20px] ml-[-20px]'>
                        <ReactCurvedText
                            width={150}
                            height={150}
                            cx={75}
                            cy={75}
                            rx={50}
                            ry={50}
                            startOffset={25}
                            reversed={false}
                            text="I'm Abel Getahun"
                            textProps={{ style: { fontSize: 24, letterSpacing: 7, mixBlendMode: 'difference' } }}
                            textPathProps={{"fill": "#ffffff"}}
                            tspanProps={null}
                            ellipseProps={null}
                            className="absolute"
                            svgProps={{"className": "animate-[spin_5s_linear_infinite]"}}
                        />
                    </div>
                </div>
            </div>

            <div className='relative'>
                <AboutSection />
                <MainAbout />
                <ServiceSection serviceSlider={serviceSlider}/>
                {/* <SkillsSection /> */}
                <WorksSection slider={slider}/>
                <ContactSection />
                <NavScroll/>
            </div>
        </div>
    )
}


const AboutSection = ()=>{
    return(
        <div className={`w-full h-screen px-4 md:px-10 lg:px-20 pt-32`}>
            <div className='mt-10 text-opacity-60 w-full'>
                <div>
                    <div className='w-full flex justify-center'>
                        <motion.h1 
                            className='mt-6 w-fit font-mono font-bold text-cyan-600 text-center'
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                type: 'spring',
                                duration: 1,
                                bounce: 0.2
                            }}
                            >
                            Hi my name is
                        </motion.h1>

                    </div>
                    <div className='w-full flex justify-center'>
                        <motion.h1 
                            className='mt-6 w-fit text-8xl font-playFair text-white text-center'
                            initial={{
                                opacity: 0,
                                height: 0,
                                
                            }}
                            whileInView={{opacity: 1,}}
                            duration={2}
                            transition={{
                                type: 'spring',
                                duration: 1,
                                bounce: 0.2
                            }}
                            >
                            Abel Getahun
                        </motion.h1>
                    </div>
                </div>
                {/* <h1 className='mt-10 inline-block text-4xl font-AMERTO text-white'>
                    <CustomRevealFromBottom content="Hello world"/>
                </h1> */}
                <div className='w-full flex justify-center'>
                    <motion.h1 
                        className='mt-6 w-fit text-8xl font-playFair text-white text-center'
                        initial={{
                            opacity: 0,
                            height: 0,
                            y: 0
                        }}
                        whileInView={{opacity: 1, height: 40, y: 100}}
                        duration={2}
                        
                        >
                            I develop creative websites
                    </motion.h1>
                </div>
                
            </div>
            
        </div>
    )
}

const SkillsSection = ()=>{
    return(
        <div className='mt-32 h-screen px-4 md:px-10 lg:px-20'>
            <div className='mt-32 text-opacity-60 w-full flex justify-center md:justify-center md:px-10'>
                <h1 className='mt-10 font-playFair text-[150px] md:text-[180px] text-white'>Skills</h1>
            </div>
            <div className='flex w-full justify-between'>
                {/* <motion.div
                    initial={{
                        opacity: 0,
                        y: -50
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        type: 'spring',
                        duration: 2,
                        bounce: 0.4,
                    }}
                    className='font-devicon mt-4 text-6xl gap-4 text-opacity-60 flex flex-col justify-center items-start md:w-[500px] px-10 py-4'>
                        <span className='flex items-center gap-4'>
                            
                            <p className='text-base'>Three.js</p>
                            <progress className="w-40 bg-red-200 h-2 rounded" value={90} max="100"></progress>
                        </span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                </motion.div> */}
                {/* <Canvas
                    style={{height: screenHeight, zIndex: 0}}   
                >
                    <Text
                        position={[-1,0,-1]}
                        fontSize={2}
                        font={DevIconNormal}
                        >
                            
                    </Text>
                </Canvas> */}
                
            </div>
        </div>
    )
}

const ServiceCard = ({title, detail, count})=>{
    const bg = count == "01" ? "bg-[#282e38]/50" : count == "02" ? "bg-slate-200/50" : "bg-[#bed5e5]/50"
    const col = count == "01" ? "text-slate-200" : count == "02" ? "text-black/75" : "text-white"
    return(
        <div className={`servicePanel inline-block ${count==1 && "z-10"} backdrop-blur-sm w-[950px] h-[450px] ml-20 mt-4 ${bg} ${col} rounded-[50px]`}>
            <div className='flex h-full items-center p-16 pb-10 w-full'>
                <div className='flex flex-col h-full w-full justify-between'>
                    <div className='flex justify-between w-full'>
                        <div className='h-60 w-60 rounded-full'>
                            <Lottie animationData={designAnimation} loop={true} />
                        </div>
                        <h1 className=' text-justify leading-9 text-2xl max-w-lg'>{detail}</h1>
                    </div>
                    <div className='flex justify-between items-end'>
                        <h1 className='text-6xl font-bold font-gloucester'>{title}</h1>
                        <h1 className='text-8xl opacity-50'>{count}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ServiceSection = ({serviceSlider})=>{
    
    return (
        <div className=''>
            {/* <Canvas
                style={{height: screenHeight}}
            >
                <SkillList />        
            </Canvas> */}
            

            <div ref={serviceSlider} className=' mt-40 h-screen' >
                <div className='overflow-x-hidden'>
                    <div className='w-[5000px] flex items-center h-screen'>
                        <div className='servicePanel inline-block w-[800px] h-96 ml-20 mt-4'>
                            <div className='flex h-full items-center'>
                                <div className='text-opacity-60 w-full flex justify-center md:justify-center md:px-10'>
                                    <h1 className='mt-10 font-playFair text-[250px] md:text-[180px] text-white'>Services</h1>
                                </div>
                            </div>
                        </div>
                        <ServiceCard title="Design" detail="I specialize in creating mesmerizing and visually striking website and application designs that are meticulously tailored to elevate your brand's online presence." count={"01"}/>
                        <ServiceCard title="Development" detail="I provide a distinctive skill set that seamlessly integrates my design expertise with my development capabilities. By leveraging my combined skill set, I create exceptional digital solutions that effectively capture attention and ensure user satisfaction throughout the development process. " count={"02"}/>
                        <ServiceCard title="Deployment" detail="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita obcaecati est praesentium sapiente dicta recusandae, neque sit voluptate maxime doloribus molestias eius aliquam hic explicabo nemo sint quidem voluptatibus repudiandae." count={"03"}/>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )

}
const WorkCard = ()=>{
    return(
        <div className='panel relative inline-block w-[600px] h-[400px] mx-20 mt-4 bg-slate-500'>

            <div className='bg-gradient-to-t from-black to-black/0 flex justify-between items-center px-6 w-full h-20 absolute bottom-0'>
                <h1>Project Name</h1>
                <div className='flex gap-4 items-center'>
                    {/* <AiFillGithub className='text-2xl text-white' /> */}
                    <GoLinkExternal className='text-xl text-white'/>
                </div>
            </div>
        </div>
    )
}
const WorksSection = ({slider})=>{
    return(
        <div ref={slider} className=' h-screen'>
            <div className='overflow-x-hidden'>
                <div className='w-[8000px] flex items-center h-screen'>
                    <div className='panel inline-block text-opacity-60 justify-center md:justify-start md:px-20 lg:px-20'>
                        <div className='text-opacity-60 w-full flex justify-center md:justify-center md:px-10'>
                            <h1 className='mt-10 font-playFair text-[250px] md:text-[180px] text-white'>Works</h1>
                        </div>
                    </div>
                    <div className='w-[7000px] inline-block'>
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                        <WorkCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactSection = ()=>{
    return(
        <div className='mt-10 h-[700px] flex items-center text-opacity-60 w-full px-4 md:px-20 lg:px-20'>
            <div className='pl-28'>
                <h1 className='font-playFair text-[50px] md:text-[80px] w-2/3 leading-snug text-white'>Do you have a project in mind?</h1>
                <div className='ml-4  w-full'>
                    <div className='flex items-center gap-4 text-xl mt-6'>
                        {/* <AiFillMail className='text-xl'/> */}
                        <h1>Contact me at: <a href="mailto:abelgetahun55@gmail.com" className='text-gray-500'>abelgetahun55@gmail.com</a></h1>
                    </div>
                    <div className='flex justify-between w-[500px] mt-12'>
                        <span className='flex gap-2 items-center'>LinkedIn < FiExternalLink/></span>
                        <span className='flex gap-2 items-center'>Github < FiExternalLink/></span>
                        <span className='flex gap-2 items-center'>Telegram < FiExternalLink/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LandingNormal