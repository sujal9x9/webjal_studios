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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#C9A96E] selection:text-black overflow-x-hidden"
      onScroll={(e: any) => setScrolled(e.target.scrollTop > 60)}>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-2xl tracking-[0.3em] text-[#C9A96E] font-light" style={{ fontFamily: "Georgia, serif" }}>GLAMOUR</span>
            <span className="text-[9px] tracking-[0.5em] text-gray-500 uppercase mt-0.5">Beauty Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm tracking-[0.12em]">
            {(["services", "gallery", "team"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`capitalize transition-colors ${tab === t ? "text-[#C9A96E]" : "text-gray-400 hover:text-white"}`}>
                {t}
              </button>
            ))}
            <Link href="/" className="text-gray-500 hover:text-white transition-colors text-xs tracking-widest">Portfolio ←</Link>
            <button onClick={() => { setBookingService(0); setBookingStep(1); }}
              className="px-6 py-3 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all duration-300 text-xs tracking-[0.2em] uppercase">
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
              <p className="text-[#E8B4B8] tracking-[0.5em] uppercase text-xs mb-8 flex items-center gap-3">
                <span className="w-10 h-px bg-[#E8B4B8]" />Luxury Beauty Since 2012
              </p>
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-[1.1]" style={{ fontFamily: "Georgia, serif" }}>
                Where Beauty<br />Becomes <span className="italic text-[#C9A96E]">Art</span>
              </h1>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">
                Sophisticated artistry meets unparalleled relaxation. Every visit is a transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => { setBookingService(0); setBookingStep(1); }}
                  className="px-8 py-4 bg-[#C9A96E] text-black hover:bg-white transition-all duration-300 text-sm tracking-[0.15em] uppercase font-medium">
                  Book an Appointment
                </button>
                <button onClick={() => setTab("services")}
                  className="px-8 py-4 border border-white/20 text-white hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 text-sm tracking-[0.15em] uppercase">
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
              <div className="text-3xl font-light text-[#C9A96E]" style={{ fontFamily: "Georgia, serif" }}>{n}</div>
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
              className={`pb-4 text-sm tracking-[0.2em] uppercase transition-all capitalize relative ${tab === t ? "text-[#C9A96E]" : "text-gray-500 hover:text-white"}`}>
              {t}
              {tab === t && <motion.div layoutId="salon-underline" className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E]" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "services" && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                  <motion.div key={i} whileHover={{ y: -6 }}
                    className="group overflow-hidden bg-[#111] border border-white/5 hover:border-[#C9A96E]/30 transition-all duration-500 rounded-2xl">
                    <div className="relative h-52 overflow-hidden">
                      <img src={s.img} alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-3 py-1 text-[#C9A96E] text-xs tracking-widest">
                        {s.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-light text-[#C9A96E] mb-2" style={{ fontFamily: "Georgia, serif" }}>{s.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5 font-light">{s.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-light">{s.price}</span>
                        <button onClick={() => { setBookingService(i); setBookingStep(1); }}
                          className="px-5 py-2.5 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all text-xs tracking-widest uppercase">
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

      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-2xl tracking-[0.3em] text-[#C9A96E] font-light" style={{ fontFamily: "Georgia, serif" }}>GLAMOUR</span>
          <p className="text-gray-500 text-xs tracking-widest uppercase">42 Luxury Lane, Beverly Hills · Tue–Sun 9am–7pm</p>
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Glamour Beauty Studio</p>
        </div>
      </footer>
    </div>
  );
}
