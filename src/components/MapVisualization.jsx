import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MapVisualization() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the map container
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate map points
      gsap.fromTo(
        ".map-point",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pulse animation for points
      gsap.to(".map-point-pulse", {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mapPoints = [
    { x: "20%", y: "30%", label: "信義區", type: "main" },
    { x: "45%", y: "25%", label: "中山區", type: "main" },
    { x: "70%", y: "40%", label: "大安區", type: "main" },
    { x: "30%", y: "60%", label: "西門町", type: "hot" },
    { x: "55%", y: "55%", label: "東區", type: "hot" },
    { x: "80%", y: "65%", label: "松山區", type: "sub" },
    { x: "15%", y: "50%", label: "萬華區", type: "sub" },
    { x: "60%", y: "75%", label: "內湖區", type: "sub" },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-neon-magenta text-sm font-display tracking-[0.3em] uppercase mb-4 block">
            Live Map
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-neon-cyan text-glow-cyan">即時</span> 城市熱點
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            探索城市中最熱門的 AR 景點，發現隱藏的寶藏任務
          </p>
        </div>

        {/* Map visualization */}
        <div
          ref={mapRef}
          className="relative aspect-[16/9] max-w-4xl mx-auto border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(var(--neon-cyan) 1px, transparent 1px),
                linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              opacity: 0.1,
            }}
          />

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--neon-cyan)" />
                <stop offset="100%" stopColor="var(--neon-magenta)" />
              </linearGradient>
            </defs>
            <line x1="20%" y1="30%" x2="45%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="45%" y1="25%" x2="70%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="30%" y1="60%" x2="55%" y2="55%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="55%" y1="55%" x2="70%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="20%" y1="30%" x2="30%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" />
          </svg>

          {/* Map points */}
          {mapPoints.map((point, index) => (
            <div
              key={index}
              className="map-point absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: point.x, top: point.y }}
            >
              {/* Pulse ring */}
              <div
                className={`map-point-pulse absolute inset-0 rounded-full ${
                  point.type === "hot" ? "bg-neon-magenta" : "bg-neon-cyan"
                }`}
                style={{ width: "100%", height: "100%" }}
              />

              {/* Point */}
              <div
                className={`relative w-4 h-4 rounded-full ${
                  point.type === "hot"
                    ? "bg-neon-magenta box-glow-magenta"
                    : point.type === "main"
                    ? "bg-neon-cyan box-glow-cyan"
                    : "bg-neon-yellow"
                } flex items-center justify-center`}
              >
                <div className="w-2 h-2 bg-background rounded-full" />
              </div>

              {/* Label */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="px-3 py-1 bg-card/90 border border-border text-sm font-display">
                  {point.label}
                </div>
              </div>
            </div>
          ))}

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-cyan" />

          {/* Legend */}
          <div className="absolute bottom-8 left-8 flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-cyan" />
              <span className="text-muted-foreground">主要景點</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-magenta" />
              <span className="text-muted-foreground">熱門地區</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-yellow" />
              <span className="text-muted-foreground">探索區域</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
