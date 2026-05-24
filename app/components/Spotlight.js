'use client';
import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    function move(e) {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(29,78,216,0.13), transparent 80%)`;
      }
    }
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        transition: 'background 0.1s',
      }}
    />
  );
}
