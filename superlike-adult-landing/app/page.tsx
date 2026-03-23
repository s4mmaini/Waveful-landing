"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ============================================
// GLOBALS
// ============================================

declare global {
  interface Window { mixpanel: any }
}

const basePath = '/adult';
const APP_STORE_URL = "https://apps.apple.com/it/app/waveful-become-a-creator/id1532913255?l=en-GB";

const trackEvent = (ctaName: string) => {
  if (window.mixpanel) {
    window.mixpanel.track('cta_click', { cta_name: ctaName });
  }
};

// ============================================
// TRACKING HOOKS
// ============================================

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

// ============================================
// FLOATING EMOJI COMPONENT
// ============================================
function FloatingEmoji({
  emoji,
  className,
  delay = 0,
  size = "text-4xl"
}: {
  emoji: string
  className?: string
  delay?: number
  size?: string
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("absolute select-none pointer-events-none", size, className)}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {emoji}
    </motion.span>
  )
}

// ============================================
// LOGO COMPONENT
// ============================================
function WavefulLogo({ size = "default" }: { size?: "default" | "small" }) {
  const iconSize = size === "small" ? "w-8 h-8" : "w-10 h-10"
  const textSize = size === "small" ? "text-xl" : "text-2xl"

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "rounded-xl overflow-hidden flex items-center justify-center",
        iconSize
      )}>
        <img
          src={`${basePath}/logo_app.png`}
          alt="Waveful logo"
          className="w-full h-full object-cover"
        />
      </div>
      <span className={cn(
        "font-[var(--font-heading)] font-bold text-foreground",
        textSize
      )}>
        Waveful
      </span>
    </div>
  )
}

