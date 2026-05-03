import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const classes = [
  { name: "Power Lifting", time: "6:00 AM", trainer: "Marcus Cole", spots: 4, img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1920" },
  { name: "HIIT Blast", time: "8:00 AM", trainer: "Sarah Lane", spots: 6, img: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1920" },
  { name: "Yoga Flow", time: "10:00 AM", trainer: "Priya Shah", spots: 10, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920" },
  { name: "Spin Cycle", time: "5:30 PM", trainer: "Tom Reed", spots: 2, img: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1920" },
  { name: "Boxing", time: "7:00 PM", trainer: "Dante Vega", spots: 8, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920" },
  { name: "CrossFit RX", time: "7:00 AM", trainer: "Kelly Burns", spots: 0, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920" },
];

const trainers = [
  { name: "Marcus Cole", role: "Strength Coach", exp: "10 yrs", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800" },
  { name: "Sarah Lane", role: "HIIT Specialist", exp: "7 yrs", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800" },
  { name: "Priya Shah", role: "Yoga Instructor", exp: "8 yrs", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800" },
  { name: "Dante Vega", role: "Boxing Coach", exp: "12 yrs", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" },
];

const plans = [
  { name: "Starter", price: 49, features: ["Gym floor access", "Locker room", "2 Group classes/mo", "Fitness assessment"], popular: false },
  { name: "Elite", price: 99, features: ["Unlimited gym access", "All group classes", "1 PT session/mo", "Nutrition guide", "Sauna access"], popular: true },
  { name: "Pro", price: 149, features: ["Everything in Elite", "4 PT sessions/mo", "Custom meal plan", "Body composition scan", "Priority booking"], popular: false },
];

export default function GymPage() {
  const [tab, setTab] = useState<"classes" | "trainers" | "plans">("classes");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [bookingClass, setBookingClass] = useState<number | null>(null);
  const [bookedClasses, setBookedClasses] = useState<number[]>([]);
  const [trialModal, setTrialModal] = useState(false);
  const [trialForm, setTrialForm] = useState({ name: "", email: "", phone: "" });
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBook = (idx: number) => {
    if (classes[idx].spots === 0) return;
    setBookedClasses((prev) => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    setBookingClass(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FF5722] selection:text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black italic tracking-tighter text-[#FF5722]">IRONFIT</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
            {["classes", "trainers", "plans"].map(t => (
              <button key={t} onClick={() => setTab(t as any)}
                className={`transition-colors capitalize ${tab === t ? "text-[#FF5722]" : "hover:text-[#FF5722]"}`}>
                {t}
              </button>
            ))}
            <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Portfolio
            </Link>
            <button onClick={() => setTrialModal(true)}
              className="px-6 py-2 bg-[#FF5722] hover:bg-[#E53935] transition-colors text-white transform skew-x-[-10deg]">
              <span className="block transform skew-x-[10deg]">Free Trial</span>
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden md:hidden bg-[#0f0f0f] border-t border-white/10">
              <div className="flex flex-col gap-4 p-6">
                {["classes", "trainers", "plans"].map(t => (
                  <button key={t} onClick={() => { setTab(t as any); setMenuOpen(false); }}
                    className="text-left capitalize font-bold uppercase tracking-widest text-sm hover:text-[#FF5722] transition-colors">
                    {t}
                  </button>
                ))}
                <Link href="/" className="text-gray-400 text-sm">Back to Portfolio</Link>
                <button onClick={() => { setTrialModal(true); setMenuOpen(false); }}
                  className="w-full py-3 bg-[#FF5722] text-white font-bold uppercase tracking-widest">
                  Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-24 pt-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2560&auto=format&fit=crop"
          alt="Gym" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#FF5722] font-bold tracking-[0.4em] uppercase text-sm mb-4">No Excuses. Only Results.</p>
            <h1 className="text-7xl md:text-[10rem] leading-none font-black italic tracking-tighter uppercase mb-6">
              IRON<br/><span className="text-[#FF5722]">FIT</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl font-light">
              State-of-the-art equipment. Expert coaches. A community built on iron will.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setTrialModal(true)}
                className="px-8 py-4 bg-[#FF5722] hover:bg-white hover:text-black transition-all text-white font-black text-lg uppercase tracking-widest transform skew-x-[-10deg] shadow-lg shadow-[#FF5722]/30">
                <span className="block transform skew-x-[10deg]">Start Free Trial</span>
              </button>
              <button onClick={() => setTab("classes")}
                className="px-8 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all font-black text-lg uppercase tracking-widest transform skew-x-[-10deg]">
                <span className="block transform skew-x-[10deg]">Explore Classes</span>
              </button>
            </div>
          </motion.div>
          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-10">
            {[["5,000+", "Members"], ["40+", "Classes/Week"], ["15+", "Expert Trainers"], ["2", "Locations"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-4xl font-black text-[#FF5722]">{num}</div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Tab Switcher */}
        <div className="flex gap-1 bg-[#111] p-1 rounded-lg w-fit mb-16 border border-white/5">
          {(["classes", "trainers", "plans"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-8 py-3 rounded-md font-bold uppercase tracking-widest text-sm transition-all capitalize ${tab === t ? "bg-[#FF5722] text-white" : "text-gray-400 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "classes" && (
            <motion.div key="classes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls, i) => (
                  <motion.div key={i} whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 cursor-pointer bg-[#111]"
                    onClick={() => setSelectedClass(i)}>
                    <div className="relative h-56 overflow-hidden">
                      <img src={cls.img} alt={cls.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${cls.spots === 0 ? "bg-red-600 text-white" : cls.spots <= 3 ? "bg-yellow-500 text-black" : "bg-[#FF5722] text-white"}`}>
                        {cls.spots === 0 ? "Full" : `${cls.spots} spots`}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black uppercase tracking-tighter">{cls.name}</h3>
                        <span className="text-[#FF5722] font-bold text-sm">{cls.time}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-5">with {cls.trainer}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); if (cls.spots > 0) setBookingClass(i); }}
                        className={`w-full py-3 font-bold uppercase tracking-widest text-sm transition-all rounded-lg ${
                          bookedClasses.includes(i) ? "bg-green-600 text-white" :
                          cls.spots === 0 ? "bg-[#1a1a1a] text-gray-600 cursor-not-allowed" :
                          "bg-[#FF5722]/10 border border-[#FF5722]/40 text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                        }`}>
                        {bookedClasses.includes(i) ? "Booked" : cls.spots === 0 ? "Class Full" : "Book Class"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "trainers" && (
            <motion.div key="trainers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {trainers.map((trainer, i) => (
                  <motion.div key={i} whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/5">
                    <div className="relative h-72 overflow-hidden">
                      <img src={trainer.img} alt={trainer.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black tracking-tight">{trainer.name}</h3>
                      <p className="text-[#FF5722] text-sm font-bold uppercase tracking-widest mt-1">{trainer.role}</p>
                      <p className="text-gray-500 text-xs mt-1">{trainer.exp} experience</p>
                      <button className="mt-4 w-full py-2.5 border border-[#FF5722]/40 text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all font-bold uppercase tracking-widest text-xs rounded-lg">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "plans" && (
            <motion.div key="plans" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan, i) => (
                  <motion.div key={i} whileHover={{ y: -10 }}
                    className={`relative p-8 rounded-2xl border transition-all ${
                      plan.popular
                        ? "bg-gradient-to-b from-[#FF5722] to-[#E53935] border-transparent shadow-2xl shadow-[#FF5722]/30 md:-translate-y-4"
                        : selectedPlan === i
                          ? "bg-[#1a1a1a] border-[#FF5722]/50"
                          : "bg-[#111] border-white/5 hover:border-white/20"
                    }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full">
                        Most Popular
                      </div>
                    )}
                    <h3 className={`text-2xl font-black uppercase tracking-tighter mb-2 ${plan.popular ? "text-white" : "text-gray-300"}`}>{plan.name}</h3>
                    <div className={`text-6xl font-black italic mb-8 ${plan.popular ? "text-white" : "text-white"}`}>
                      ${plan.price}<span className={`text-xl not-italic font-normal ${plan.popular ? "text-white/60" : "text-gray-500"}`}>/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className={`flex items-center gap-3 text-sm font-medium ${plan.popular ? "text-white" : "text-gray-300"}`}>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${plan.popular ? "bg-black/20 text-white" : "bg-[#FF5722]/20 text-[#FF5722]"}`}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setSelectedPlan(i)}
                      className={`w-full py-4 font-black uppercase tracking-widest rounded-xl transition-all ${
                        plan.popular ? "bg-black text-white hover:bg-white hover:text-black" :
                        selectedPlan === i ? "bg-[#FF5722] text-white" :
                        "border-2 border-white/20 text-white hover:border-[#FF5722] hover:text-[#FF5722]"
                      }`}>
                      {selectedPlan === i ? "Selected" : "Choose Plan"}
                    </button>
                  </motion.div>
                ))}
              </div>
              {selectedPlan !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center">
                  <button onClick={() => setTrialModal(true)}
                    className="px-12 py-4 bg-[#FF5722] hover:bg-white hover:text-black transition-all text-white font-black uppercase tracking-widest rounded-xl text-lg shadow-lg shadow-[#FF5722]/30">
                    Get Started with {plans[selectedPlan].name}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Gallery Strip */}
      <section className="overflow-hidden py-16 border-t border-white/5">
        <div className="flex gap-4 animate-[scroll_40s_linear_infinite] w-max">
          {[
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800",
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800",
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
            "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800",
            "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800",
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800",
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="w-64 h-40 object-cover rounded-xl flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500" />
          ))}
        </div>
      </section>

      {/* Book Class Modal */}
      <AnimatePresence>
        {bookingClass !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setBookingClass(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{classes[bookingClass].name}</h3>
              <p className="text-gray-400 mb-6">{classes[bookingClass].time} · {classes[bookingClass].trainer}</p>
              <div className="space-y-4 mb-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-[#FF5722] transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-[#FF5722] transition-colors" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleBook(bookingClass)}
                  className="flex-1 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-black uppercase tracking-widest rounded-lg transition-colors">
                  Confirm Booking
                </button>
                <button onClick={() => setBookingClass(null)}
                  className="px-6 py-3 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free Trial Modal */}
      <AnimatePresence>
        {trialModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setTrialModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {trialSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#FF5722]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">You're In!</h3>
                  <p className="text-gray-400">Check your email for your free trial pass. Welcome to IronFit.</p>
                  <button onClick={() => { setTrialModal(false); setTrialSubmitted(false); }}
                    className="mt-6 px-8 py-3 bg-[#FF5722] text-white font-bold uppercase tracking-widest rounded-xl">Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">Start Your Free Trial</h3>
                  <p className="text-gray-400 text-sm mb-6">7 days free. No credit card required.</p>
                  <div className="space-y-4 mb-6">
                    <input value={trialForm.name} onChange={e => setTrialForm({ ...trialForm, name: e.target.value })}
                      type="text" placeholder="Full Name" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-[#FF5722] transition-colors" />
                    <input value={trialForm.email} onChange={e => setTrialForm({ ...trialForm, email: e.target.value })}
                      type="email" placeholder="Email Address" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-[#FF5722] transition-colors" />
                    <input value={trialForm.phone} onChange={e => setTrialForm({ ...trialForm, phone: e.target.value })}
                      type="tel" placeholder="Phone Number" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-[#FF5722] transition-colors" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setTrialSubmitted(true)}
                      className="flex-1 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-black uppercase tracking-widest rounded-lg transition-colors">
                      Claim Free Trial
                    </button>
                    <button onClick={() => setTrialModal(false)}
                      className="px-6 py-3 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white rounded-lg transition-colors">
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black italic text-[#FF5722]">IRONFIT</div>
          <p className="text-gray-500 text-sm uppercase tracking-widest">123 Fitness Blvd, Muscle City · Open 5AM - 11PM Daily</p>
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} IronFit Gym</p>
        </div>
      </footer>
    </div>
  );
}
