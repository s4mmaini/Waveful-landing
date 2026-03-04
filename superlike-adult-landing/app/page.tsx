"use client"

import React from "react"

const basePath = process.env.NODE_ENV === 'production' ? '/adult' : '';

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

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
      <FloatingEmoji emoji="💰" className="top-0 right-0 md:-right-8" size="text-5xl md:text-6xl" delay={0} />
      <FloatingEmoji emoji="💋" className="top-4 left-0 md:-left-8" size="text-4xl md:text-5xl" delay={0.5} />
      <FloatingEmoji emoji="💎" className="bottom-8 right-0 md:-right-4" size="text-3xl md:text-4xl" delay={1} />
      <FloatingEmoji emoji="🌹" className="-left-4 top-1/2" size="text-2xl md:text-3xl" delay={1.5} />
      <FloatingEmoji emoji="✨" className="right-4 top-1/3" size="text-2xl" delay={2} />
      
      {/* Connecting lines - hidden on mobile */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ overflow: 'visible' }}>
        <motion.path
          d="M -20 100 Q 50 80 100 120"
          stroke="#FF0011"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 280 50 Q 320 100 300 150"
          stroke="#FF0011"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* iPhone Frame */}
      <motion.div
        className="relative w-[240px] md:w-[280px] mx-auto"
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Phone outer frame */}
        <div className="bg-foreground rounded-[40px] p-2 shadow-2xl">
          {/* Phone inner screen area */}
          <div className="bg-background rounded-[32px] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />
            
            {/* Screen content */}
            <div className="pt-8 pb-4 px-3 min-h-[480px] md:min-h-[520px] bg-gradient-to-b from-background to-muted">
              {/* Header with earnings */}
              <div className="bg-[#FF0011] rounded-2xl p-3 mb-3">
                <div className="text-white text-xs font-medium opacity-80">Your Earnings</div>
                <div className="text-white text-2xl font-bold font-[var(--font-heading)]">$347.50</div>
                <div className="text-white text-xs opacity-80 flex items-center gap-1">
                  <span>+$48 today</span>
                  <span>📈</span>
                </div>
              </div>
              
              {/* Superlike notifications */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground mb-2">New Superlikes</div>
                
                {[
                  { name: "Marco", amount: "$5.00", time: "2m ago", emoji: "💕" },
                  { name: "Alex", amount: "$3.50", time: "15m ago", emoji: "💋" },
                  { name: "David", amount: "$7.00", time: "1h ago", emoji: "🔥" },
                  { name: "James", amount: "$4.00", time: "2h ago", emoji: "💎" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="bg-background rounded-xl p-3 shadow-sm border border-border flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                        {item.emoji}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                    <div className="text-[#FF0011] font-bold text-sm">{item.amount}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom action buttons */}
              <div className="flex gap-2 mt-4">
                <button type="button" className="flex-1 bg-foreground text-background py-2 rounded-full text-xs font-semibold">
                  View All
                </button>
                <button type="button" className="flex-1 bg-[#FF0011] text-white py-2 rounded-full text-xs font-semibold">
                  Cash Out
                </button>
              </div>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-foreground rounded-full opacity-50" />
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
        <motion.a
          href="#waitlist"
          className="bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden md:inline">Join Waitlist</span>
          <span className="md:hidden">Join</span>
        </motion.a>
      </div>
    </motion.nav>
  )
}

// ============================================
// TESTIMONIAL PILL COMPONENT
// ============================================
function TestimonialPill({ 
  children, 
  className,
  delay = 0
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={cn(
        "bg-background px-4 py-2 rounded-full shadow-lg border border-border text-sm font-medium text-foreground",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF0011] opacity-[0.03] blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF0011] opacity-[0.05] blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
            {/* Headline */}
            <motion.h1
              className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 text-foreground text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Turn Attention Into <span className="text-[#FF0011]">Control</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Men send you Superlikes. You get paid. Chat if you want, ignore if you don&apos;t. Finally, your desirability has real value.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#waitlist"
                className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Your Power
              </motion.a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center text-[#FF0011] font-semibold text-lg hover:underline"
              >
                See How It Works ↓
              </a>
            </motion.div>
            
            {/* Social proof stat */}
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Join 50,000+ earning creators
            </motion.p>
          </motion.div>
          
          {/* Right column - Phone mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <TestimonialPill 
              className="absolute top-0 right-0 lg:right-8 z-10 hidden md:block"
              delay={1}
            >
              He sent 20 Superlikes today 💋
            </TestimonialPill>
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// MARQUEE TICKER
// ============================================
function MarqueeTicker() {
  const text = "💋 SUMMER 2026 💋 GET PAID FOR SUPERLIKES 💰 YOUR ATTENTION HAS VALUE 💎 EARN WHILE YOU CHAT ✨ JOIN THE ELITE 👑 "
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-foreground py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-background text-sm md:text-base font-bold tracking-wide mx-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
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
      icon: "💰",
      title: "Earn From Superlikes",
      description: "Every Superlike puts money in your pocket. Men pay to get your attention, and you decide if they're worth your time."
    },
    {
      icon: "💎",
      title: "Quality Over Quantity",
      description: "Only men serious enough to invest get through. No more time-wasters or low-effort approaches. Premium attention from premium suitors."
    },
    {
      icon: "👑",
      title: "You're In Control",
      description: "Accept the chat, send a gift back, or simply collect and move on. Your desirability, your rules, your income."
    }
  ]
  
  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Why <span className="text-[#FF0011]">Smart Women</span> Choose Waveful
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three reasons your attention finally has the value it deserves
          </p>
        </motion.div>
        
        {/* Cards grid */}
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
// HOW IT WORKS SECTION
// ============================================
function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const steps = [
    {
      number: "01",
      emoji: "📱",
      title: "Create Your Profile",
      description: "Set up your profile with photos that show your best self. You decide what you share and how you present yourself to potential suitors."
    },
    {
      number: "02",
      emoji: "💋",
      title: "Receive Superlikes",
      description: "Men who want your attention send Superlikes. Each one puts money directly into your account. The more desirable you are, the more you earn."
    },
    {
      number: "03",
      emoji: "💰",
      title: "Chat or Cash Out",
      description: "Decide who deserves your time. Chat with the ones you like, send them gifts, or simply collect your earnings. Your attention, your choice, your profit."
    }
  ]
  
  return (
    <section ref={ref} id="how-it-works" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Section header */}
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
            Three steps to monetize your attention
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {/* Large number */}
              <div className="absolute -left-4 md:left-0 top-0 font-[var(--font-heading)] text-[100px] md:text-[120px] font-black text-[#FF0011] opacity-20 leading-none select-none">
                {step.number}
              </div>
              
              {/* Emoji */}
              <motion.div
                className="relative z-10 text-6xl"
                whileHover={{ rotate: 5 }}
                aria-hidden="true"
              >
                {step.emoji}
              </motion.div>
              
              {/* Content */}
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
  const APP_STORE_URL = "https://apps.apple.com/it/app/waveful-become-a-creator/id1532913255?l=en-GB"

  return (
    <section ref={ref} id="waitlist" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#FF0011] opacity-[0.05] blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating emoji */}
      <FloatingEmoji emoji="💰" className="top-20 left-[10%] hidden md:block" size="text-5xl" delay={0} />
      <FloatingEmoji emoji="💋" className="top-32 right-[15%] hidden md:block" size="text-4xl" delay={0.5} />
      <FloatingEmoji emoji="💎" className="bottom-32 left-[20%] hidden md:block" size="text-4xl" delay={1} />
      <FloatingEmoji emoji="👑" className="bottom-40 right-[10%] hidden md:block" size="text-5xl" delay={1.5} />
      <FloatingEmoji emoji="✨" className="top-1/2 left-[5%] hidden md:block" size="text-3xl" delay={2} />

      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 text-balance">
            Ready to Turn Attention Into <span className="text-[#FF0011]">Income</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Download Waveful now and start earning from your desirability. It&apos;s free.
          </p>
        </motion.div>

        {/* App Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
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
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <img src={`${basePath}/Download_on_the_App_Store_Badge.svg`} alt="Download on the App Store" className="w-[150px] h-auto" />
            </motion.div>
          </a>

          {/* CTA Button */}
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
            <motion.div
              className="bg-[#FF0011] text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg cursor-pointer text-center"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255, 0, 17, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Download Now — It&apos;s Free
            </motion.div>
          </a>

          <p className="text-sm text-muted-foreground mt-2">
            Join 3M+ creators already earning on Waveful
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
    <footer className="bg-background border-t border-border py-8 md:py-12 mb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <WavefulLogo size="small" />
          
          {/* Links */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer navigation">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span aria-hidden="true">•</span>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#FF0011] font-bold">18+ Only</span>
            <span className="text-muted-foreground">© 2026 Waveful</span>
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
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      <MarqueeTicker />
    </main>
  )
}
