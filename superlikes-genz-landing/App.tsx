import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const AppStoreBadge = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="6" fill="black"/>
    <text x="42" y="12" fill="white" fontSize="5" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">Download on the</text>
    <text x="42" y="27" fill="white" fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">App Store</text>
    <g transform="translate(10, 6) scale(0.65)" fill="white">
      <path d="M18.9 14.3C18.9 10.6 21.8 8.8 21.9 8.8 20.2 6.3 17.6 6 16.7 6 14.4 5.8 12.2 7.4 11 7.4 9.8 7.4 8 6 6.1 6.1 3.6 6.1 1.3 7.5 0 9.8-2.7 14.4-0.7 21.2 1.9 25 3.1 26.8 4.5 28.9 6.4 28.8 8.2 28.7 8.9 27.6 11.1 27.6 13.3 27.6 13.9 28.8 15.8 28.8 17.8 28.8 18 28.8 19.1 26.7 20.3 24.8 21.3 22.8 21.3 22.8 21.3 22.8 18.9 21.8 18.9 14.3M15.4 4C16.4 2.8 17.1 1.1 16.9-0.5 15.5-0.4 13.7 0.5 12.7 1.7 11.8 2.7 11 4.5 11.2 6.1 12.8 6.2 14.4 5.2 15.4 4"/>
    </g>
  </svg>
);

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
  const imageSrc = screenshot || `${basePath}/Mockup-black.PNG`;
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

// --- Main App Component ---

