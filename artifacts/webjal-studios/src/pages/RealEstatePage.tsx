import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const properties = [
  {
    id: 1, price: "$12,500,000", title: "Modern Estate", location: "Bel Air, CA", beds: 5, baths: 7, sqft: "8,500", type: "House",
    tag: "Featured", status: "For Sale",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200",
    ],
    desc: "An extraordinary modern estate with panoramic city views, infinity pool, and smart home automation throughout. Designed by award-winning architect Foster & Partners.",
  },
  {
    id: 2, price: "$8,950,000", title: "Oceanfront Villa", location: "Miami Beach, FL", beds: 4, baths: 5, sqft: "6,200", type: "Villa",
    tag: "New", status: "For Sale",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    ],
    desc: "Direct oceanfront living with private beach access, dock for two yachts, and floor-to-ceiling glass walls capturing the Atlantic sunrise.",
  },
  {
    id: 3, price: "$18,000,000", title: "Penthouse Sky Residence", location: "Manhattan, NY", beds: 3, baths: 4, sqft: "4,800", type: "Penthouse",
    tag: "Exclusive", status: "For Sale",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200",
    ],
    desc: "The crown jewel of Central Park South. A full-floor penthouse with wraparound terrace, private elevator, and 360° views of Manhattan.",
  },
  {
    id: 4, price: "$14,250,000", title: "Hillside Retreat", location: "Malibu, CA", beds: 6, baths: 8, sqft: "10,200", type: "House",
    tag: "Featured", status: "For Sale",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1920",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200",
    ],
    desc: "A dramatic hillside sanctuary perched above the Pacific Coast Highway. Features a cinema, wine cellar, detached guest house, and resort-style gardens.",
  },
  {
    id: 5, price: "$9,500,000", title: "Georgian Townhouse", location: "Mayfair, London", beds: 4, baths: 4, sqft: "5,100", type: "Townhouse",
    tag: null, status: "For Sale",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1920",
    ],
    desc: "A meticulously restored Grade II listed Georgian townhouse in the heart of Mayfair. Original period features complemented by modern luxury finishes.",
  },
  {
    id: 6, price: "$22,000,000", title: "Private Island Estate", location: "Bahamas", beds: 8, baths: 10, sqft: "15,000", type: "Villa",
    tag: "Exclusive", status: "For Sale",
    img: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1920",
    imgs: [
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1920",
    ],
    desc: "An entirely private island in the Exumas — 22 acres of pristine white-sand beaches, helicopter pad, deep-water marina, and multiple villa residences.",
  },
];

const propertyTypes = ["All", "House", "Villa", "Penthouse", "Townhouse"];

