import { useEffect, useRef } from "react";
import gsap from "gsap";
import { heroCopy, heroStats } from "@/content/hero";

export function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid animation
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 0.15, duration: 2, ease: "power2.out" }
      );

      // Title animation with glitch effect
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, skewX: 10 },
        { opacity: 1, y: 0, skewX: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.9 }
      );

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Floating neon elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-neon-cyan/10 blur-3xl float-element" />
      <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-neon-magenta/10 blur-3xl float-element" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-neon-yellow/10 blur-2xl float-element" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
          <span className="text-neon-cyan text-sm font-display tracking-[0.3em] uppercase">
            Augmented Reality
          </span>
          <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">NEON</span>{" "}
          <span className="text-neon-cyan text-glow-cyan">CITY</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light"
        >
          {heroCopy.subtitle}
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-neon-magenta text-glow-magenta mb-12 font-medium">
          {heroCopy.tagline}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-neon-cyan text-background font-display font-bold text-lg tracking-wider uppercase overflow-hidden transition-all duration-300 hover:scale-105 box-glow-cyan">
            <span className="relative z-10">{heroCopy.downloadCta}</span>
            <div className="absolute inset-0 bg-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {heroCopy.downloadCta}
            </span>
          </button>
          <button className="px-8 py-4 border border-neon-cyan text-neon-cyan font-display font-bold text-lg tracking-wider uppercase transition-all duration-300 hover:bg-neon-cyan/10 hover:box-glow-cyan">
            {heroCopy.exploreCta}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {heroStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-neon-cyan text-glow-cyan">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent animate-pulse" />
      </div>
    </section>
  );
}
