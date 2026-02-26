import { useEffect, useRef, useState } from "react";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
      <span className="gradient-text">{title}</span>
    </h2>
    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    <div className="mt-4 mx-auto w-16 h-0.5 bg-primary/40 rounded-full" />
  </div>
);

export default SectionHeading;

// Animate-on-scroll wrapper
export const AnimateIn = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