// ============================================
// PHONE MOCKUP COMPONENT
// ============================================
function PhoneMockup() {
  return (
    <div className="relative">
      {/* Floating emoji around phone */}
      <FloatingEmoji emoji="🔥" className="top-0 right-0 md:-right-8" size="text-5xl md:text-6xl" delay={0} />
      <FloatingEmoji emoji="💋" className="top-4 left-0 md:-left-8" size="text-4xl md:text-5xl" delay={0.5} />
      <FloatingEmoji emoji="😍" className="bottom-8 right-0 md:-right-4" size="text-3xl md:text-4xl" delay={1} />
      <FloatingEmoji emoji="👀" className="-left-4 top-1/2" size="text-2xl md:text-3xl" delay={1.5} />
      <FloatingEmoji emoji="✨" className="right-4 top-1/3" size="text-2xl" delay={2} />

      {/* iPhone Frame with screenshot */}
      <motion.div
        className="relative w-[240px] md:w-[280px] mx-auto"
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="bg-foreground rounded-[40px] p-2 shadow-2xl">
          <div className="rounded-[32px] overflow-hidden relative">
            <img
              src={`${basePath}/screen-new-mockup.webp`}
              alt="Waveful app screenshot"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// NAVBAR COMPONENT
// ============================================
function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <WavefulLogo size="small" />
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('nav_download_free')}
          className="bg-[#FF0011] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <span className="hidden md:inline">Download Free</span>
          <span className="md:hidden">Download</span>
        </a>
      </div>
    </motion.nav>
  )
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection({ heroCTARef }: { heroCTARef: React.RefObject<HTMLAnchorElement | null> }) {
  const [activeCount, setActiveCount] = useState(0);
  useEffect(() => {
    setActiveCount(Math.floor(Math.random() * 301) + 200);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF0011] opacity-[0.03] blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF0011] opacity-[0.05] blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 text-foreground text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              She Got 47 Superlikes Last Night. <span className="text-[#FF0011]">Want to Be Next?</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Send a Superlike she can&apos;t ignore. Full-screen notification. She sees you instantly. One tap.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                ref={heroCTARef}
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('hero_download_free')}
                className="inline-flex items-center justify-center bg-[#FF0011] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Free
              </motion.a>
            </motion.div>

            {/* Urgency + social proof */}
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {activeCount} girls active right now
              </p>
              <p className="text-sm text-muted-foreground">
                Free on iOS — No credit card needed
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Phone mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VALUE PROPS SECTION
// ============================================
function ValuePropsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const cards = [
    {
      icon: "🔥",
      title: "She Can't Ignore It",
      description: "Your Superlike triggers a full-screen notification. No algorithm, no waiting. She sees you instantly."
    },
    {
      icon: "👀",
      title: "See Who's Looking",
      description: "Know exactly who checked your profile and who's interested. No more guessing games."
    },
    {
      icon: "💋",
      title: "Stand Out Instantly",
      description: "Skip the line. Your Superlike puts you on top — before every other guy."
    }
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Why Guys <span className="text-[#FF0011]">Can&apos;t Stop</span> Using Waveful
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The only app where she actually notices you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-card rounded-[32px] p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <span className="text-7xl mb-6 block" aria-hidden="true">{card.icon}</span>
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold text-card-foreground mb-4">
                {card.title}
              </h3>
              <p className="text-card-foreground/90 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      quote: "Sent a Superlike at 11pm. She replied in 3 minutes. This app is different.",
      name: "jake, 28",
      border: "border-[#FF0011]/30",
    },
    {
      quote: "I've tried every dating app. This is the only one where she actually sees you.",
      name: "tyler, 34",
      border: "border-[#FF0011]/30",
    },
    {
      quote: "The notification is full-screen. She can't pretend she didn't see it. Game changer.",
      name: "ryan, 25",
      border: "border-[#FF0011]/30",
    },
    {
      quote: "Was invisible on other apps. First Superlike on Waveful, she messaged me within minutes.",
      name: "brandon, 31",
      border: "border-[#FF0011]/30",
    },
    {
      quote: "She told me she got my Superlike while she was with her friends. They all saw it. That's the point.",
      name: "chris, 27",
      border: "border-[#FF0011]/30",
    },
    {
      quote: "No more wondering if she saw your message. She sees it. Full screen. Impossible to miss.",
      name: "mike, 30",
      border: "border-[#FF0011]/30",
    },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
            Real <span className="text-[#FF0011]">Results</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={cn(
                "bg-background rounded-2xl p-6 shadow-md border-2 hover:shadow-lg transition-shadow relative",
                t.border
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <span className="text-[#FF0011] text-4xl font-serif leading-none block mb-3">&ldquo;</span>
              <p className="text-foreground/90 leading-relaxed mb-4 text-sm md:text-base">
                {t.quote}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// MID-PAGE CTA SECTION
// ============================================
function MidPageCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        <motion.p
          className="text-2xl md:text-3xl font-[var(--font-heading)] font-black text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ready to get <span className="text-[#FF0011]">noticed</span>?
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('mid_download_free')}
          >
            <motion.div
              className="bg-[#FF0011] text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(255, 0, 17, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Download Free
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// HOW IT WORKS SECTION
// ============================================
function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      emoji: "📱",
      title: "Download the App",
      description: "Free. 10 seconds. No credit card needed. Available on iOS."
    },
    {
      number: "02",
      emoji: "🔥",
      title: "Send a Superlike",
      description: "She gets a full-screen notification with your profile. Can't miss it. Can't ignore it."
    },
    {
      number: "03",
      emoji: "💋",
      title: "She Notices You",
      description: "If she likes what she sees, you'll know. No more wondering. No more waiting."
    }
  ]

  return (
    <section ref={ref} id="how-it-works" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three steps. She sees you tonight.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="absolute -left-4 md:left-0 top-0 font-[var(--font-heading)] text-[100px] md:text-[120px] font-black text-[#FF0011] opacity-20 leading-none select-none">
                {step.number}
              </div>

              <motion.div
                className="relative z-10 text-6xl"
                whileHover={{ rotate: 5 }}
                aria-hidden="true"
              >
                {step.emoji}
              </motion.div>

              <div className="text-center md:text-left relative z-10">
                <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/80 text-lg leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#FF0011] opacity-[0.05] blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating emoji */}
      <FloatingEmoji emoji="🔥" className="top-20 left-[10%] hidden md:block" size="text-5xl" delay={0} />
      <FloatingEmoji emoji="💋" className="top-32 right-[15%] hidden md:block" size="text-4xl" delay={0.5} />
      <FloatingEmoji emoji="😍" className="bottom-32 left-[20%] hidden md:block" size="text-4xl" delay={1} />
      <FloatingEmoji emoji="👀" className="bottom-40 right-[10%] hidden md:block" size="text-5xl" delay={1.5} />
      <FloatingEmoji emoji="✨" className="top-1/2 left-[5%] hidden md:block" size="text-3xl" delay={2} />

      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 text-balance">
            She&apos;s Online Right Now. <span className="text-[#FF0011]">Make Your Move.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Download Waveful. Free. One tap.
          </p>
        </motion.div>

        {/* App Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('footer_app_icon')}
            className="inline-block"
          >
            <motion.img
              src={`${basePath}/logo_app.png`}
              alt="Waveful App"
              className="w-28 h-28 md:w-32 md:h-32 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          {/* App Store Badge */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('footer_appstore_badge')}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <img src={`${basePath}/Download_on_the_App_Store_Badge.svg`} alt="Download on the App Store" className="w-[150px] h-auto" />
            </motion.div>
          </a>

          {/* CTA Button */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('footer_download_free')}
            className="w-full max-w-xs"
          >
            <motion.div
              className="bg-[#FF0011] text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg cursor-pointer text-center"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255, 0, 17, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Download Free
            </motion.div>
          </a>

          <p className="text-sm text-muted-foreground mt-2">
            Free on iOS — No credit card needed
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER SECTION
// ============================================
function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <WavefulLogo size="small" />

          <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer navigation">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">About</a>
            <span aria-hidden="true">&bull;</span>
            <a href="mailto:support@waveful.com" className="hover:text-foreground transition-colors">Privacy</a>
            <span aria-hidden="true">&bull;</span>
            <a href="mailto:support@waveful.com" className="hover:text-foreground transition-colors">Terms</a>
            <span aria-hidden="true">&bull;</span>
            <a href="mailto:support@waveful.com" className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#FF0011] font-bold">18+ Only</span>
            <span className="text-muted-foreground">&copy; 2026 Waveful</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function WavefulLandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroCTARef = useRef<HTMLAnchorElement>(null);

  // Mobile detection
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

  // Section view tracking
  const heroRef = useTrackSectionView('hero');
  const valuePropsRef = useTrackSectionView('value_props');
  const testimonialsRef = useTrackSectionView('testimonials');
  const howItWorksRef = useTrackSectionView('how_it_works');
  const finalCTARef = useTrackSectionView('final_cta');

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section ref={heroRef as React.RefObject<HTMLElement>}>
        <HeroSection heroCTARef={heroCTARef} />
      </section>
      <section ref={valuePropsRef as React.RefObject<HTMLElement>}>
        <ValuePropsSection />
      </section>
      <section ref={testimonialsRef as React.RefObject<HTMLElement>}>
        <TestimonialsSection />
      </section>
      <MidPageCTA />
      <section ref={howItWorksRef as React.RefObject<HTMLElement>}>
        <HowItWorksSection />
      </section>
      <section ref={finalCTARef as React.RefObject<HTMLElement>}>
        <CTASection />
      </section>
      <Footer />

      {/* Sticky CTA - mobile only */}
      <AnimatePresence>
        {isMobile && showStickyCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('sticky_download_free')}
              className="block"
            >
              <div className="bg-[#FF0011] text-white w-full py-3 rounded-full text-center font-bold text-base shadow-lg">
                Download Free
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
