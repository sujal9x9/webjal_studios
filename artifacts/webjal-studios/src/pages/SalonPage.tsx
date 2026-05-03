import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const services = [
  { title: "Haircut & Blowout", desc: "Precision cuts tailored to your face shape, finished with a luxury blowout.", price: "from $85", duration: "60 min", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920" },
  { title: "Balayage & Color", desc: "Hand-painted color techniques using Olaplex-infused, damage-free formulas.", price: "from $180", duration: "120 min", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1920" },
  { title: "Keratin Treatment", desc: "Smoothing treatment that eliminates frizz and adds brilliant shine for up to 6 months.", price: "from $250", duration: "180 min", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1920" },
  { title: "Luxury Facial", desc: "Rejuvenating therapy with premium serums, LED light therapy and jade-roller massage.", price: "from $120", duration: "75 min", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1920" },
  { title: "Nail Artistry", desc: "Gel, acrylic, and bespoke nail art. Extensions, ombre, and seasonal collections.", price: "from $65", duration: "60 min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1920" },
  { title: "Bridal Package", desc: "Full-day pampering for the bride — hair, makeup, nails, and a glass of champagne.", price: "from $450", duration: "Full Day", img: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1920" },
];

const gallery = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1200",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
];

const stylists = [
  { name: "Isabella Rose", role: "Creative Director", exp: "12 yrs", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800" },
  { name: "Camille Duval", role: "Color Specialist", exp: "9 yrs", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800" },
  { name: "Aria Nakamura", role: "Bridal Expert", exp: "7 yrs", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" },
];

const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];
const dates = ["Mon May 5", "Tue May 6", "Wed May 7", "Thu May 8", "Fri May 9", "Sat May 10"];

export default function SalonPage() {
  const [tab, setTab] = useState<"services" | "gallery" | "team">("services");
  const [bookingService, setBookingService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden"
      onScroll={(e: any) => setScrolled(e.target.scrollTop > 60)}>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0b0914]/80 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-2xl tracking-[0.3em] text-[#8B5CF6] font-light" style={{ fontFamily: "Georgia, serif" }}>GLAMOUR</span>
            <span className="text-[9px] tracking-[0.5em] text-gray-400 uppercase mt-0.5">Beauty Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm tracking-[0.12em]">
            {(["services", "gallery", "team"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`capitalize transition-colors ${tab === t ? "text-[#8B5CF6]" : "text-gray-400 hover:text-white"}`}>
                {t}
              </button>
            ))}
              <Link href="/" className="text-gray-500 hover:text-[#8B5CF6] transition-colors text-xs tracking-widest">Portfolio ←</Link>
            <button onClick={() => { setBookingService(0); setBookingStep(1); }}
              className="px-6 py-3 border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all duration-300 text-xs tracking-[0.2em] uppercase">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=2560&auto=format&fit=crop"
          alt="Salon" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full pt-20">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-xl">
              <p className="text-[#C084FC] tracking-[0.5em] uppercase text-xs mb-8 flex items-center gap-3">
                <span className="w-10 h-px bg-[#8B5CF6]" />Luxury Beauty Since 2012
              </p>
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-[1.1]" style={{ fontFamily: "Georgia, serif" }}>
                Where Beauty<br />Becomes <span className="italic text-[#8B5CF6]">Art</span>
              </h1>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">
                Sophisticated artistry meets unparalleled relaxation. Every visit is a transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => { setBookingService(0); setBookingStep(1); }}
                  className="px-8 py-4 bg-[#8B5CF6] text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium">
                  Book an Appointment
                </button>
                <button onClick={() => setTab("services")}
                  className="px-8 py-4 border border-white/20 text-white hover:border-[#C084FC] hover:text-[#C084FC] transition-all duration-300 text-sm tracking-[0.15em] uppercase">
                  Our Services
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Floating stats */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
          className="absolute bottom-16 right-16 hidden lg:flex flex-col gap-6">
          {[["2,000+", "Happy Clients"], ["98%", "Satisfaction"], ["10+", "Expert Stylists"]].map(([n, l]) => (
            <div key={l} className="text-right">
              <div className="text-3xl font-light text-[#C084FC]" style={{ fontFamily: "Georgia, serif" }}>{n}</div>
              <div className="text-xs text-gray-500 tracking-widest uppercase mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Tab Area */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex gap-8 border-b border-white/10 mb-16">
          {(["services", "gallery", "team"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
            className={`pb-4 text-sm tracking-[0.2em] uppercase transition-all capitalize relative ${tab === t ? "text-[#8B5CF6]" : "text-gray-500 hover:text-white"}`}>
              {t}
              {tab === t && <motion.div layoutId="salon-underline" className="absolute bottom-0 left-0 right-0 h-px bg-[#8B5CF6]" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "services" && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                  <motion.div key={i} whileHover={{ y: -6 }}
                    className="group overflow-hidden bg-[#111] border border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-500 rounded-2xl">
                    <div className="relative h-52 overflow-hidden">
                      <img src={s.img} alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-3 py-1 text-[#8B5CF6] text-xs tracking-widest">
                        {s.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-light text-[#8B5CF6] mb-2" style={{ fontFamily: "Georgia, serif" }}>{s.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5 font-light">{s.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-light">{s.price}</span>
                        <button onClick={() => { setBookingService(i); setBookingStep(1); }}
                          className="px-5 py-2.5 border border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black transition-all text-xs tracking-widest uppercase">
                          Book
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "gallery" && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {gallery.map((src, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-xl break-inside-avoid">
                    <img src={src} alt="" className="w-full object-cover hover:scale-105 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "team" && (
            <motion.div key="team" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stylists.map((s, i) => (
                  <motion.div key={i} whileHover={{ y: -8 }}
                    className="group text-center bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A96E]/30 transition-all">
                    <div className="relative h-72 overflow-hidden">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>{s.name}</h3>
                      <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-1">{s.role}</p>
                      <p className="text-gray-500 text-xs">{s.exp} experience</p>
                      <button onClick={() => { setBookingService(0); setBookingStep(1); }}
                        className="mt-5 w-full py-2.5 border border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all text-xs tracking-widest uppercase">
                        Book with {s.name.split(" ")[0]}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingService !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => { if (!bookingDone) setBookingService(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {bookingDone ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 border border-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#C9A96E] text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "Georgia, serif" }}>Appointment Confirmed</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {bookingForm.name}, your appointment for <b className="text-[#C9A96E]">{services[bookingService].title}</b> on <b>{selectedDate}</b> at <b>{selectedTime}</b> is confirmed.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">A confirmation has been sent to {bookingForm.email}</p>
                  <button onClick={() => { setBookingService(null); setBookingDone(false); setBookingStep(1); setSelectedDate(null); setSelectedTime(null); }}
                    className="mt-6 px-8 py-3 bg-[#C9A96E] text-black text-sm tracking-widest uppercase">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-1">Book Appointment</p>
                      <h3 className="text-xl font-light" style={{ fontFamily: "Georgia, serif" }}>{services[bookingService].title}</h3>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(step => (
                        <div key={step} className={`w-2 h-2 rounded-full ${bookingStep >= step ? "bg-[#C9A96E]" : "bg-white/10"}`} />
                      ))}
                    </div>
                  </div>

                  {bookingStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-sm mb-4 tracking-wide">Select a date</p>
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {dates.map(d => (
                          <button key={d} onClick={() => setSelectedDate(d)}
                            className={`py-3 text-xs tracking-wider border transition-all rounded-lg ${selectedDate === d ? "border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                      <button disabled={!selectedDate} onClick={() => setBookingStep(2)}
                        className="w-full py-3 bg-[#C9A96E] disabled:opacity-30 text-black text-sm tracking-widest uppercase transition-all">
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {bookingStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-sm mb-4 tracking-wide">Select a time — {selectedDate}</p>
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {times.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-3 text-xs tracking-wider border transition-all rounded-lg ${selectedTime === t ? "border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setBookingStep(1)} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors text-sm">Back</button>
                        <button disabled={!selectedTime} onClick={() => setBookingStep(3)}
                          className="flex-1 py-3 bg-[#C9A96E] disabled:opacity-30 text-black text-sm tracking-widest uppercase">
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-sm mb-4 tracking-wide">Your details</p>
                      <div className="space-y-3 mb-6">
                        <input value={bookingForm.name} onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                          type="text" placeholder="Full Name" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white text-sm outline-none focus:border-[#C9A96E] transition-colors placeholder:text-gray-600" />
                        <input value={bookingForm.email} onChange={e => setBookingForm({ ...bookingForm, email: e.target.value })}
                          type="email" placeholder="Email Address" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white text-sm outline-none focus:border-[#C9A96E] transition-colors placeholder:text-gray-600" />
                        <input value={bookingForm.phone} onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          type="tel" placeholder="Phone Number" className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 rounded-lg text-white text-sm outline-none focus:border-[#C9A96E] transition-colors placeholder:text-gray-600" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setBookingStep(2)} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors text-sm">Back</button>
                        <button disabled={!bookingForm.name || !bookingForm.email}
                          onClick={() => setBookingDone(true)}
                          className="flex-1 py-3 bg-[#C9A96E] disabled:opacity-30 text-black text-sm tracking-widest uppercase">
                          Confirm Booking
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="text-2xl tracking-[0.3em] text-[#C9A96E] font-light mb-1" style={{ fontFamily: "Georgia, serif" }}>GLAMOUR</div>
              <div className="text-[9px] tracking-[0.5em] text-gray-600 uppercase">Beauty Studio</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Where artistry meets luxury. Every client deserves a transformation that lasts. Est. 2012, Beverly Hills.</p>
            <div className="flex gap-3">
              {[
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>,
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
              ].map((icon, i) => (
                <button key={i} className="w-9 h-9 border border-[#C9A96E]/20 hover:border-[#C9A96E] hover:text-[#C9A96E] text-gray-600 flex items-center justify-center rounded-full transition-all duration-300">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs mb-6" style={{ fontFamily: "Georgia, serif" }}>Services</h4>
            <ul className="space-y-3">
              {["Haircut & Blowout", "Balayage & Color", "Keratin Treatment", "Luxury Facial", "Nail Artistry", "Bridal Package"].map(s => (
                <li key={s}>
                  <button onClick={() => setTab("services")} className="text-gray-500 hover:text-[#C9A96E] transition-colors text-sm tracking-wide">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs mb-6" style={{ fontFamily: "Georgia, serif" }}>Studio Hours</h4>
            <ul className="space-y-3 text-sm">
              {[["Monday", "Closed"], ["Tue – Fri", "9:00 AM – 7:00 PM"], ["Saturday", "9:00 AM – 8:00 PM"], ["Sunday", "10:00 AM – 5:00 PM"]].map(([day, hrs]) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="text-gray-500">{day}</span>
                  <span className={hrs === "Closed" ? "text-red-500/60" : "text-gray-600"}>{hrs}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
              <button onClick={() => { setBookingService(0); setBookingStep(1); }}
                className="w-full py-3 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all duration-300 text-xs tracking-[0.3em] uppercase">
                Book an Appointment
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs mb-6" style={{ fontFamily: "Georgia, serif" }}>Find Us</h4>
            <ul className="space-y-4 text-sm">
              {[
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: "42 Luxury Lane, Beverly Hills, CA 90210" },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.76 16.92"/></svg>, text: "+1 (310) 555-GLAM" },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "hello@glamourstudio.com" },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-[#C9A96E]/60 mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="text-gray-500">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-700 text-xs tracking-wide">&copy; {new Date().getFullYear()} Glamour Beauty Studio. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-700">
              {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map(l => (
                <button key={l} className="hover:text-gray-500 transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
