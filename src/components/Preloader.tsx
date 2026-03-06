import { useState, useEffect } from "react";

const lines = [
  "Initializing Security Modules…",
  "Loading Threat Intelligence…",
  "Establishing Secure Connection…",
  "System Ready.",
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= lines.length) {
      setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 400);
      }, 300);
      return;
    }
    if (charIndex < lines[currentLine].length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 25);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCharIndex(0);
    }, 250);
    return () => clearTimeout(t);
  }, [currentLine, charIndex, done, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background cyber-grid transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-md w-full px-6">
        <div className="font-mono text-sm space-y-2">
          {lines.slice(0, currentLine + 1).map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-primary shrink-0">❯</span>
              <span
                className={
                  i < currentLine
                    ? "text-muted-foreground"
                    : i === currentLine && currentLine === lines.length - 1
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }
              >
                {i < currentLine
                  ? line
                  : line.slice(0, charIndex)}
                {i === currentLine && currentLine < lines.length && (
                  <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-blink align-middle" />
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 h-0.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full"
            style={{
              width: `${Math.min(
                ((currentLine + charIndex / (lines[currentLine]?.length || 1)) /
                  lines.length) *
                  100,
                100
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
