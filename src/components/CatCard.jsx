// src/components/CatCard.jsx - AESTHETIC UPDATE
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Heart, X } from 'lucide-react';

const CatCard = ({ cat, onSwipe, index, isTopCard }) => {
  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    config: { friction: 50, tension: 500 },
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      if (!isTopCard) return;

      const isSwiped = Math.abs(mx) > 200 || (Math.abs(mx) > 100 && vx > 0.5);
      const direction = xDir < 0 ? 'left' : 'right';

      if (!active && isSwiped) {
        api.start({
          x: (200 + window.innerWidth) * xDir,
          rot: xDir * 20,
          scale: 1,
          immediate: false,
          config: { friction: 20, tension: 200 },
          onRest: () => onSwipe(direction, cat),
        });
      } else {
        api.start({
          x: active ? mx : 0,
          rot: active ? mx / 100 : 0,
          scale: active ? 1.05 : 1,
          immediate: active,
        });
      }
    },
    { filterTaps: true, preventDefault: true }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        transform: x.to((xVal) => `translateX(${xVal}px)`),
        rotate: rot.to((rotVal) => `${rotVal}deg`),
        scale,
        zIndex: -index,
        position: 'absolute',
        willChange: 'transform',
      }}
      className={`
        absolute
        w-[300px] h-[300px]
        bg-cat-bg-light rounded-2xl shadow-xl flex items-center justify-center // ✅ Rounded-2xl, shadow-xl
        ${!isTopCard ? 'pointer-events-none opacity-70 scale-95 translate-y-[-10px]' : ''}
        transition-all duration-300 ease-out
        overflow-hidden
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        border-4 border-white/50 // ✅ Subtle border
      `}
    >
      
      <img
        src={cat.url}
        alt="Cute Cat"
        className="w-full h-full object-cover rounded-xl" // ✅ object-cover, rounded-xl, removed bg-black
        draggable="false"
      />

      {isTopCard && (
        <>
          {/* Heart when swiping right */}
          <animated.div
            style={{ opacity: x.to([0, 120], [0, 1]) }}
            className="absolute top-6 left-6 text-green-500 pointer-events-none drop-shadow-md" // ✅ drop-shadow
          >
            <Heart size={60} strokeWidth={2.5} /> {/* ✅ Thicker stroke */}
          </animated.div>

          {/* X when swiping left */}
          <animated.div
            style={{ opacity: x.to([0, -120], [0, 1]) }}
            className="absolute top-6 right-6 text-red-500 pointer-events-none drop-shadow-md" // ✅ drop-shadow
          >
            <X size={60} strokeWidth={2.5} /> {/* ✅ Thicker stroke */}
          </animated.div>
        </>
      )}
    </animated.div>
  );
};

export default CatCard;