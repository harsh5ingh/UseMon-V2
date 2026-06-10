export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
