"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        className="hidden lg:block fixed pointer-events-none z-[9998]"
        style={{
          left: position.x - 16,
          top: position.y - 16,
        }}
      >
        <div className="w-6 h-6 border border-cyan-400 rounded-full" />
      </div>

      {/* Inner Dot */}
      <div
        className="hidden lg:block fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - 3,
          top: position.y - 3,
        }}
      >
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
      </div>
    </>
  );
}