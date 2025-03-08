import { motion } from "framer-motion";

const TextAnimation = ({ delay = 0, children, duration = 0.2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        opacity: 100,
        delay: delay,
      }}
      viewport={{ once: true }}
      exit={{ opacity: 0, y: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default TextAnimation;
