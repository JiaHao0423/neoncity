import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Trophy, Zap, Gift } from "lucide-react";
import { neonColor } from "@/lib/neon-colors";

gsap.registerPlugin(ScrollTrigger);

const taskCards = [
  {
    id: "TASK-001",
    title: "街角探險家",
    description: "探索 10 個隱藏的街角 AR 標記",
    reward: "500 XP",
    difficulty: "簡單",
    icon: Star,
    progress: 70,
    color: "neon-cyan",
  },
  {
    id: "TASK-002",
    title: "霓虹收集者",
    description: "收集 5 個稀有霓虹徽章",
    reward: "1000 XP",
    difficulty: "中等",
    icon: Trophy,
    progress: 40,
    color: "neon-magenta",
  },
  {
    id: "TASK-003",
    title: "速度挑戰",
    description: "在 10 分鐘內完成 AR 路線",
    reward: "限定頭像",
    difficulty: "困難",
    icon: Zap,
    progress: 0,
    color: "neon-yellow",
  },
  {
    id: "TASK-004",
    title: "神秘寶箱",
    description: "找到隱藏在城市中的 AR 寶箱",
    reward: "神秘獎勵",
    difficulty: "限時",
    icon: Gift,
    progress: 25,
    color: "neon-cyan",
  },
];

export function TaskCards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards
      gsap.fromTo(
        ".task-card",
        { opacity: 0, x: -50, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".task-cards-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate progress bars
      gsap.fromTo(
        ".progress-fill",
        { width: 0 },
        {
          width: "var(--progress)",
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".task-cards-container",
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-neon-magenta/5 blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-neon-yellow text-sm font-display tracking-[0.3em] uppercase mb-4 block">
            Quest System
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            任務
            <span className="text-neon-cyan text-glow-cyan"> 挑戰</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            完成任務獲得獨特獎勵，提升你的探險家等級
          </p>
        </div>

        {/* Task cards */}
        <div className="task-cards-container grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {taskCards.map((task, index) => {
            const colors = neonColor[task.color]
            return (
            <div
              key={index}
              className="task-card group relative p-6 bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/50 cursor-pointer overflow-hidden"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 scanline opacity-50 pointer-events-none" />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border ${colors.border} ${colors.bg}`}
                  >
                    <task.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono mb-1">
                      {task.id}
                    </div>
                    <h3 className="font-display text-xl font-bold group-hover:text-neon-cyan transition-colors">
                      {task.title}
                    </h3>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-display uppercase tracking-wider ${
                    task.difficulty === "簡單"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : task.difficulty === "中等"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : task.difficulty === "困難"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30"
                  }`}
                >
                  {task.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {task.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">進度</span>
                  <span className={colors.text}>{task.progress}%</span>
                </div>
                <div className="h-1 bg-muted/30 overflow-hidden">
                  <div
                    className={`progress-fill h-full ${colors.progress}`}
                    style={{ "--progress": `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  獎勵
                </span>
                <span className="text-neon-yellow font-display font-bold">
                  {task.reward}
                </span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-neon-cyan/5 to-transparent" />
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
