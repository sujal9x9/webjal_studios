import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "circle" | "diamond" | "square";
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(108, 99, 255,",
      "rgba(168, 85, 247,",
      "rgba(34, 211, 238,",
      "rgba(236, 72, 153,",
      "rgba(0, 255, 170,",
    ];

    const shapes: Particle["shape"][] = ["circle", "diamond", "square"];

    const particles: Particle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    const geometries: {
      x: number;
      y: number;
      size: number;
      rotX: number;
      rotY: number;
      dRotX: number;
      dRotY: number;
      color: string;
      opacity: number;
      floatOffset: number;
      floatSpeed: number;
      origY: number;
    }[] = Array.from({ length: 25 }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      const y = Math.random() * window.innerHeight;
      return {
        x: Math.random() * window.innerWidth,
        y,
        origY: y,
        size: Math.random() * 30 + 10,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        dRotX: (Math.random() - 0.5) * 0.008,
        dRotY: (Math.random() - 0.5) * 0.012,
        color: c,
        opacity: Math.random() * 0.12 + 0.03,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.4 + 0.2,
      };
    });

    const drawWireframeHex = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotX: number,
      rotY: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `${color} ${opacity})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotX;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size * Math.abs(Math.cos(rotY));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotX;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size * Math.abs(Math.cos(rotY));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.restore();
    };

    let elapsed = 0;
    const animate = () => {
      elapsed += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX + (mx - canvas.width / 2) * 0.00005;
        p.y += p.speedY + (my - canvas.height / 2) * 0.00005;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = `${p.color} 1)`;
        ctx.translate(p.x, p.y);

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "diamond") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.06;
            ctx.strokeStyle = "rgba(108, 99, 255, 1)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw floating wireframe geometries
      geometries.forEach((g) => {
        g.rotX += g.dRotX;
        g.rotY += g.dRotY;
        g.y = g.origY + Math.sin(elapsed * g.floatSpeed + g.floatOffset) * 15;
        drawWireframeHex(ctx, g.x, g.y, g.size, g.rotX, g.rotY, g.color, g.opacity);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
