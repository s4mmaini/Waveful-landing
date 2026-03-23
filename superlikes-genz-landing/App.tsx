import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window { mixpanel: any; }
}

const trackEvent = (ctaName: string) => {
  if (window.mixpanel) {
    window.mixpanel.track('cta_click', { cta_name: ctaName });
  }
};

// Base path for assets (handles GitHub Pages subdirectory deployment)
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

// --- Global Constants & Types ---

const COLORS = {
  red: '#FF0011',
  blue: '#0000FF',
  black: '#000000',
  white: '#FFFFFF',
};

const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } 
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        ease: "easeInOut" as const,
        repeat: Infinity
      }
    }
  },
  floatMobile: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity
      }
    }
  }
};

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  loading = false,
  type = 'button'
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string; 
  onClick?: () => void;
  loading?: boolean;
  type?: 'button' | 'submit';
}) => {
  const baseStyle = "relative overflow-hidden transition-all duration-200 font-bold tracking-wide flex items-center justify-center";
  
  // Mobile: 56px height, Desktop: 64px height (handled via classes)
  const variants = {
    primary: `bg-[${COLORS.red}] text-white hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(255,0,17,0.3)]`,
    secondary: `bg-[${COLORS.blue}] text-white hover:bg-black transition-colors duration-300 active:scale-95`,
    outline: `border-2 border-[${COLORS.blue}] text-[${COLORS.blue}] hover:bg-[${COLORS.blue}] hover:text-white`
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyle} ${variants[variant]} rounded-full px-8 py-4 md:py-5 w-full md:w-auto text-base md:text-lg ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={!loading ? { scale: 1.05 } : {}}
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin mr-2">⏳</span>
      ) : children}
    </motion.button>
  );
};

const FloatingEmoji = ({ 
  emoji, 
  className = '', 
  delay = 0, 
  size = 'md',
  isMobile = false
}: { 
  emoji: string; 
  className?: string; 
  delay?: number; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isMobile?: boolean;
}) => {
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-8xl'
  };

  return (
    <motion.div
      className={`absolute select-none pointer-events-none z-10 ${sizes[size]} ${className}`}
      initial={{ y: 0 }}
      animate={isMobile ? ANIMATION_VARIANTS.floatMobile.animate : ANIMATION_VARIANTS.float.animate}
      transition={{ delay }}
    >
      {emoji}
    </motion.div>
  );
};

const Logo = () => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-[#0000FF] rounded-xl flex items-center justify-center p-1.5 md:p-2">
        <img
          src="https://img.icons8.com/ios-filled/100/ffffff/dolphin.png"
          alt="Waveful Logo Fallback"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={`${basePath}/logo_app.png`}
      alt="Waveful Logo"
      className="w-full h-full object-cover rounded-xl"
      onError={() => setError(true)}
    />
  );
};

// AppStoreBadge removed — using official Apple SVG from public/

