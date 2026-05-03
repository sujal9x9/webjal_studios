import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const menuCategories = ["Starters", "Mains", "Desserts", "Drinks"];

const menuItems: Record<string, { name: string; desc: string; price: string; img: string; vegetarian?: boolean; signature?: boolean }[]> = {
  Starters: [
    { name: "Oysters & Champagne", desc: "Freshly shucked belon oysters, mignonette, charcoal water ice, reserve champagne.", price: "$45", img: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=800", signature: true },
    { name: "Burrata Garden", desc: "Buffalo burrata, heirloom tomatoes, basil oil, aged balsamic, truffle salt.", price: "$28", img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?q=80&w=800", vegetarian: true },
    { name: "Lobster Bisque", desc: "Silky bisque, Brittany lobster, tarragon cream, caviar garnish.", price: "$38", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800" },
    { name: "Tuna Tartare", desc: "Yellowfin tuna, avocado, sesame, ponzu, wonton crisps.", price: "$34", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800" },
  ],
  Mains: [
    { name: "A5 Wagyu Tenderloin", desc: "Japanese A5 Wagyu, pomme purée, charred asparagus, red wine jus.", price: "$120", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800", signature: true },
    { name: "White Truffle Risotto", desc: "Aquerello rice, aged parmigiano, shaved white Alba truffle, chive oil.", price: "$85", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800", vegetarian: true },
    { name: "Whole Dover Sole", desc: "Lemon butter, capers, haricots verts, amandine crust.", price: "$95", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800" },
    { name: "Duck Confit", desc: "24-hour duck leg, cherry reduction, dauphinoise potato, wilted spinach.", price: "$72", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800" },
  ],
  Desserts: [
    { name: "Dark Chocolate Soufflé", desc: "Valrhona 72% chocolate, Madagascar vanilla ice cream, hazelnut praline.", price: "$24", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800", signature: true },
    { name: "Crème Brûlée", desc: "Tahitian vanilla bean, caramelized sugar, fresh berries.", price: "$18", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=800", vegetarian: true },
    { name: "Tarte Tatin", desc: "Caramelized apple, buttery pastry, Calvados cream anglaise.", price: "$20", img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800" },
    { name: "Cheese Selection", desc: "Sommelier curated seasonal cheeses, honeycomb, walnuts, artisan crackers.", price: "$32", img: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=800" },
  ],
  Drinks: [
    { name: "Sommelier Pairing", desc: "Five wines expertly paired to match your tasting menu selections.", price: "$95", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800", signature: true },
    { name: "Champagne Flight", desc: "Three prestige cuvées — Krug, Dom Pérignon, and Salon Le Mesnil.", price: "$120", img: "https://images.unsplash.com/photo-1569596082827-c19be1d9f6e3?q=80&w=800" },
    { name: "Savoria Old Fashioned", desc: "Aged bourbon, house-made bitters, smoked orange peel, black sugar cube.", price: "$22", img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800" },
    { name: "Zero-Proof Garden", desc: "Seasonal botanicals, cucumber water, elderflower, sparkling kefir.", price: "$14", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800", vegetarian: true },
  ],
};

const times = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];
const dates = ["Fri May 9", "Sat May 10", "Sun May 11", "Mon May 12", "Tue May 13", "Wed May 14"];

export default function RestaurantPage() {
  const [menuTab, setMenuTab] = useState("Starters");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0e0c08] text-[#f0ebe3] font-sans selection:bg-[#C8A440] selection:text-black overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Nav */}
      <nav className="fixed w-full z-50 py-5 px-8 flex justify-between items-center" style={{ background: "linear-gradient(to bottom, rgba(14,12,8,0.95), transparent)" }}>
        <div className="flex flex-col leading-none">
          <span className="text-2xl tracking-[0.3em] font-light text-[#C8A440]">SAVORIA</span>
          <span className="text-[9px] tracking-[0.6em] text-gray-500 font-sans uppercase mt-0.5">Fine Dining</span>
        </div>
        <div className="hidden md:flex gap-10 text-xs font-sans uppercase tracking-[0.25em] text-gray-400">
          <button onClick={() => document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C8A440] transition-colors">Menu</button>
          <button onClick={() => setReservationOpen(true)} className="hover:text-[#C8A440] transition-colors">Reservations</button>
          <button onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#C8A440] transition-colors">Our Story</button>
          <Link href="/" className="hover:text-white transition-colors">Portfolio ←</Link>
        </div>
        <button onClick={() => setReservationOpen(true)}
          className="hidden md:block px-6 py-3 border border-[#C8A440]/60 text-[#C8A440] hover:bg-[#C8A440] hover:text-black transition-all duration-500 text-xs font-sans tracking-[0.25em] uppercase">
          Reserve a Table
        </button>
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2560&auto=format&fit=crop"
          alt="Restaurant" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,12,8,0.5) 0%, rgba(14,12,8,0.3) 40%, rgba(14,12,8,0.95) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-center max-w-2xl px-6">
            <p className="text-[#C8A440] tracking-[0.6em] uppercase text-xs mb-6 font-sans flex items-center justify-center gap-4">
              <span className="w-10 h-px bg-[#C8A440]" />Est. 1998, Paris<span className="w-10 h-px bg-[#C8A440]" />
            </p>
            <h1 className="text-6xl md:text-9xl font-light mb-6 leading-none">
              Culinary<br/><span className="italic text-[#C8A440]">Excellence</span>
            </h1>
            <p className="text-gray-400 text-lg font-sans font-light mb-12 leading-relaxed max-w-md mx-auto">
              Where each dish is a brushstroke of flavour on a canvas of impeccable craft.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => setReservationOpen(true)}
                className="px-10 py-4 bg-[#C8A440] text-black hover:bg-white transition-all duration-500 font-sans uppercase tracking-[0.2em] text-xs">
                Reserve a Table
              </button>
              <button onClick={() => document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 border border-white/20 hover:border-[#C8A440] hover:text-[#C8A440] transition-all duration-500 font-sans uppercase tracking-[0.2em] text-xs">
                Explore Menu
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Awards Strip */}
      <section className="border-y border-white/10 py-6 bg-[#0a0800]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6">
          {[
            ["3 Michelin Stars", "2024"],
            ["World's Best 50", "#7"],
            ["James Beard Award", "Best Chef"],
            ["Wine Spectator", "Grand Award"],
          ].map(([award, year]) => (
            <div key={award} className="text-center">
              <div className="text-[#C8A440] text-xs tracking-[0.3em] uppercase font-sans">{award}</div>
              <div className="text-gray-500 text-xs tracking-widest font-sans mt-0.5">{year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu-section" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8A440] tracking-[0.5em] uppercase text-xs font-sans mb-4">Seasonal Menu</p>
          <h2 className="text-4xl md:text-6xl font-light">Chef's Selections</h2>
          <div className="w-16 h-px bg-[#C8A440] mx-auto mt-8" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-1 bg-[#111]/50 p-1 rounded-xl w-fit mx-auto mb-16 border border-white/5 flex-wrap">
          {menuCategories.map(cat => (
            <button key={cat} onClick={() => setMenuTab(cat)}
              className={`px-6 py-3 text-xs font-sans uppercase tracking-[0.2em] rounded-lg transition-all ${menuTab === cat ? "bg-[#C8A440] text-black" : "text-gray-400 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={menuTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems[menuTab].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -4 }}
                  className="group flex gap-5 bg-[#111]/50 border border-white/5 hover:border-[#C8A440]/30 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
                  onClick={() => setLightboxImg(item.img)}>
                  <div className="relative w-32 flex-shrink-0 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  <div className="py-5 pr-5 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.signature && <span className="text-[8px] font-sans uppercase tracking-widest text-[#C8A440] border border-[#C8A440]/40 px-2 py-0.5 rounded-full">Signature</span>}
                      {item.vegetarian && <span className="text-[8px] font-sans uppercase tracking-widest text-green-400 border border-green-400/40 px-2 py-0.5 rounded-full">Vegetarian</span>}
                    </div>
                    <h3 className="text-lg font-light mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs font-sans leading-relaxed mb-3">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#C8A440] font-sans font-medium">{item.price}</span>
                      <span className="text-[10px] font-sans text-gray-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* About / Story */}
      <section id="about-section" className="py-28 bg-[#0a0800] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000",
              "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000",
              "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
              "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000",
            ].map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-2xl cursor-pointer" onClick={() => setLightboxImg(src)}>
                <img src={src} alt="" className={`w-full object-cover ${i === 0 || i === 3 ? "h-48" : "h-32"} transition-transform duration-700 hover:scale-110`} />
              </motion.div>
            ))}
          </div>
          <div>
            <p className="text-[#C8A440] tracking-[0.5em] uppercase text-xs font-sans mb-6">Our Story</p>
            <h2 className="text-4xl font-light mb-6 leading-snug">A devotion to craft, <br /><span className="italic text-[#C8A440]">quarter century strong</span></h2>
            <p className="text-gray-400 text-sm font-sans leading-relaxed mb-4">
              Since opening our doors in Paris in 1998, Savoria has been a temple of gastronomy — a place where ingredients are treated as sacred, technique is perfected over years, and every guest is an honoured guest.
            </p>
            <p className="text-gray-500 text-sm font-sans leading-relaxed mb-8">
              Our Executive Chef, Laurent Moreau, blends classical French training with bold global influences, creating a cuisine that is simultaneously timeless and thrillingly new.
            </p>
            <button onClick={() => setReservationOpen(true)}
              className="px-8 py-4 border border-[#C8A440]/60 text-[#C8A440] hover:bg-[#C8A440] hover:text-black transition-all duration-500 font-sans uppercase tracking-[0.2em] text-xs">
              Join Us This Evening
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      <AnimatePresence>
        {reservationOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => { if (!confirmed) setReservationOpen(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0e0c08] border border-[#C8A440]/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {confirmed ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 border border-[#C8A440] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A440] text-2xl">✓</div>
                  <h3 className="text-2xl font-light mb-2">Reservation Confirmed</h3>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed mb-1">
                    <b className="text-[#C8A440]">{form.name}</b>, your table for <b>{guests}</b> on <b>{selectedDate}</b> at <b>{selectedTime}</b> is confirmed.
                  </p>
                  <p className="text-gray-500 text-xs font-sans">Confirmation sent to {form.email}</p>
                  <button onClick={() => { setReservationOpen(false); setConfirmed(false); setStep(1); setSelectedDate(null); setSelectedTime(null); }}
                    className="mt-6 px-8 py-3 bg-[#C8A440] text-black text-xs font-sans tracking-[0.2em] uppercase">Done</button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[#C8A440] text-xs font-sans tracking-[0.3em] uppercase mb-1">Make a Reservation</p>
                      <h3 className="text-xl font-light">Step {step} of 3</h3>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={`w-2 h-2 rounded-full transition-all ${step >= s ? "bg-[#C8A440]" : "bg-white/10"}`} />
                      ))}
                    </div>
                  </div>

                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-xs font-sans tracking-widest mb-3 uppercase">Number of guests</p>
                      <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-10 h-10 border border-white/20 rounded-full hover:border-[#C8A440] text-white flex items-center justify-center text-xl transition-colors">−</button>
                        <span className="text-4xl font-light text-[#C8A440] w-10 text-center">{guests}</span>
                        <button onClick={() => setGuests(g => Math.min(12, g + 1))} className="w-10 h-10 border border-white/20 rounded-full hover:border-[#C8A440] text-white flex items-center justify-center text-xl transition-colors">+</button>
                        <span className="text-gray-400 text-sm font-sans">guests</span>
                      </div>
                      <p className="text-gray-400 text-xs font-sans tracking-widest mb-3 uppercase">Select date</p>
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {dates.map(d => (
                          <button key={d} onClick={() => setSelectedDate(d)}
                            className={`py-3 text-xs font-sans tracking-wider border rounded-xl transition-all ${selectedDate === d ? "border-[#C8A440] bg-[#C8A440]/10 text-[#C8A440]" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                      <button disabled={!selectedDate} onClick={() => setStep(2)}
                        className="w-full py-3 bg-[#C8A440] disabled:opacity-30 text-black text-xs font-sans tracking-[0.2em] uppercase transition-all">
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-xs font-sans tracking-widest mb-3 uppercase">Select arrival time — {selectedDate}</p>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {times.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-3 text-xs font-sans tracking-wider border rounded-xl transition-all ${selectedTime === t ? "border-[#C8A440] bg-[#C8A440]/10 text-[#C8A440]" : "border-white/10 text-gray-400 hover:border-white/30"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-sans transition-colors">Back</button>
                        <button disabled={!selectedTime} onClick={() => setStep(3)}
                          className="flex-1 py-3 bg-[#C8A440] disabled:opacity-30 text-black text-xs font-sans tracking-[0.2em] uppercase">Continue</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                      <p className="text-gray-400 text-xs font-sans tracking-widest mb-3 uppercase">Your details</p>
                      <div className="space-y-3 mb-6">
                        {[
                          { key: "name", placeholder: "Full Name", type: "text" },
                          { key: "email", placeholder: "Email Address", type: "email" },
                          { key: "phone", placeholder: "Phone Number", type: "tel" },
                        ].map(field => (
                          <input key={field.key} value={(form as any)[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                            type={field.type} placeholder={field.placeholder}
                            className="w-full bg-[#1a1810] border border-white/10 px-4 py-3 rounded-xl text-white text-sm font-sans outline-none focus:border-[#C8A440] transition-colors placeholder:text-gray-600" />
                        ))}
                        <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                          placeholder="Special requests or dietary requirements..."
                          rows={3}
                          className="w-full bg-[#1a1810] border border-white/10 px-4 py-3 rounded-xl text-white text-sm font-sans outline-none focus:border-[#C8A440] transition-colors placeholder:text-gray-600 resize-none" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(2)} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-sans transition-colors">Back</button>
                        <button disabled={!form.name || !form.email}
                          onClick={() => setConfirmed(true)}
                          className="flex-1 py-3 bg-[#C8A440] disabled:opacity-30 text-black text-xs font-sans tracking-[0.2em] uppercase">
                          Confirm Reservation
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

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={lightboxImg} alt="" className="max-w-3xl w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
            <button className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#050400] py-12 border-t border-white/5 text-center font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-2xl tracking-[0.3em] text-[#C8A440] font-light" style={{ fontFamily: "Georgia, serif" }}>SAVORIA</span>
          <p className="text-gray-500 text-xs tracking-widest uppercase">12 Rue du Faubourg, Paris · Tue–Sat 7pm–11pm</p>
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Savoria Restaurant</p>
        </div>
      </footer>
    </div>
  );
}
