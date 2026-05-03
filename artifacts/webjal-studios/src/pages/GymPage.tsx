import { motion } from "framer-motion";
import { Link } from "wouter";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function GymPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FF5722] selection:text-white"
    >
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black italic tracking-tighter text-[#FF5722]">
            IRONFIT
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-[#FF5722] transition-colors">Home</a>
            <a href="#" className="hover:text-[#FF5722] transition-colors">About</a>
            <a href="#" className="hover:text-[#FF5722] transition-colors">Classes</a>
            <a href="#" className="hover:text-[#FF5722] transition-colors">Schedule</a>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to Portfolio
            </Link>
            <button data-testid="btn-join" className="px-6 py-2 bg-[#FF5722] hover:bg-[#E53935] transition-colors text-white transform skew-x-[-10deg]">
              <span className="block transform skew-x-[10deg]">JOIN NOW</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-40" />
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-7xl md:text-[9rem] leading-none font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4">
              IRONFIT <br/> <span className="text-[#FF5722]">GYM</span>
            </h1>
            <p className="text-2xl md:text-4xl font-bold tracking-wider text-gray-300 uppercase mb-8 border-l-4 border-[#FF5722] pl-6">
              Transform Yourself
            </p>
            <div className="flex gap-4">
              <button data-testid="btn-hero-join" className="px-8 py-4 bg-[#FF5722] hover:bg-[#E53935] transition-colors text-white font-black text-xl uppercase tracking-widest transform skew-x-[-10deg]">
                <span className="block transform skew-x-[10deg]">Start Free Trial</span>
              </button>
              <button data-testid="btn-hero-explore" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-colors font-black text-xl uppercase tracking-widest transform skew-x-[-10deg]">
                <span className="block transform skew-x-[10deg]">Explore Classes</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Membership Plans</h2>
            <p className="text-gray-400 text-lg">No hidden fees. Cancel anytime.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#111] p-8 border border-white/5 transform skew-x-[-5deg]"
            >
              <div className="transform skew-x-[5deg]">
                <h3 className="text-2xl font-bold uppercase mb-2 text-gray-400">Basic</h3>
                <div className="text-5xl font-black italic mb-6">$49<span className="text-xl text-gray-500 not-italic">/mo</span></div>
                <ul className="space-y-4 mb-8 text-gray-300 font-medium">
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> Access to gym floor</li>
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> Locker room access</li>
                  <li className="flex items-center gap-3 opacity-50"><span>✖</span> Group classes</li>
                  <li className="flex items-center gap-3 opacity-50"><span>✖</span> Personal training</li>
                </ul>
                <button data-testid="btn-plan-basic" className="w-full py-4 border-2 border-white/20 hover:border-[#FF5722] hover:text-[#FF5722] transition-colors font-bold uppercase tracking-widest">Select Plan</button>
              </div>
            </motion.div>

            {/* Elite Plan */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gradient-to-b from-[#FF5722] to-[#E53935] p-8 transform skew-x-[-5deg] md:-translate-y-8 shadow-2xl shadow-[#FF5722]/20"
            >
              <div className="transform skew-x-[5deg]">
                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider mb-4">Most Popular</div>
                <h3 className="text-2xl font-bold uppercase mb-2">Elite</h3>
                <div className="text-6xl font-black italic mb-6">$99<span className="text-xl text-black/60 not-italic">/mo</span></div>
                <ul className="space-y-4 mb-8 font-medium">
                  <li className="flex items-center gap-3"><span className="text-black">✔</span> Access to gym floor</li>
                  <li className="flex items-center gap-3"><span className="text-black">✔</span> Locker room access</li>
                  <li className="flex items-center gap-3"><span className="text-black">✔</span> All group classes</li>
                  <li className="flex items-center gap-3 opacity-50"><span className="text-black">✖</span> Personal training</li>
                </ul>
                <button data-testid="btn-plan-elite" className="w-full py-4 bg-black hover:bg-white hover:text-black transition-colors text-white font-bold uppercase tracking-widest">Select Plan</button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-[#111] p-8 border border-white/5 transform skew-x-[-5deg]"
            >
              <div className="transform skew-x-[5deg]">
                <h3 className="text-2xl font-bold uppercase mb-2 text-[#FF5722]">Premium</h3>
                <div className="text-5xl font-black italic mb-6">$149<span className="text-xl text-gray-500 not-italic">/mo</span></div>
                <ul className="space-y-4 mb-8 text-gray-300 font-medium">
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> Access to gym floor</li>
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> Locker room access</li>
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> All group classes</li>
                  <li className="flex items-center gap-3"><span className="text-[#FF5722]">✔</span> 4 Personal training sessions</li>
                </ul>
                <button data-testid="btn-plan-premium" className="w-full py-4 border-2 border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-colors font-bold uppercase tracking-widest">Select Plan</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 text-center text-gray-500 font-medium uppercase tracking-widest text-sm">
        <p>© {new Date().getFullYear()} IRONFIT GYM. All rights reserved.</p>
        <p className="mt-2">123 Fitness Blvd, Muscle City</p>
      </footer>
    </motion.div>
  );
}
