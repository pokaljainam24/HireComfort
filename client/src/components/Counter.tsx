import { useRef } from "react";

interface CounterProps {
  value: number;
}

const Counter = ({ value }: CounterProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleRef = (element: HTMLSpanElement | null) => {
    if (!element || observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observerRef.current?.disconnect();
        observerRef.current = null;

        const target = value;
        const duration = 400;
        const delay = 10;
        const steps = duration / delay;
        const increment = target / steps;

        let current = 0;

        element.textContent = "0";

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            element.textContent = Math.floor(current).toString();
            setTimeout(updateCounter, delay);
          } else {
            element.textContent = target.toString();
          }
        };

        updateCounter();
      },
      {
        threshold: 0.1,
      },
    );

    observerRef.current.observe(element);
  };

  return (
    <span ref={handleRef} className="count">
      {value}
    </span>
  );
};

export default Counter;