export default function RealEstatePage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [contactModal, setContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = typeFilter === "All" ? properties : properties.filter(p => p.type === typeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-light tracking-[0.2em] text-[#C8A951]" style={{ fontFamily: "Georgia, serif" }}>LUXE</span>
            <span className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-1">Properties</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-gray-400">
            {propertyTypes.slice(1).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`transition-colors hover:text-[#C8A951] ${typeFilter === t ? "text-[#C8A951]" : ""}`}>{t}s</button>
            ))}
            <Link href="/" className="text-gray-500 hover:text-white transition-colors">Portfolio ←</Link>
          </div>
          <button onClick={() => setContactModal(true)}
            className="hidden md:block px-6 py-2.5 border border-[#C8A951] text-[#C8A951] text-xs uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-black transition-all duration-300">
            Contact Agent
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2560&auto=format&fit=crop"
          alt="Luxury Property" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.85) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            className="text-center max-w-4xl">
            <p className="text-[#C8A951] tracking-[0.6em] uppercase text-xs mb-6 flex items-center justify-center gap-4">
              <span className="w-10 h-px bg-[#C8A951]" />Exclusive Luxury Residences<span className="w-10 h-px bg-[#C8A951]" />
            </p>
            <h1 className="text-6xl md:text-9xl font-light mb-8 leading-none" style={{ fontFamily: "Georgia, serif" }}>
              Extraordinary<br /><span className="italic text-[#C8A951]">Homes</span>
            </h1>
            <p className="text-gray-400 text-lg mb-16 max-w-xl mx-auto leading-relaxed">
              Handpicked residences for the discerning few. From Manhattan penthouses to private island escapes.
            </p>
            <button onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-[#C8A951] text-black hover:bg-white transition-all duration-500 text-xs uppercase tracking-[0.3em] font-medium">
              View Collection
            </button>
          </motion.div>
        </div>
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
          <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
            <input type="text" placeholder="Search by location..." className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#C8A951] transition-colors placeholder:text-gray-500" />
            <select onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-400 text-sm outline-none focus:border-[#C8A951] transition-colors">
              {propertyTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
            </select>
            <select className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-400 text-sm outline-none focus:border-[#C8A951] transition-colors">
              <option>Any Price</option>
              <option>Under $10M</option>
              <option>$10M–$20M</option>
              <option>Over $20M</option>
            </select>
            <button className="px-8 py-3 bg-[#C8A951] text-black font-medium text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all flex-shrink-0">
              Search
            </button>
          </div>
        </motion.div>
      </section>

      {/* Listings */}
      <section id="listings" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl font-light mb-1" style={{ fontFamily: "Georgia, serif" }}>Featured Collection</h2>
            <p className="text-gray-500 text-sm">{filtered.length} exclusive properties</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all border ${typeFilter === t ? "bg-[#C8A951] text-black border-[#C8A951]" : "border-white/10 text-gray-400 hover:border-[#C8A951]/50 hover:text-[#C8A951]"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <motion.div key={property.id} layout whileHover={{ y: -6 }}
              className="group cursor-pointer bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C8A951]/30 transition-all duration-500"
              onClick={() => { setSelectedProperty(property); setActiveImg(0); }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={property.img} alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {property.tag && (
                  <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] rounded-full ${
                    property.tag === "Exclusive" ? "bg-[#C8A951] text-black" :
                    property.tag === "New" ? "bg-white text-black" : "bg-white/20 backdrop-blur text-white border border-white/30"
                  }`}>{property.tag}</div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-end p-5 opacity-0 group-hover:opacity-100">
                  <button className="w-full py-3 bg-[#C8A951] text-black text-xs font-medium uppercase tracking-[0.2em] rounded-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-2xl font-light text-[#C8A951]" style={{ fontFamily: "Georgia, serif" }}>{property.price}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] border border-white/20 text-gray-400 px-2 py-0.5 rounded-full">{property.type}</span>
                </div>
                <p className="text-white font-medium mb-1">{property.title}</p>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {property.location}
                </p>
                <div className="flex items-center gap-5 text-sm text-gray-500 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <b className="text-white">{property.beds}</b> beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/></svg>
                    <b className="text-white">{property.baths}</b> baths
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    <b className="text-white">{property.sqft}</b> sq.ft
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              {/* Image Carousel */}
              <div className="relative aspect-video overflow-hidden">
                <img src={selectedProperty.imgs[activeImg]} alt={selectedProperty.title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {selectedProperty.imgs.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProperty.imgs.map((_, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? "bg-[#C8A951] w-6" : "bg-white/40"}`} />
                    ))}
                  </div>
                )}
                {selectedProperty.imgs.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(i => (i - 1 + selectedProperty.imgs.length) % selectedProperty.imgs.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button onClick={() => setActiveImg(i => (i + 1) % selectedProperty.imgs.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedProperty(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {selectedProperty.tag && (
                      <span className="text-[10px] uppercase tracking-[0.2em] bg-[#C8A951] text-black px-3 py-1 rounded-full font-medium">{selectedProperty.tag}</span>
                    )}
                    <span className="text-[10px] uppercase tracking-[0.2em] border border-white/20 text-gray-400 px-3 py-1 rounded-full">{selectedProperty.type}</span>
                  </div>
                  <h2 className="text-3xl font-light mb-1" style={{ fontFamily: "Georgia, serif" }}>{selectedProperty.title}</h2>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {selectedProperty.location}
                  </p>
                  <p className="text-4xl font-light text-[#C8A951] mb-6" style={{ fontFamily: "Georgia, serif" }}>{selectedProperty.price}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{selectedProperty.desc}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[["Beds", selectedProperty.beds], ["Baths", selectedProperty.baths], ["Sq.Ft", selectedProperty.sqft]].map(([label, val]) => (
                      <div key={label as string} className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                        <div className="text-xl font-bold text-white">{val}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">Contact Agent</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" alt="Agent" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-white">James Ashford</p>
                        <p className="text-xs text-gray-500">Senior Luxury Consultant</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => { setSelectedProperty(null); setContactModal(true); setContactForm(f => ({ ...f, message: `I'm interested in ${selectedProperty.title} listed at ${selectedProperty.price}.` })); }}
                        className="w-full py-3 bg-[#C8A951] text-black text-xs uppercase tracking-[0.2em] font-medium rounded-xl hover:bg-white transition-all">
                        Request Private Tour
                      </button>
                      <button onClick={() => { setSelectedProperty(null); setContactModal(true); }}
                        className="w-full py-3 border border-[#C8A951]/40 text-[#C8A951] text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#C8A951]/10 transition-all">
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      Save
                    </button>
                    <button className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => { if (!contactSent) setContactModal(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {contactSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 border border-[#C8A951] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A951] text-2xl">✓</div>
                  <h3 className="text-xl font-light mb-2" style={{ fontFamily: "Georgia, serif" }}>Enquiry Sent</h3>
                  <p className="text-gray-400 text-sm">An agent will be in touch within 2 hours.</p>
                  <button onClick={() => { setContactModal(false); setContactSent(false); }}
                    className="mt-6 px-8 py-3 bg-[#C8A951] text-black text-xs uppercase tracking-[0.2em]">Done</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-light mb-6" style={{ fontFamily: "Georgia, serif" }}>Contact an Agent</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { key: "name", placeholder: "Full Name", type: "text" },
                      { key: "email", placeholder: "Email Address", type: "email" },
                      { key: "phone", placeholder: "Phone Number", type: "tel" },
                    ].map(field => (
                      <input key={field.key} value={(contactForm as any)[field.key]} onChange={e => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                        type={field.type} placeholder={field.placeholder}
                        className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#C8A951] transition-colors placeholder:text-gray-600" />
                    ))}
                    <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Message (optional)" rows={3}
                      className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#C8A951] transition-colors placeholder:text-gray-600 resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setContactModal(false)} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors text-sm">Cancel</button>
                    <button disabled={!contactForm.name || !contactForm.email} onClick={() => setContactSent(true)}
                      className="flex-1 py-3 bg-[#C8A951] disabled:opacity-30 text-black text-xs uppercase tracking-[0.2em] rounded-xl">
                      Send Enquiry
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-2xl font-light tracking-[0.2em] text-[#C8A951]" style={{ fontFamily: "Georgia, serif" }}>LUXE</span>
          <p className="text-gray-500 text-xs tracking-widest uppercase">The World's Most Exclusive Real Estate</p>
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Luxe Properties</p>
        </div>
      </footer>
    </div>
  );
}
