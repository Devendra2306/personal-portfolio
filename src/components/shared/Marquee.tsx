import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface MarqueeProps {
  items: string[];
  speed?: 'normal' | 'slow';
  className?: string;
}

export function Marquee({ items, speed = 'normal', className = '' }: MarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  return (
    <div className={`w-full overflow-hidden flex bg-[rgba(255,255,255,0.015)] border-y border-[rgba(255,255,255,0.04)] py-5 ${className}`}>
      {prefersReducedMotion ? (
        <div className="flex w-full justify-center gap-8 flex-wrap px-4">
          {items.map((item, i) => (
            <span key={i} className="font-[family-name:var(--font-mono)] text-xs md:text-sm text-[var(--color-off-white)] opacity-50 tracking-widest uppercase">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className={`flex whitespace-nowrap w-max hover:[animation-play-state:paused] ${animationClass}`}>
          {/* We duplicate the items 4 times to ensure it covers wide screens seamlessly. The keyframe shifts by -50%, which perfectly loops when split in half. */}
          {[...Array(4)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-10 px-5 items-center">
              {items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-10 items-center">
                  <span className="font-[family-name:var(--font-mono)] text-xs md:text-sm text-[var(--color-off-white)] opacity-50 tracking-[0.25em] uppercase hover:text-[#C4917A] hover:opacity-100 transition-colors duration-300 cursor-default">
                    {item}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
