"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// ═══════════════════════════════════════════════════════════════
// FLOATING EMOJI COMPONENT
// ═══════════════════════════════════════════════════════════════
function FloatingEmoji({
  emoji,
  className,
  delay = 0,
  duration = 3,
}: {
  emoji: string
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.span
      className={`absolute text-4xl md:text-5xl select-none pointer-events-none ${className}`}
      aria-hidden="true"
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {emoji}
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════
// PILL BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════
function PillButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-black text-white font-bold text-base px-8 h-16 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════
// APP ICON LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════
function AppIconLogo({ size = 40 }: { size?: number }) {
  return (
    <div
      className="overflow-hidden rounded-xl shadow-sm"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src="/logo_app.png"
        alt="Waveful Logo"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PHONE MOCKUP COMPONENT
// ═══════════════════════════════════════════════════════════════
function PhoneMockup() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div
        className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-[3rem] p-2 shadow-2xl"
        style={{ transform: "rotate(5deg)" }}
      >
        <div className="bg-black rounded-[2.5rem] p-1">
          {/* Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
          {/* Screen */}
          <div className="bg-white rounded-[2.3rem] overflow-hidden w-64 h-[520px] relative">
            {/* Status Bar */}
            <div className="h-12 bg-white flex items-center justify-center">
              <span className="text-xs font-medium text-black/60">9:41</span>
            </div>
            {/* App Header */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AppIconLogo size={28} />
                <span className="font-bold text-black">Waveful</span>
              </div>
            </div>
            {/* Feed Content */}
            <div className="p-3 space-y-3">
              {/* Post 1 */}
              <div className="bg-gray-50 rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-pink-200" />
                  <span className="text-sm font-medium text-black">Maria S.</span>
                </div>
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2">
                  <img src="/pizza.jpg" alt="Homemade pizza" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-black/70 mb-2">My favorite recipe! 💖</p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#BB00FF" }}
                  >
                    <span className="text-white text-xs font-bold">💝 124</span>
                  </div>
                  <span className="text-xs text-black/50">Superlikes</span>
                </div>
              </div>
              {/* Post 2 */}
              <div className="bg-gray-50 rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-200" />
                  <span className="text-sm font-medium text-black">Elena R.</span>
                </div>
                <div className="w-full h-20 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 mb-2 flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
                <div
                  className="flex items-center gap-1 px-3 py-1 rounded-full w-fit"
                  style={{ backgroundColor: "#BB00FF" }}
                >
                  <span className="text-white text-xs font-bold">💝 89</span>
                </div>
              </div>
            </div>
            {/* Notification */}
            <div className="absolute bottom-20 left-3 right-3 bg-black rounded-2xl p-3 shadow-lg">
              <p className="text-white text-xs font-medium">
                <span className="text-lg mr-1">💝</span> You received 12 new Superlikes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIAL CHIP COMPONENT
// ═══════════════════════════════════════════════════════════════
function TestimonialChip({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute bg-white rounded-full px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <span className="text-sm font-medium text-black">{text}</span>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// VALUE PROP CARD COMPONENT
// ═══════════════════════════════════════════════════════════════
function ValueCard({
  emoji,
  title,
  description,
  delay = 0,
}: {
  emoji: string
  title: string
  description: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 12px 40px rgba(187,0,255,0.2)" }}
      className="bg-black rounded-[32px] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-300"
    >
      <span className="text-7xl block mb-6" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/90 font-medium leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// STEP COMPONENT
// ═══════════════════════════════════════════════════════════════
function Step({
  number,
  emoji,
  title,
  description,
  delay = 0,
  fromLeft = true,
}: {
  number: string
  emoji: string
  title: string
  description: string
  delay?: number
  fromLeft?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay }}
      className="text-center relative py-8"
    >
      <span
        className="text-[120px] font-black leading-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 opacity-20 select-none pointer-events-none"
        style={{ color: "#BB00FF" }}
      >
        {number}
      </span>
      <motion.span
        className="text-6xl block mb-4 relative z-10"
        aria-hidden="true"
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {emoji}
      </motion.span>
      <h3 className="text-3xl font-bold text-black mb-3 relative z-10">{title}</h3>
      <p className="text-lg font-medium text-black/80 max-w-md mx-auto relative z-10">{description}</p>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// TICKER COMPONENT
// ═══════════════════════════════════════════════════════════════
function Ticker() {
  const content =
    "💝 RECEIVE SUPERLIKES DAILY • ✨ SHARE YOUR RECIPES • 🌹 GET THE APPRECIATION YOU DESERVE • 💖 FEEL VALUED EVERY DAY • 👑 CONNECT WITH FRIENDS • "

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-4 overflow-hidden z-50">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-white font-bold text-sm md:text-base mx-4">
            {content}
          </span>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// COUNTDOWN TIMER COMPONENT
// ═══════════════════════════════════════════════════════════════
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Imposta la data target a 30 giorni da ora
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-white border-2 border-black rounded-xl w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2">
        <span className="text-xl md:text-3xl font-black text-[#BB00FF]">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-gray-500">{label}</span>
    </div>
  );

  return (
    <motion.div
      className="flex justify-center flex-wrap mb-10 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function WavefulLanding() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un'email valida")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden pb-20">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-40 w-96 h-96 rounded-full opacity-5 blur-[100px]"
          style={{ background: "radial-gradient(circle, #BB00FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full opacity-5 blur-[100px]"
          style={{ background: "radial-gradient(circle, #BB00FF 0%, transparent 70%)" }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <AppIconLogo size={40} />
            <span className="text-xl font-bold text-black hidden sm:block">Waveful</span>
          </div>
          {/* CTA Button */}
          <motion.button
            onClick={scrollToWaitlist}
            className="bg-black text-white font-bold text-sm px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">Join Waitlist</span>
            <span className="sm:hidden">Join</span>
          </motion.button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] text-black mb-6 text-balance"
              >
                Finally, A Place Where You're <span style={{ color: "#BB00FF" }}>Appreciated</span> Every Day
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl font-medium text-black/80 mb-8 leading-relaxed max-w-xl"
              >
                Share your recipes, your talents, your moments. Receive Superlikes and genuine appreciation from a
                community that truly values you. Never feel invisible again.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-8"
              >
                <PillButton onClick={scrollToWaitlist} className="w-full sm:w-auto">
                  Start Earn From Home
                </PillButton>
                <button
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-lg font-semibold hover:underline transition-all w-full sm:w-auto text-center"
                  style={{ color: "#BB00FF" }}
                >
                  See How It Works ↓
                </button>
              </motion.div>

              {/* Social Proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm font-medium text-black/60"
              >
                Join 15,000+ women feeling appreciated
              </motion.p>
            </div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center min-h-[500px] lg:min-h-[600px]"
            >
              {/* Floating Emoji */}
              <FloatingEmoji emoji="💝" className="top-4 right-4 md:right-12 text-5xl md:text-6xl" delay={0} />
              <FloatingEmoji emoji="✨" className="top-12 left-4 md:left-8 text-4xl md:text-5xl" delay={0.5} />
              <FloatingEmoji emoji="🌹" className="bottom-20 right-0 md:right-8 text-4xl md:text-5xl" delay={1} />
              <FloatingEmoji emoji="👑" className="top-1/3 -left-2 md:left-0 text-3xl md:text-4xl" delay={1.5} />
              <FloatingEmoji emoji="⭐️" className="bottom-32 left-8 md:left-16 text-3xl" delay={2} />

              {/* Testimonial Chips */}
              <TestimonialChip text="I finally feel seen 💖" className="top-0 -left-4 lg:top-4 lg:left-0 text-xs lg:text-sm" delay={0.6} />
              <TestimonialChip
                text="The compliments I've been missing ✨"
                className="bottom-32 -right-4 lg:bottom-40 lg:right-0 text-xs lg:text-sm"
                delay={0.8}
              />

              {/* Phone */}
              <PhoneMockup />

              {/* Connecting Lines SVG - Hidden on mobile */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                style={{ zIndex: -1 }}
              >
                <motion.path
                  d="M 50 100 Q 100 200, 150 150 Q 200 100, 250 180"
                  stroke="#BB00FF"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VALUE PROPS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-black mb-4 text-balance"
            >
              Why <span style={{ color: "#BB00FF" }}>Thousands</span> of Women Choose Waveful
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-medium text-black/70"
            >
              Three reasons you'll feel appreciated every single day
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              emoji="💝"
              title="Daily Superlikes"
              description="Share your recipes, your crafts, your everyday moments. Receive genuine Superlikes and appreciation from people who truly value your talents and efforts."
              delay={0}
            />
            <ValueCard
              emoji="✨"
              title="Feel Valued"
              description="When life feels routine, Waveful reminds you that you're special. Check your Superlikes anytime and remember: you're appreciated more than you know."
              delay={0.15}
            />
            <ValueCard
              emoji="👥"
              title="Connect & Share"
              description="Share moments with friends, discover new connections, and build a circle of people who celebrate you. Never feel alone or bored again."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-black mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-medium text-black/70"
            >
              Three simple steps to daily appreciation
            </motion.p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            <Step
              number="01"
              emoji="📸"
              title="Share Your Moments"
              description="Post your favorite recipe, a photo of your home project, or any moment you're proud of. Your talents deserve to be seen and celebrated."
              delay={0}
              fromLeft={true}
            />
            <Step
              number="02"
              emoji="💝"
              title="Receive Superlikes"
              description="People who appreciate your efforts send you Superlikes. Check throughout the day to see who's recognizing and valuing what you share."
              delay={0.2}
              fromLeft={false}
            />
            <Step
              number="03"
              emoji="✨"
              title="Feel Appreciated"
              description="Build connections, receive daily compliments, and remember that you're valued. On Waveful, you're never invisible or taken for granted."
              delay={0.4}
              fromLeft={true}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WAITLIST CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="py-24 px-6 relative">
        {/* Decorative Background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-5 blur-[200px] pointer-events-none"
          style={{ background: "#BB00FF" }}
        />

        {/* Floating Emoji */}
        <FloatingEmoji emoji="💝" className="top-20 left-[10%] hidden md:block" delay={0} />
        <FloatingEmoji emoji="💖" className="top-32 right-[15%] hidden md:block" delay={0.5} />
        <FloatingEmoji emoji="✨" className="bottom-24 left-[20%] hidden md:block" delay={1} />
        <FloatingEmoji emoji="🌹" className="bottom-32 right-[10%] hidden md:block" delay={1.5} />
        <FloatingEmoji emoji="👑" className="top-1/2 right-[8%] hidden md:block" delay={2} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black text-black mb-6"
          >
            Ready to Feel <span style={{ color: "#BB00FF" }}>Appreciated</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg font-medium text-black/70 mb-10"
          >
            Join 15,000+ women already receiving daily Superlikes. Be first to experience the appreciation you deserve
            when we launch.
          </motion.p>

          {/* Countdown Timer */}
          <Countdown />

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-full px-8 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] inline-flex items-center gap-3"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl"
                >
                  💝
                </motion.span>
                <span className="text-lg font-bold text-black">You're in! Check your email 💝</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <motion.div
                  className={`flex items-center bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] h-16 pl-6 pr-2 ${error ? "animate-shake ring-2 ring-[#BB00FF]" : ""}`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-lg font-medium text-black placeholder:text-black/40 outline-none"
                    aria-label="Email address"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white font-bold text-sm sm:text-base px-4 sm:px-8 h-12 rounded-full whitespace-nowrap disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Loading...</span>
                      </span>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Start Earn From Home</span>
                        <span className="sm:hidden">Join</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
                {error && (
                  <p className="text-sm font-medium mt-3" style={{ color: "#BB00FF" }}>
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Privacy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-medium text-black/60 mt-6"
          >
            We respect your privacy. No spam, just launch updates and appreciation.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 border-t border-gray-100 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <AppIconLogo size={32} />
              <span className="font-bold text-black">Waveful</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 text-sm font-medium text-black/70">
              <a href="#" className="hover:text-black transition-colors">
                About
              </a>
              <span className="text-black/30">•</span>
              <a href="#" className="hover:text-black transition-colors">
                Privacy
              </a>
              <span className="text-black/30">•</span>
              <a href="#" className="hover:text-black transition-colors">
                Terms
              </a>
              <span className="text-black/30">•</span>
              <a href="#" className="hover:text-black transition-colors">
                Contact
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm font-medium text-black/50">© 2026 Waveful</p>
          </div>
        </div>
      </footer>

      {/* Ticker */}
      <Ticker />
    </main>
  )
}
