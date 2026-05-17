import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle fade in
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-16 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-bold mb-4">
              <span className="text-foreground">NEON</span>{" "}
              <span className="text-neon-cyan">CITY</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              用 AR 重新看見你的城市。探索、發現、連結。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">
              產品
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">功能介紹</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">下載 App</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">更新日誌</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">路線圖</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">
              支援
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">幫助中心</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">聯絡我們</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">常見問題</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">社群</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">
              法律
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">隱私政策</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">服務條款</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Cookie 政策</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2026 NEON CITY. All rights reserved.
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {["Twitter", "Discord", "Instagram", "YouTube"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 text-xs text-muted-foreground">
            <div className="w-8 h-px bg-neon-cyan/30" />
            <span className="font-mono">BUILT FOR THE FUTURE</span>
            <div className="w-8 h-px bg-neon-cyan/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