const SectionHeader = ({ 
  eyebrow, 
  title, 
  subtitle, 
  align = 'center',
  titleHighlight
}: { 
  eyebrow?: string; 
  title: string; 
  subtitle: string;
  align?: 'left' | 'center';
  titleHighlight?: string;
}) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-center md:text-left items-center md:items-start';

  // Split title to highlight specific word
  const renderTitle = () => {
    if (!titleHighlight) return title;
    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className={`text-[${COLORS.red}]`}>{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`flex flex-col ${alignment} mb-12 md:mb-16`}>
      {eyebrow && (
        <span className={`text-[${COLORS.blue}] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3 md:mb-4`}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-6xl font-black leading-[1.1] mb-4 text-black max-w-3xl">
        {renderTitle()}
      </h2>
      <p className="text-base md:text-xl text-black/70 font-medium max-w-xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

// --- Mockup Components ---

const PhoneMockup = ({ screenshot }: { screenshot?: string }) => {
  const imageSrc = screenshot || `${basePath}/Mockup-black.webp`;
  return (
    <div className="relative mx-auto w-[85%] max-w-[320px] md:max-w-[360px] aspect-[9/19.5] rotate-0 md:rotate-3 transition-transform duration-500 hover:rotate-0">
      {/* Frame */}
      <div className="absolute inset-0 bg-black rounded-[48px] shadow-2xl border-[8px] border-zinc-900 overflow-hidden z-20">
        {/* Notch/Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30 flex items-center justify-center">
          <div className="w-16 h-4 bg-zinc-900/50 rounded-full" />
        </div>

        {/* Screen Content - Screenshot */}
        <div className="w-full h-full pt-7 overflow-hidden">
          <img
            src={imageSrc}
            alt="App Screenshot"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-[50px] blur-xl -z-10" />
    </div>
  );
};

// --- Tracking Hooks ---

const useTrackSectionView = (sectionId: string) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.mixpanel) {
          window.mixpanel.track('section_view', { section: sectionId });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return ref;
};

// --- A/B Testing ---

const useABTest = (testName: string, variants: string[]): string => {
  const [variant] = useState(() => {
    const stored = localStorage.getItem(`ab_${testName}`);
    if (stored && variants.includes(stored)) return stored;
    const chosen = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_${testName}`, chosen);
    if (window.mixpanel) {
      window.mixpanel.register({ [`ab_${testName}`]: chosen });
    }
    return chosen;
  });
  return variant;
};

// --- Main App Component ---

const APP_STORE_URL = "https://apps.apple.com/it/app/waveful-become-a-creator/id1532913255?l=en-GB";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroCTARef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show sticky CTA when hero CTA scrolls out of viewport
  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCTA(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll depth tracking
  useEffect(() => {
    const milestones = [25, 50, 75, 90, 100];
    const reached = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          if (window.mixpanel) {
            window.mixpanel.track('scroll_depth', { depth_percent: milestone });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section view tracking refs
  const heroRef = useTrackSectionView('hero');
  const testimonialsRef = useTrackSectionView('testimonials');
  const whatAreSuperlikesRef = useTrackSectionView('what_are_superlikes');
  const whySuperlikesMatterRef = useTrackSectionView('why_superlikes_matter');
  const finalCTARef = useTrackSectionView('final_cta');

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF0011] selection:text-white overflow-hidden">
      {/* --- Background Elements --- */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              opacity: [0.03, 0.08, 0.03] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#0000FF] blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, -50, 0],
              opacity: [0.03, 0.06, 0.03] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF0011] blur-[100px]" 
          />
        </div>
      )}

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl shadow-lg shadow-blue-600/20 overflow-hidden">
               <Logo />
            </div>
            <span className="font-grotesk font-bold text-xl md:text-2xl tracking-tight">Waveful</span>
          </div>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
             className="hidden md:block"
             onClick={() => trackEvent('nav_download_free')}>
            <Button className="!py-2 !px-5 !text-sm">Download Free</Button>
          </a>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Hero Text */}
          <motion.div 
            className="flex-1 w-full relative z-10 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {/* REMOVED SUPERLIKES EYEBROW */}
            
            <motion.h1 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-[40px] md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-6 md:mb-8"
            >
              Make Your <span className="text-[#FF0011]">Move</span>.
            </motion.h1>
            
            <motion.p 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto md:mx-0"
            >
              Superlike who you want. See who's Superliking her.
            </motion.p>
            
            <motion.div 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            >
              <a ref={heroCTARef} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto" onClick={() => trackEvent('hero_download_free')}>
                <Button className="w-full md:w-auto">
                  Download Free
                </Button>
              </a>
            </motion.div>

            <motion.p
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-sm text-gray-400 mt-4 flex items-center justify-center md:justify-start gap-2"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {Math.floor(80 + Math.random() * 60)} people downloaded today
            </motion.p>

            {/* Floating Testimonials (Desktop) / Stacked (Mobile) */}
            <motion.div 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="mt-10 md:mt-16 flex flex-col md:flex-row gap-4 md:absolute md:top-[110%] md:left-0 md:w-[140%] md:pointer-events-none"
            >
              <div className="bg-white border-2 border-[#FF0011] rounded-full px-5 py-3 shadow-md inline-block transform md:-rotate-2 w-fit mx-auto md:mx-0">
                <p className="font-bold text-xs md:text-sm">She never saw it coming</p>
              </div>
              <div className="bg-white border-2 border-[#0000FF] rounded-full px-5 py-3 shadow-md inline-block transform md:rotate-2 w-fit mx-auto md:mx-0">
                <p className="font-bold text-xs md:text-sm">Finally, an app that gets it</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Mockup */}
          <motion.div 
            className="flex-1 w-full relative z-10"
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Desktop Connectors */}
            {!isMobile && (
              <svg className="absolute top-1/2 left-[-20%] w-[120%] h-full pointer-events-none z-0 opacity-40" viewBox="0 0 400 400">
                <path d="M 50 150 C 150 150, 150 200, 300 200" fill="none" stroke="#FF0011" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            )}

            <PhoneMockup screenshot={`${basePath}/screen-new-mockup.webp`} />

            {/* Floating Emojis */}
            <FloatingEmoji emoji="💙" size="xl" className="top-[-5%] right-0 md:right-[-5%]" delay={0} isMobile={isMobile} />
            <FloatingEmoji emoji="🔥" size="lg" className="top-[20%] left-0 md:left-[-10%]" delay={1.5} isMobile={isMobile} />
            <FloatingEmoji emoji="👀" size="md" className="bottom-[10%] left-[5%] md:left-[-5%]" delay={0.8} isMobile={isMobile} />
            <FloatingEmoji emoji="✨" size="md" className="top-[40%] right-[-5%]" delay={2.2} isMobile={isMobile} />
          </motion.div>
        </div>
      </section>

      {/* --- Emotional Truth Section --- */}
      <section ref={testimonialsRef as React.RefObject<HTMLElement>} className="py-20 md:py-32 px-6 bg-gray-50/50" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12">
            Real <span className="text-[#FF0011]">Stories</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
            {[
              {
                text: "I was curious if she was talking to someone else. Opened Waveful, saw the Superlikes. Now I know.",
                type: "negative",
                tag: "marco, 38"
              },
              {
                text: "Sent a Superlike and she messaged me within minutes. No games, no waiting.",
                type: "positive",
                tag: "alex, 42"
              },
              {
                text: "Discreet, fast, and it actually works. That’s all I needed.",
                type: "positive",
                tag: "dan, 35"
              },
              {
                text: "No algorithm burying your profile. You Superlike, they see it. Simple.",
                type: "positive",
                tag: "james, 47"
              },
              {
                text: "She said she wasn’t on any apps. Waveful showed me the receipts.",
                type: "negative",
                tag: "mike, 51"
              },
              {
                text: "Best feature? She gets a full-screen notification. Can’t miss it.",
                type: "positive",
                tag: "chris, 44"
              }
            ].map((card, idx) => {
              // Mobile: show only first 3 cards
              if (isMobile && idx > 2) return null;

              const isNegative = card.type === 'negative';
              const borderColor = isNegative ? COLORS.red : COLORS.blue;
              
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: idx * 0.15 }
                    }
                  }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-l-4 relative overflow-hidden transition-all duration-300`}
                  style={{ borderLeftColor: borderColor }}
                >
                  <div className="absolute top-4 left-4 text-6xl opacity-[0.05] font-serif leading-none select-none">"</div>
                  <p className="text-lg md:text-xl font-semibold leading-relaxed relative z-10 pt-4">
                    "{card.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                     <span className={`text-xs font-bold tracking-wider px-2 py-1 rounded bg-gray-100 ${isNegative ? 'text-red-600' : 'text-blue-600'}`}>
                        {card.tag}
                     </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- What Are Superlikes --- */}
      <section ref={whatAreSuperlikesRef as React.RefObject<HTMLElement>} className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Visual - Phone Mockup */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhoneMockup screenshot={`${basePath}/Mockup-black.webp`} />
            <FloatingEmoji emoji="✨" size="lg" className="top-0 right-0 md:right-10" delay={0.5} />
            <FloatingEmoji emoji="👀" size="md" className="bottom-10 left-0 md:left-10" delay={1.2} />
          </motion.div>

          {/* Text */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            <motion.h2 variants={ANIMATION_VARIANTS.fadeInUp} className="text-3xl md:text-5xl font-black mb-6">
              What's a <span className="text-[#FF0011]">Superlike</span>?
            </motion.h2>
            <motion.p variants={ANIMATION_VARIANTS.fadeInUp} className="text-xl md:text-2xl font-medium text-gray-500 mb-8">
              It's like a like, but she can't ignore it.
            </motion.p>
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="space-y-4 text-base md:text-lg text-left inline-block">
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">💙</span>
                  <p>She gets a full-screen notification</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">✨</span>
                  <p>You show up at the top of her feed</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">👀</span>
                  <p>See who's Superliking who</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">🔥</span>
                  <p>Get noticed. Stand out.</p>
               </div>
            </motion.div>
            
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="mt-10">
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto" onClick={() => trackEvent('mid_download_free')}>
                 <Button className="w-full md:w-auto">
                   Download Free
                 </Button>
               </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Mid-Page CTA --- */}
      <section className="py-12 px-6">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          <motion.p variants={ANIMATION_VARIANTS.fadeInUp} className="text-xl md:text-2xl font-bold mb-4">
            Ready to make your move?
          </motion.p>
          <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="flex justify-center">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('mid_scroll_download_free')}>
              <Button className="w-full md:w-auto">Download Free</Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Why Superlikes Matter --- */}
      <section ref={whySuperlikesMatterRef as React.RefObject<HTMLElement>} className="py-20 md:py-32 px-6 bg-black text-white rounded-[40px] md:rounded-[80px] mx-4 md:mx-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Why Superlikes Hit Different</h2>
            <p className="text-white/70 text-lg">Three reasons everyone's talking about them</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "👀", title: "Full Visibility", desc: "See exactly who's interested. No guessing." },
              { icon: "💙", title: "Stand Out Instantly", desc: "Your Superlike gets instant attention. No algorithm." },
              { icon: "🔥", title: "No Games", desc: "When she gets your Superlike, she knows you mean it." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-[32px] border border-white/5"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA / Waitlist --- */}
      <section ref={finalCTARef as React.RefObject<HTMLElement>} id="waitlist-section" className="py-24 md:py-40 px-6 relative overflow-hidden">
        {/* Decorative Background Blobs for CTA */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 blur-[80px] rounded-full" />
           <div className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[60%] w-[250px] h-[250px] bg-blue-500/10 blur-[80px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={ANIMATION_VARIANTS.staggerContainer}
          >
             <motion.h2 
               variants={ANIMATION_VARIANTS.fadeInUp} 
               className="text-4xl md:text-7xl font-black mb-6 tracking-tight"
             >
               See Who She's <br/>
               <span className="text-[#FF0011]">Really</span> Superliking
             </motion.h2>
             <motion.p
               variants={ANIMATION_VARIANTS.fadeInUp}
               className="text-lg md:text-2xl text-gray-600 mb-12 max-w-xl mx-auto font-medium"
             >
               Download Waveful. One tap. No games.
             </motion.p>

             {/* App Icon */}
             <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="mb-8">
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block" onClick={() => trackEvent('footer_app_icon')}>
                 <motion.div
                   className="w-28 h-28 md:w-32 md:h-32 rounded-[28px] overflow-hidden mx-auto shadow-[0_8px_30px_rgba(0,0,255,0.15)]"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <Logo />
                 </motion.div>
               </a>
             </motion.div>

             {/* Download CTA */}
             <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="flex flex-col items-center gap-5 max-w-md mx-auto">
               {/* App Store Badge */}
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('footer_appstore_badge')}>
                 <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                   <img src={`${basePath}/Download_on_the_App_Store_Badge.svg`} alt="Download on the App Store" className="w-[150px] h-auto" />
                 </motion.div>
               </a>

               {/* CTA Button */}
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs mx-auto" onClick={() => trackEvent('footer_download_free')}>
                 <Button className="w-full md:!w-full h-14">
                   Download Free
                 </Button>
               </a>

               <p className="text-sm text-gray-400 font-medium">Free on iOS — No credit card needed</p>
             </motion.div>
          </motion.div>
        </div>

        {/* Scattered Emojis for CTA */}
        <FloatingEmoji emoji="💙" size="lg" className="top-10 left-10 md:left-[20%]" delay={0.2} isMobile={isMobile} />
        <FloatingEmoji emoji="🔥" size="md" className="bottom-20 right-10 md:right-[20%]" delay={0.7} isMobile={isMobile} />
        <FloatingEmoji emoji="✨" size="lg" className="top-20 right-5 md:right-[15%]" delay={1.5} isMobile={isMobile} />
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md">
              <Logo />
            </div>
            <span className="font-grotesk font-bold text-xl">Waveful</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
             <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" onClick={() => trackEvent('footer_about')}>About</a>
             <span>•</span>
             <a href="mailto:support@waveful.com" className="hover:text-black transition-colors" onClick={() => trackEvent('footer_privacy')}>Privacy</a>
             <span>•</span>
             <a href="mailto:support@waveful.com" className="hover:text-black transition-colors" onClick={() => trackEvent('footer_terms')}>Terms</a>
          </div>

          <p className="text-xs text-gray-400 font-medium">© 2026 Waveful</p>
        </div>
      </footer>

      {/* --- Sticky Mobile CTA --- */}
      <AnimatePresence>
        {isMobile && showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3"
          >
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('sticky_download_free')}>
              <Button className="w-full">Download Free</Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;