const APP_STORE_URL = "https://apps.apple.com/it/app/waveful-become-a-creator/id1532913255?l=en-GB";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#FF0011] selection:text-white overflow-hidden pb-12">
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
          {/* Button removed from header */}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto">
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
              Ready for the <span className="text-[#FF0011]">Truth</span>?
            </motion.h1>
            
            <motion.p 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto md:mx-0"
            >
              Superlikes don't lie. See exactly who's getting the hearts from your boyfriend, crush, or friends. Complete transparency, no more hiding.
            </motion.p>
            
            <motion.div 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            >
              <Button onClick={scrollToWaitlist} className="w-full md:w-auto">
                Get Early Access
              </Button>
              <a 
                href="#how-it-works" 
                onClick={scrollToHowItWorks}
                className="text-[#0000FF] font-bold text-base md:text-lg hover:underline py-2"
              >
                Why it matters ↓
              </a>
            </motion.div>

            {/* Floating Testimonials (Desktop) / Stacked (Mobile) */}
            <motion.div 
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="mt-10 md:mt-16 flex flex-col md:flex-row gap-4 md:absolute md:top-[110%] md:left-0 md:w-[140%] md:pointer-events-none"
            >
              <div className="bg-white border-2 border-[#FF0011] rounded-full px-5 py-3 shadow-md inline-block transform md:-rotate-2 w-fit mx-auto md:mx-0">
                <p className="font-bold text-xs md:text-sm">Found out he was cheating 💔</p>
              </div>
              <div className="bg-white border-2 border-[#0000FF] rounded-full px-5 py-3 shadow-md inline-block transform md:rotate-2 w-fit mx-auto md:mx-0">
                <p className="font-bold text-xs md:text-sm">Best feature on Waveful 😤</p>
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

            <PhoneMockup screenshot={`${basePath}/screen-new-mockup.PNG`} />

            {/* Floating Emojis */}
            <FloatingEmoji emoji="💙" size="xl" className="top-[-5%] right-0 md:right-[-5%]" delay={0} isMobile={isMobile} />
            <FloatingEmoji emoji="💕" size="lg" className="top-[20%] left-0 md:left-[-10%]" delay={1.5} isMobile={isMobile} />
            <FloatingEmoji emoji="💔" size="md" className="bottom-[10%] left-[5%] md:left-[-5%]" delay={0.8} isMobile={isMobile} />
            <FloatingEmoji emoji="✨" size="md" className="top-[40%] right-[-5%]" delay={2.2} isMobile={isMobile} />
            <FloatingEmoji emoji="👀" size="sm" className="bottom-[30%] right-[-2%]" delay={1} isMobile={isMobile} />
          </motion.div>
        </div>
      </section>

      {/* --- Emotional Truth Section --- */}
      <section className="py-20 md:py-32 px-6 bg-gray-50/50" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="REAL STORIES"
            title="The Truth Hurts. But You Deserve It."
            subtitle="Real stories from real people who found out the truth through Superlikes."
            align="center"
            titleHighlight="Deserve It."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
            {[
              { 
                text: "I really thought he was being all lowkey… then I opened Waveful and saw he’s been Superliking the same girl all week. I’m sick. 😭", 
                type: "negative",
                tag: "@emma.w"
              },
              { 
                text: "When the cutest guy in my class Superliked me and my phone basically yelled about it. I’ve never opened an app that fast. 💙", 
                type: "positive",
                tag: "@sarahm_"
              },
              { 
                text: "The fact my friends can see who I Superlike keeps me in check… but also makes it so much more fun. 👀", 
                type: "positive",
                tag: "@lauren.k"
              },
              { 
                text: "I sent one Superlike and it didn’t get lost in the void. No ‘hope they see it’, they saw it. Instantly. 🔥", 
                type: "positive",
                tag: "@madiwilson"
              },
              { 
                text: "When he says ‘I’m not talking to anyone else’ but Waveful has receipts. Love that for me. 🙃", 
                type: "negative",
                tag: "@olivia.jx"
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
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Visual - Phone Mockup */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhoneMockup screenshot={`${basePath}/Mockup-black.PNG`} />
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
              The move that changes everything.
            </motion.p>
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="space-y-4 text-base md:text-lg text-left inline-block">
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">💙</span>
                  <p>They get a special full-screen notification</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">✨</span>
                  <p>It shows up at the top of their feed</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">👀</span>
                  <p>Your friends can see who you're Superliking</p>
               </div>
               <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">💸</span>
                  <p>Get noticed. Get paid.</p>
               </div>
            </motion.div>
            
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="mt-10">
               <Button variant="secondary" className="w-full md:w-auto" onClick={scrollToWaitlist}>
                 See it in action
               </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Why Superlikes Matter --- */}
      <section className="py-20 md:py-32 px-6 bg-black text-white rounded-[40px] md:rounded-[80px] mx-4 md:mx-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Why Superlikes Hit Different</h2>
            <p className="text-white/70 text-lg">Three reasons everyone's talking about them</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "👀", title: "Complete Transparency", desc: "See exactly who's Superliking who. No secrets, no hiding. If they're playing games, you'll know." },
              { icon: "💙", title: "Stand Out Instantly", desc: "Your Superlike gets their attention immediately. No algorithm games, no getting lost in the feed." },
              { icon: "🔥", title: "Keep It Real", desc: "Superlikes can't be faked or spammed. They mean something. When someone sends you one, they're for real." }
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
      <section id="waitlist-section" className="py-24 md:py-40 px-6 relative overflow-hidden">
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
               See Who They're <br/>
               <span className="text-[#FF0011]">Really</span> Superliking
             </motion.h2>
             <motion.p
               variants={ANIMATION_VARIANTS.fadeInUp}
               className="text-lg md:text-2xl text-gray-600 mb-12 max-w-xl mx-auto font-medium"
             >
               Download Waveful now. The truth is one tap away.
             </motion.p>

             {/* App Icon */}
             <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="mb-8">
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
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
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                 <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                   <AppStoreBadge className="w-[150px] h-auto" />
                 </motion.div>
               </a>

               {/* CTA Button */}
               <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
                 <Button className="w-full h-14">
                   Get Waveful — Free
                 </Button>
               </a>

               <p className="text-sm text-gray-400 font-medium">Free &bull; No signup required</p>
             </motion.div>
          </motion.div>
        </div>

        {/* Scattered Emojis for CTA */}
        <FloatingEmoji emoji="💙" size="lg" className="top-10 left-10 md:left-[20%]" delay={0.2} isMobile={isMobile} />
        <FloatingEmoji emoji="💔" size="md" className="bottom-20 right-10 md:right-[20%]" delay={0.7} isMobile={isMobile} />
        <FloatingEmoji emoji="✨" size="lg" className="top-20 right-5 md:right-[15%]" delay={1.5} isMobile={isMobile} />
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white mb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md">
              <Logo />
            </div>
            <span className="font-grotesk font-bold text-xl">Waveful</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
             <a href="#" className="hover:text-black transition-colors">About</a>
             <span>•</span>
             <a href="#" className="hover:text-black transition-colors">Privacy</a>
             <span>•</span>
             <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>

          <p className="text-xs text-gray-400 font-medium">© 2026 Waveful</p>
        </div>
      </footer>

      {/* --- Ticker --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black text-white py-3 overflow-hidden border-t-2 border-[#FF0011]">
        <motion.div 
          className="whitespace-nowrap flex gap-8 items-center font-bold text-sm md:text-base tracking-widest uppercase"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: isMobile ? 20 : 30 
          }}
        >
          {Array(10).fill(null).map((_, i) => (
             <React.Fragment key={i}>
                <span>SUPERLIKES REVEAL EVERYTHING 💔</span>
                <span>SEE WHO THEY REALLY LIKE 👀</span>
                <span>NO MORE SECRETS 💙</span>
                <span>BE THE ONE WHO GETS SUPERLIKED ✨</span>
             </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;