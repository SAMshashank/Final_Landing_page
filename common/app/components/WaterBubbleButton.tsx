'use client'

import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'
import { useEffect } from 'react'


const BubbleButton = styled(motion.button)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background:radial-gradient(circle at 30% 30%, #f5ff5c, #cc5100);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`

const Droplet = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #5cabff;
`

const dropletVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, y: 100, scale: 0 }
}

const bounceVariants = {
  initial: { y: 0 },
  bounce: { y: [-10, 0, -5, 0], transition: { duration: 0.6, times: [0, 0.3, 0.6, 1] } }
}

export default function WaterBubbleButton({ onClick, isClicked }: { onClick: () => void, isClicked: boolean }) {
  const controls = useAnimation()

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      controls.start('bounce')
    }, 2000)

    return () => clearInterval(bounceInterval)
  }, [controls])

  return (
    <BubbleButton
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={bounceVariants}
      initial="initial"
      animate={controls}
    >  <img
    src='/Img/2725783.png'
    alt="Click"
    className="w-full h-auto max-w-[50px] md:max-w-[100px] lg:max-w-[100px] p-1 m-5 mx-auto"
  />
      {isClicked && (
        <>
          {[...Array(10)].map((_, i) => (
            <Droplet
              key={i}
              variants={dropletVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}
    </BubbleButton>
  )
}

