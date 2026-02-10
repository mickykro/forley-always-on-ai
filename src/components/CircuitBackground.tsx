import { ReactNode, useEffect, useRef } from "react";

interface CircuitBackgroundProps {
  children: ReactNode;
  className?: string;
  showNodes?: boolean;
}

const CircuitBackground = ({ 
  children, 
  className = "",
  showNodes = true 
}: CircuitBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Circuit nodes
    const nodes: { 
      x: number; 
      y: number; 
      connections: { index: number; curvy: boolean; curveStrength: number }[]; 
      pulsePhase: number; 
      shadowPhase: number;
      hasShadow: boolean;
      opacityPhase: number;
      burstCycle: number;
      burstDuration: number;
      intervalOffset: number;
    }[] = [];
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const densityFactor = isMobile ? 12000 : Math.random() * 5000 + 20000;
    const nodeCount = Math.floor((canvas.width * canvas.height) / densityFactor);
    console.log("node count ", nodeCount);
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        shadowPhase: Math.random() * Math.PI * 2,
        hasShadow: Math.random() < 0.8,
        opacityPhase: Math.random() * Math.PI * 2,
        burstCycle: 2 + Math.random() * 2,
        burstDuration: 0.2 + Math.random() * 0.4,
        intervalOffset: Math.random(),
      });
    }

    const CONNECTION_RADIUS = 250;
    const MAX_CONNECTIONS = 4;
    const regenerateConnections = () => {
      nodes.forEach((node) => {
        node.connections = [];
      });

      nodes.forEach((node, i) => {
        const candidates = nodes
          .map((other, idx) => ({
            idx,
            dist: Math.hypot(node.x - other.x, node.y - other.y),
          }))
          .filter((candidate) => candidate.idx !== i && candidate.dist <= CONNECTION_RADIUS)
          .sort(() => Math.random() - 0.5);

        const targetCount = Math.min(MAX_CONNECTIONS, candidates.length);
        for (let c = 0; c < targetCount; c++) {
          node.connections.push({
            index: candidates[c].idx,
            curvy: Math.random() < 0.4,
            curveStrength: Math.random() * 0.5 - 0.25,
          });
        }
      });
    };

    regenerateConnections();
    const connectionInterval = setInterval(regenerateConnections, Math.random() * 10000);

    let animationFrame: number;
    let time = 0;
    const timeStep = isMobile ? 0.03 : 0.06;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const timeStep = isMobile ? 0.03 : 0.06;
      time += timeStep;

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connection) => {
          const other = nodes[connection.index];
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          
          const burstTime = (time + node.intervalOffset) % node.burstCycle;
          const burstProgress =
            burstTime < node.burstDuration ? Math.sin((burstTime / node.burstDuration) * Math.PI) : 0;
          const alpha = Math.min(1, 0.12 + 0.1 * Math.sin(time + node.pulsePhase) + burstProgress * 0.25);
          gradient.addColorStop(0, `rgba(0, 229, 255, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(0, 255, 255, ${alpha * 1.5})`);
          gradient.addColorStop(1, `rgba(0, 229, 255, ${alpha})`);

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          if (connection.curvy) {
            const midX = (node.x + other.x) / 2;
            const midY = (node.y + other.y) / 2;
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const perpX = -dy;
            const perpY = dx;
            const perpLen = Math.hypot(perpX, perpY) || 1;
            const offset = perpLen * connection.curveStrength;
            const cpX = midX + (perpX / perpLen) * offset;
            const cpY = midY + (perpY / perpLen) * offset;

            ctx.moveTo(node.x, node.y);
            ctx.quadraticCurveTo(cpX, cpY, other.x, other.y);
          } else {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
          }
          ctx.stroke();
        });
      });

      // Draw nodes
      if (showNodes) {
        nodes.forEach((node) => {
          const pulse = Math.sin(time * 2 + node.pulsePhase);
          const normalizedPulse = (pulse + 1) / 2;
          const opacityOffset = 0.08 * Math.sin(time + node.opacityPhase);
          const burstTime = (time + node.intervalOffset) % node.burstCycle;
          const burstProgress =
            burstTime < node.burstDuration ? Math.sin((burstTime / node.burstDuration) * Math.PI) : 0;
          const radius = 2 + normalizedPulse * 1.2 + burstProgress * 1.5;
          const alpha = Math.max(
            0.2,
            Math.min(1, 0.3 + normalizedPulse * 0.4 + opacityOffset + burstProgress * 0.35)
          );
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3.5);
          gradient.addColorStop(0, `rgba(0, 229, 255, ${alpha * 0.5 + burstProgress * 0.2})`);
          gradient.addColorStop(1, "transparent");

          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (node.hasShadow) {
            const shadowPulse = Math.sin(time * 3 + node.shadowPhase);
            const shadowStrength = Math.max(0, shadowPulse);
            if (shadowStrength > 0.01) {
              ctx.save();
              ctx.shadowBlur = 12 * shadowStrength;
              ctx.shadowColor = `rgba(0, 255, 255, ${0.2 * shadowStrength})`;
              ctx.fillStyle = `rgba(0, 0, 0, 0.01)`;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius * 6, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
      clearInterval(connectionInterval);
    };
  }, [showNodes]);

  return (
    <div className={`relative ${className}`}>
      {/* Canvas for animated circuit */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      
      {/* Static circuit pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none circuit-pattern opacity-30"
        style={{ backgroundSize: "180px 180px" }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0, 229, 255, 0.08) 0%, transparent 60%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CircuitBackground;
