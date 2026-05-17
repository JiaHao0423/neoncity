import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AppShowcase() {
  const sectionRef = useRef(null);
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    {
      title: "AR 視覺",
      description: "沉浸式霓虹街景體驗",
    },
    {
      title: "地圖導航",
      description: "3D 智能路線規劃",
    },
    {
      title: "任務中心",
      description: "解鎖城市隱藏挑戰",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate phone mockup
      gsap.fromTo(
        ".phone-mockup",
        { opacity: 0, y: 100, rotateY: -20 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".phone-mockup",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    // Auto-rotate screens
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [screens.length]);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-3xl" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-neon-magenta text-sm font-display tracking-[0.3em] uppercase mb-4 block">
            App Preview
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-neon-cyan text-glow-cyan">未來</span> 已在手中
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            立即下載，開始你的賽博龐克城市探險
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Phone mockup */}
          <div className="phone-mockup relative" style={{ perspective: "1000px" }}>
            {/* Phone frame */}
            <div className="relative w-[280px] h-[560px] bg-card border-4 border-foreground/20 rounded-[40px] overflow-hidden shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/20 rounded-b-2xl z-10" />

              {/* Screen content */}
              <div className="absolute inset-2 rounded-[32px] overflow-hidden bg-background">
                {/* Grid background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(var(--neon-cyan) 1px, transparent 1px),
                      linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                    opacity: 0.1,
                  }}
                />

                {/* AR overlay simulation */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-xs font-mono text-neon-cyan">
                    <span>AR MODE</span>
                    <span>98%</span>
                  </div>

                  {/* Main content area */}
                  <div className="flex-1 relative p-4">
                    {/* Simulated AR elements */}
                    <div className="absolute top-8 left-4 px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan text-xs font-mono">
                      距離: 250m
                    </div>

                    <div className="absolute top-20 right-4 w-16 h-16 border-2 border-neon-magenta rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-neon-magenta rounded-full animate-pulse" />
                    </div>

                    {/* Center reticle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 border border-neon-cyan/50 rotate-45" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-cyan rounded-full" />
                    </div>

                    {/* Bottom info card */}
                    <div className="absolute bottom-4 left-0 right-0 mx-4 p-4 bg-card/80 backdrop-blur-sm border border-border/50">
                      <div className="text-neon-yellow text-xs font-display mb-1">
                        發現景點
                      </div>
                      <div className="font-display font-bold text-lg mb-1">
                        {screens[activeScreen].title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {screens[activeScreen].description}
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around items-center py-4 border-t border-border/30">
                    {["地圖", "AR", "任務"].map((item, i) => (
                      <button
                        key={i}
                        className={`px-4 py-1 text-xs font-display ${
                          i === 1
                            ? "text-neon-cyan border-b-2 border-neon-cyan"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-neon-cyan/20 blur-2xl -z-10 rounded-full" />
            </div>
          </div>

          {/* Download CTA */}
          <div className="text-center lg:text-left max-w-md">
            <h3 className="font-display text-3xl font-bold mb-6">
              準備好了嗎？
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              下載 NEON CITY，加入數十萬城市探險家的行列。
              用 AR 技術重新發現你的城市，每一步都是新的冒險。
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center gap-3 px-6 py-4 bg-foreground text-background font-display font-bold transition-all duration-300 hover:scale-105">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>

              <button className="group flex items-center gap-3 px-6 py-4 border border-foreground text-foreground font-display font-bold transition-all duration-300 hover:bg-foreground hover:text-background">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>
            </div>

            {/* Platform badges */}
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                iOS 15+
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Android 10+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
