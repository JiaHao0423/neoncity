import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { neonColor } from "@/lib/neon-colors";
import { features, featuresSectionCopy } from "@/content/features";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".feature-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".feature-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate feature cards
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-display tracking-[0.3em] uppercase mb-4 block">
            Core Features
          </span>
          <h2 className="feature-title font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {featuresSectionCopy.titleLead}
            <span className="text-neon-magenta text-glow-magenta">{featuresSectionCopy.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {featuresSectionCopy.subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const colors = neonColor[feature.color]
            return (
            <div
              key={index}
              className={`feature-card group relative p-8 bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-500 ${colors.hoverBorder} hover:bg-card/80`}
              style={{ perspective: "1000px" }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-cyan/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neon-cyan/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neon-cyan/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-cyan/50" />

              {/* Icon */}
              <div
                className={`w-14 h-14 mb-6 flex items-center justify-center border ${colors.border} ${colors.bg} ${colors.bgHover} transition-colors duration-300`}
              >
                <feature.icon className={`w-7 h-7 ${colors.text}`} />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                style={{
                  background: `radial-gradient(circle at center, var(--${feature.color}) 0%, transparent 70%)`,
                  opacity: 0.05,
                }}
              />
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
