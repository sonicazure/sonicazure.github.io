import { useEffect, useRef } from 'react';

/**
 * 纯 Canvas 2D 非交互性粒子网络动画
 * 粒子自动漂浮、连线、闪烁，无需鼠标交互
 * 背景有缓慢流动的噪波纹理
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = 0;
    let h = 0;

    // Seeded random for deterministic feel
    let seed = 42;
    function random() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      baseAlpha: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: random() * w,
          y: random() * h,
          vx: (random() - 0.5) * 0.4,
          vy: (random() - 0.5) * 0.3,
          r: 1 + random() * 2,
          baseAlpha: 0.15 + random() * 0.5,
          alpha: 0.15 + random() * 0.5,
          pulseSpeed: 0.3 + random() * 1.2,
          pulsePhase: random() * Math.PI * 2,
        });
      }
    }

    // Flow field noise
    function noise2D(x: number, y: number, t: number): number {
      return (
        Math.sin(x * 0.003 + t * 0.2) * Math.cos(y * 0.004 + t * 0.15) * 0.5 +
        Math.sin(x * 0.007 - t * 0.1) * Math.sin(y * 0.005 + t * 0.25) * 0.3 +
        Math.cos((x + y) * 0.002 + t * 0.1) * 0.2
      );
    }

    resize();
    initParticles();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    let startTime = performance.now();

    function draw() {
      animationId = requestAnimationFrame(draw);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Clear with fade trail
      ctx!.fillStyle = '#0d1117';
      ctx!.fillRect(0, 0, w, h);

      // Draw flowing background texture (very subtle)
      const gridSize = 60;
      ctx!.save();
      ctx!.globalAlpha = 0.03;
      for (let gx = 0; gx < w + gridSize; gx += gridSize) {
        for (let gy = 0; gy < h + gridSize; gy += gridSize) {
          const n = noise2D(gx, gy, elapsed);
          const intensity = (n + 1) * 0.5;
          if (intensity > 0.6) {
            const size = 1 + intensity * 2;
            ctx!.fillStyle = `rgba(200, 164, 94, ${intensity * 0.4})`;
            ctx!.beginPath();
            ctx!.arc(gx, gy, size, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }
      ctx!.restore();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Flow field influence
        const flowAngle = noise2D(p.x, p.y, elapsed * 0.5) * Math.PI * 2;
        p.vx += Math.cos(flowAngle) * 0.008;
        p.vy += Math.sin(flowAngle) * 0.008;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(elapsed * p.pulseSpeed + p.pulsePhase) * 0.08;
        p.alpha = Math.max(0.05, Math.min(0.8, p.alpha));

        // Draw particle glow
        const glowR = p.r * 4;
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        gradient.addColorStop(0, `rgba(200, 164, 94, ${p.alpha})`);
        gradient.addColorStop(0.3, `rgba(200, 164, 94, ${p.alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(200, 164, 94, 0)');
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw connections
      const CONNECT_DIST = 120;
      ctx!.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15 * Math.min(a.alpha, b.alpha);
            ctx!.strokeStyle = `rgba(200, 164, 94, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      ctx!.restore();

      // Draw occasional bright pulses along connections
      const pulseT = (elapsed * 0.3) % 1;
      ctx!.save();
      ctx!.globalAlpha = 0.4 * (1 - pulseT);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST * 1.5 && ((i + j * 7) % 13 === 0)) {
            const px = a.x + (b.x - a.x) * pulseT;
            const py = a.y + (b.y - a.y) * pulseT;
            ctx!.fillStyle = '#c8a45e';
            ctx!.beginPath();
            ctx!.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }
      ctx!.restore();
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
