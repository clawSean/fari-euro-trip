import { useMemo } from "react";
import type { CSSProperties } from "react";

interface ConfettiBurstProps {
  pieceCount?: number;
  className?: string;
}

const colors = ["#009246", "#ffffff", "#CE2B37", "#FFD166", "#2EC4B6", "#FF6B6B"];
const shapes = ["0", "9999px", "2px"] as const;

export function ConfettiBurst({ pieceCount = 72, className = "" }: ConfettiBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }, (_, index) => {
        const size = Math.round(Math.random() * 8 + 6);
        return {
          id: index,
          color: colors[index % colors.length],
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 0.45}s`,
          duration: `${Math.random() * 1.2 + 2.2}s`,
          size,
          radius: shapes[index % shapes.length],
          drift: `${Math.random() * 180 - 90}px`,
          spin: `${Math.random() * 720 + 540}deg`,
          start: `${Math.random() * -24 - 8}vh`,
        };
      }),
    [pieceCount],
  );

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-50 ${className}`} aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute animate-confetti"
          style={
            {
              left: piece.left,
              top: piece.start,
              width: piece.size,
              height: Math.max(4, Math.round(piece.size * 0.65)),
              backgroundColor: piece.color,
              borderRadius: piece.radius,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              "--confetti-drift": piece.drift,
              "--confetti-spin": piece.spin,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
