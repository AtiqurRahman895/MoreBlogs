import { motion, useSpring, useScroll } from "motion/react"

export default function ScrollProgress({children}) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    zIndex:60,
                    originX: 0,
                    backgroundColor: "#d5ae6b",
                }}
            />
            {children}
        </>
    )
}