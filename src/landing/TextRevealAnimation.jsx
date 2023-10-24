import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SplitType from 'split-type';
import gsap from 'gsap';
import {motion} from 'framer-motion'

const ScrollOpacityComponent = ({content }) => {
  useEffect(() => {
    const splitText = new SplitType('.scroll-opacity-text', {
      types: ['words, chars, lines'],
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-opacity-container',
        start: 'top 100%',
        end: 'bottom 70%',
        scrub: true,
        markers: false,
      },
    });

    tl.from(splitText.chars, {
      opacity: 0.2,
      duration: 1,
      stagger: 0.1,
    });
  }, []);

  return (
    <motion.div
        initial={{
          opacity: 0,
      }}
      whileInView={{opacity: 1}}
      whileFocus={{scale: 1.3}}
      duration={0.1}
    >
      <div className="scroll-opacity-container">
        <p className="scroll-opacity-text text-justify leading-tight">{content}</p>
      </div>
    </motion.div>
  );
};

ScrollOpacityComponent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ScrollOpacityComponent;
