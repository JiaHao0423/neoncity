import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, MessageCircle, Award, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const communityFeatures = [
  {
    icon: Users,
    title: "組隊探索",
    description: "與好友一起完成任務，獲得額外團隊獎勵",
  },
  {
    icon: MessageCircle,
    title: "即時聊天",
    description: "在探索過程中與隊友保持聯繫",
  },
  {
    icon: Award,
    title: "排行榜競爭",
    description: "在全球與本地排行榜上展示你的成就",
  },
  {
    icon: Share2,
    title: "分享發現",
    description: "將你的 AR 發現分享到社群",
  },
];

const leaderboard = [
  { rank: 1, name: "CyberWalker_TW", points: "125,800", avatar: "🦾" },
  { rank: 2, name: "NeonExplorer", points: "98,450", avatar: "🌃" },
  { rank: 3, name: "ARHunter2077", points: "87,200", avatar: "👾" },
  { rank: 4, name: "StreetRunner", points: "76,890", avatar: "🏃" },
  { rank: 5, name: "CityGhost", points: "65,340", avatar: "👻" },
];

export function SocialSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate community features
      gsap.fromTo(
        ".community-feature",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".community-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate leaderboard
      gsap.fromTo(
        ".leaderboard-item",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leaderboard",
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
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-display tracking-[0.3em] uppercase mb-4 block">
            Community
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            社群
            <span className="text-neon-magenta text-glow-magenta"> 連結</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            加入全球探險家社群，一起發現城市的無限可能
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Community features */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-neon-cyan">
              社群功能
            </h3>
            <div className="community-grid grid sm:grid-cols-2 gap-4">
              {communityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="community-feature group p-5 bg-card/30 border border-border/30 transition-all duration-300 hover:border-neon-cyan/50 hover:bg-card/50"
                >
                  <feature.icon className="w-8 h-8 text-neon-cyan mb-3 group-hover:text-neon-magenta transition-colors" />
                  <h4 className="font-display font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-neon-magenta">
              本週排行榜
            </h3>
            <div className="leaderboard bg-card/30 border border-border/30 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/20 text-xs font-display uppercase tracking-wider text-muted-foreground border-b border-border/30">
                <div className="col-span-2">排名</div>
                <div className="col-span-6">探險家</div>
                <div className="col-span-4 text-right">積分</div>
              </div>

              {/* Items */}
              {leaderboard.map((player, index) => (
                <div
                  key={index}
                  className={`leaderboard-item grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border/20 transition-colors hover:bg-muted/10 ${
                    index === 0 ? "bg-neon-yellow/5" : ""
                  }`}
                >
                  <div className="col-span-2">
                    <span
                      className={`font-display font-bold text-lg ${
                        index === 0
                          ? "text-neon-yellow text-glow-yellow"
                          : index === 1
                          ? "text-gray-300"
                          : index === 2
                          ? "text-orange-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      #{player.rank}
                    </span>
                  </div>
                  <div className="col-span-6 flex items-center gap-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <span className="font-medium truncate">{player.name}</span>
                  </div>
                  <div className="col-span-4 text-right">
                    <span className="font-display font-bold text-neon-cyan">
                      {player.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View all button */}
            <button className="w-full mt-4 py-3 border border-border/50 text-muted-foreground font-display text-sm uppercase tracking-wider hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors">
              查看完整排行榜
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
