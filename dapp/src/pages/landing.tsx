import React, { useEffect, useState, useRef } from "react";
import Hero from "@/components/hero";
import Nav from "@/components/Nav";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

// Icons
const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const Play = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9z"
    />
  </svg>
);

const Trophy = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9z"
    />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const Gift = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    />
  </svg>
);

const Crown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l4 6 5-7 5 7 4-6v18H5V3z"
    />
  </svg>
);

const Coins = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Sports Card Component
interface Player {
  name: string;
  position: string;
  team: string;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface SportsCardProps {
  player: Player;
  className?: string;
}

const SportsCard: React.FC<SportsCardProps> = ({ player, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-72 h-80 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Card Container with Trophy Image - both transform together */}
      <div
        className={`
          relative w-full h-full transform-gpu transition-all duration-300 ease-out
        `}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${Math.max(
                -15,
                Math.min(15, (mousePosition.y - 160) * 0.03)
              )}deg) rotateY(${Math.max(
                -15,
                Math.min(15, (mousePosition.x - 144) * 0.03)
              )}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {/* Trophy Image - Now inside transform container */}
        <div className="absolute -top-12 -right-12 w-40 h-40 z-50 opacity-100">
          <img
            src="/trophy_no_bg.png"
            alt=""
            className="w-full h-full object-contain transform rotate-12"
          />
        </div>
        {/* Main Card */}
        <div
          className={`
            relative w-full h-full rounded-lg overflow-hidden
            border border-gray-600/50
            shadow-lg ${isHovered ? "shadow-xl border-gray-500/70" : ""}
            transition-all duration-300 bg-black/30 backdrop-blur-sm
          `}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url(/bg-2.jpg)`,
            }}
          />

          {/* Holographic background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-400/5 opacity-30"></div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Subtle shine effect */}
          <div
            className={`
              absolute inset-0 opacity-0 transition-opacity duration-300
              ${isHovered ? "opacity-10" : ""}
            `}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)`,
            }}
          />

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-light tracking-wide text-white mb-2">
                {player.name}
              </h2>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-light">
                {player.position} • {player.team}
              </p>
            </div>

            {/* Spacer to push stats to bottom */}
            <div className="flex-1" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              {Object.entries(player.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-light text-white">{value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-light">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sport Clubs Card Component
interface SportClubCardProps {
  className?: string;
}

interface SportClubCardProps {
  className?: string;
}

interface SportClubCardProps {
  className?: string;
}

const ProblemCard: React.FC<SportClubCardProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex items-center gap-12 max-w-7xl mx-auto ${className}`}>
      {/* Card Container - with overflow visible */}
      <div
        className="relative w-1/2 h-[600px] cursor-pointer flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflow: "visible" }} // Allow overflow
      >
        <div
          className={`
              relative w-full h-full transform-gpu transition-all duration-500 ease-out
              ${isHovered ? "scale-105" : "scale-100"}
            `}
          style={{ overflow: "visible" }} // Allow overflow on transform container too
        >
          {/* Background Image - extending above the card */}
          <div
            className="absolute -top-20 left-0 right-0 bg-cover bg-center bg-no-repeat z-10"
            style={{
              backgroundImage: `url(/fan_tv.png)`,
              height: "calc(100% + 48px)", // Extend 48px above (3rem = 12 * 4px)
            }}
          />

          {/* Main Card */}
          <div
            className={`
                relative w-full h-full rounded-2xl overflow-hidden
                border border-gray-600/50
                shadow-2xl ${isHovered ? "shadow-3xl border-gray-500/70" : ""}
                transition-all duration-500 bg-black/40 backdrop-blur-sm
              `}
          >
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>

      {/* Text Content - Next to the card */}
      <div className="flex-1 max-w-2xl">
        <div className="mb-4 text-red-400 tracking-widest text-sm font-light italic">
          ⚠ THE ENGAGEMENT CRISIS ⚠
        </div>

        <h2 className="text-4xl md:text-6xl font-extralight tracking-wider leading-tight mb-6 text-white">
          <span className="opacity-90 font-thin">FANS ARE</span>
          <br />
          <span className="opacity-90 font-thin">DISCONNECTING</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 font-light tracking-wide leading-relaxed">
          Sport teams and athletes are facing challenge: the majority of their
          fanbase has become passive spectators.
        </p>

        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm font-light">
              Most fans only watch games passively
            </span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm font-light">
              Limited interaction beyond game attendance
            </span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm font-light">
              Clubs struggle to find new revenue streams and connect with their
              audience directly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SportClubCard: React.FC<SportClubCardProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex items-center gap-12 max-w-7xl mx-auto ${className}`}>
      {/* Card Container - with overflow visible */}
      <div
        className="relative w-80 h-[600px] cursor-pointer flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflow: "visible" }} // Allow overflow
      >
        <div
          className={`
            relative w-full h-full transform-gpu transition-all duration-500 ease-out
            ${isHovered ? "scale-105" : "scale-100"}
          `}
          style={{ overflow: "visible" }} // Allow overflow on transform container too
        >
          {/* Background Image - extending above the card */}
          <div
            className="absolute -top-20 left-0 right-0 bg-cover bg-center bg-no-repeat z-10"
            style={{
              backgroundImage: `url(/person1.png)`,
              height: "calc(100% + 96px)", // Extend 48px above (3rem = 12 * 4px)
            }}
          />

          {/* Main Card */}
          <div
            className={`
              relative w-full h-full rounded-2xl overflow-hidden
              border border-gray-600/50
              shadow-2xl ${isHovered ? "shadow-3xl border-gray-500/70" : ""}
              transition-all duration-500 bg-black/40 backdrop-blur-sm
            `}
          >
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>

      {/* Text Content - Next to the card */}
      <div className="flex-1 max-w-2xl">
        <div className="mb-4 text-gray-400 tracking-widest text-sm font-light italic">
          ✧ DISCOVER ENGAGED ✧
        </div>

        <h2 className="text-4xl md:text-6xl font-extralight tracking-wider leading-tight mb-6 text-white">
          <span className="opacity-90 font-thin">DIRECT CONNECTION</span>
          <br />
          <span className="opacity-90 font-thin">
            FBETWEEN FANS AND SPORT CLUBS
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 font-light tracking-wide leading-relaxed">
          Revolutionizing fan engagement by creating exclusive challenges,
          competitions, and interactive experiences.
        </p>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [clubsRef, clubsVisible] = useScrollAnimation();
  const [communitiesRef, communitiesVisible] = useScrollAnimation();
  const [challengesRef, challengesVisible] = useScrollAnimation();
  const [rewardsRef, rewardsVisible] = useScrollAnimation();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Fan Token Communities Data
  const fanTokenCommunities = [
    {
      name: "Lakers Nation",
      position: "FAN",
      team: "Community",
      stats: {
        Members: "250K",
        Rewards: "12M",
        Growth: "+15%",
        Active: "89%",
      },
      imageUrl: "",
      rarity: "legendary" as const,
    },
    {
      name: "Warriors Unite",
      position: "FAN",
      team: "Community",
      stats: {
        Members: "180K",
        Rewards: "8.5M",
        Growth: "+12%",
        Active: "92%",
      },
      imageUrl: "",
      rarity: "epic" as const,
    },
    {
      name: "Celtics Pride",
      position: "FAN",
      team: "Community",
      stats: {
        Members: "95K",
        Rewards: "4.2M",
        Growth: "+8%",
        Active: "85%",
      },
      imageUrl: "",
      rarity: "rare" as const,
    },
  ];

  // Challenge Data
  const challenges = [
    {
      name: "Playoff Predictor",
      position: "CHALLENGE",
      team: "Weekly",
      stats: {
        Prize: "50K",
        Players: "15K",
        Ends: "3 Days",
        Reward: "Epic",
      },
      imageUrl: "",
      rarity: "epic" as const,
    },
    {
      name: "Triple Double",
      position: "CHALLENGE",
      team: "Daily",
      stats: {
        Prize: "10K",
        Players: "8.5K",
        Ends: "18h",
        Reward: "Rare",
      },
      imageUrl: "",
      rarity: "rare" as const,
    },
    {
      name: "Rookie Rising",
      position: "CHALLENGE",
      team: "Monthly",
      stats: {
        Prize: "100K",
        Players: "25K",
        Ends: "12 Days",
        Reward: "Legend",
      },
      imageUrl: "",
      rarity: "legendary" as const,
    },
  ];

  return (
    <div className="w-screen min-h-screen text-white overflow-hidden bg-black relative">
      <Nav />

      <div className="relative z-10">
        <Hero />
      </div>

      <section ref={clubsRef} className="relative px-6 py-24 z-10 bg-black">
        <div
          className={`transition-all duration-1000 ease-out ${
            clubsVisible
              ? "opacity-100 filter blur-0 transform translate-y-0"
              : "opacity-0 filter blur-md transform translate-y-12"
          }`}
        >
          <ProblemCard />
        </div>
      </section>

      {/* Sport Clubs Section - Right below Hero */}
      <section ref={clubsRef} className="relative px-6 py-24 z-10 bg-black">
        <div
          className={`transition-all duration-1000 ease-out ${
            clubsVisible
              ? "opacity-100 filter blur-0 transform translate-y-0"
              : "opacity-0 filter blur-md transform translate-y-12"
          }`}
        >
          <SportClubCard />
        </div>
      </section>

      {/* All sections below with Memphis background */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(/memphis-mini-dark.webp)`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Features Section with ID for navigation */}
        <section
          id="features"
          ref={communitiesRef}
          className="relative px-6 py-24 z-10"
        >
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
                ✧ FAN COMMUNITIES ✧
              </div>
              <h2
                className={`text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6 transition-all duration-1000 ease-out ${
                  communitiesVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                <span className="opacity-50 font-thin">TOKEN COMMUNITIES</span>
              </h2>
              <p
                className={`text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide transition-all duration-1000 ease-out delay-300 ${
                  communitiesVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                Join passionate communities and unlock exclusive rewards,
                content, and experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              {fanTokenCommunities.map((community, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    communitiesVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  <SportsCard player={community} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agents/Challenges Section with ID for navigation */}
        <section
          id="agents"
          ref={challengesRef}
          className="relative px-6 py-24 z-10"
        >
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
                ✧ ACTIVE CHALLENGES ✧
              </div>
              <h2
                className={`text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6 transition-all duration-1000 ease-out ${
                  challengesVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                <span className="opacity-50 font-thin">COMPETE & WIN</span>
              </h2>
              <p
                className={`text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide transition-all duration-1000 ease-out delay-300 ${
                  challengesVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                Compete in exciting challenges and win amazing prizes while
                showcasing your fan knowledge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    challengesVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  <SportsCard player={challenge} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rewards Section styled like hero */}
        <section ref={rewardsRef} className="relative px-6 py-24 z-10">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
                ✧ REWARDS & BENEFITS ✧
              </div>
              <h2
                className={`text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6 transition-all duration-1000 ease-out ${
                  rewardsVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                <span className="opacity-50 font-thin">UNLOCK REWARDS</span>
              </h2>
              <p
                className={`text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide transition-all duration-1000 ease-out delay-300 ${
                  rewardsVisible
                    ? "opacity-100 filter blur-0 transform translate-y-0"
                    : "opacity-0 filter blur-md transform translate-y-8"
                }`}
              >
                Unlock incredible rewards through participation, achievements,
                and community engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Coins className="w-12 h-12" />,
                  title: "Fan Tokens",
                  description:
                    "Earn tokens through participation and trade them for exclusive perks.",
                },
                {
                  icon: <Gift className="w-12 h-12" />,
                  title: "Exclusive Merchandise",
                  description:
                    "Redeem limited edition team gear and collectibles.",
                },
                {
                  icon: <Star className="w-12 h-12" />,
                  title: "VIP Experiences",
                  description:
                    "Access to meet & greets, behind-the-scenes content, and events.",
                },
                {
                  icon: <Crown className="w-12 h-12" />,
                  title: "Premium Status",
                  description:
                    "Unlock premium features and get priority access to new content.",
                },
              ].map((reward, index) => (
                <div
                  key={index}
                  className={`group p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-700 hover:transform hover:scale-105 text-center ${
                    rewardsVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 500}ms` }}
                >
                  <div className="text-gray-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {reward.icon}
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-4 text-white opacity-80">
                    {reward.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-light">
                    {reward.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with ID for navigation */}
        <section id="contact" className="relative px-6 py-24 z-10">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
              ✧ JOIN THE REVOLUTION ✧
            </div>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6">
              <span className="opacity-50 font-thin">READY TO</span>
              <br />
              <span className="opacity-50 font-thin">GET STARTED</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 font-light tracking-wide">
              Connect with your community, compete in challenges, and earn
              rewards that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white/10 backdrop-blur-sm border border-gray-600 px-8 py-4 rounded-lg font-light tracking-wide hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
