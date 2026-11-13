import React from 'react';

interface DustOverlayProps {
  intensity?: 'low' | 'medium' | 'storm';
}

export const DustOverlay: React.FC<DustOverlayProps> = ({ intensity = 'low' }) => {
  const particleCount = intensity === 'storm' ? 45 : intensity === 'medium' ? 20 : 12;

  // Generate deterministic particles for stable rendering
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: (i % 5) + 2,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      duration: `${4 + (i % 6)}s`,
      delay: `${(i * 0.4) % 3}s`,
      opacity: 0.15 + ((i % 5) * 0.12),
    }));
  }, [particleCount]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

