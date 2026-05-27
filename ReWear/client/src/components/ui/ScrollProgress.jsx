import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    />
  );
};

export default ScrollProgress;