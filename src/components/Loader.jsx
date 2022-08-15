import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
    const variants = {
        animate: {
            transition:{
                staggerChildren: 0.2
            }
        },
        initial: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }
    const loader = {
        initial: {
            y: '0%'
        }, 
        animate: {
            y: '100%'
        }
    }
    const transition = {
        duration: 0.5,
        yoyo: Infinity,
        ease: 'easeInOut'
    }
  return (
    <motion.div className="flex gap-1 h-7 h-7" variants={variants} initial="initial" animate='animate' >
        <motion.span variants={loader} transition={transition} className="w-2 h-2 rounded-full bg-black"/>
        <motion.span variants={loader} transition={transition} className="w-2 h-2 rounded-full bg-black"/>
        <motion.span variants={loader} transition={transition} className="w-2 h-2 rounded-full bg-black"/>
    </motion.div>
  )
}

export default Loader