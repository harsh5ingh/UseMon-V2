import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  formatter?: (value: number) => string;
};

export function AnimatedCounter({ value, formatter = (number) => Math.round(number).toLocaleString() }: Props) {
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: setDisplay
    });
    previous.current = value;
    return controls.stop;
  }, [value]);

  return <span>{formatter(display)}</span>;
}
