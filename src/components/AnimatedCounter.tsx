import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter = ({ end, label, suffix = "", decimals = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-4xl font-bold tracking-tight tabular text-foreground">
        {count.toFixed(decimals)}{suffix}
      </span>
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
};

export default AnimatedCounter;
