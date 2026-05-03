import { motion } from "framer-motion";
import { Link } from "wouter";

export default function SalonPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0d0d0d] text-white font-serif selection:bg-[#E8B4B8] selection:text-black"
    >
      <nav className="fixed w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl tracking-[0.2em] text-[#C9A96E] font-light">
            GLAMOUR
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm tracking-[0.15em] text-gray-300">
            <a href="#" className="hover:text-[#E8B4B8] transition-colors">Home</a>
            <a href="#" className="hover:text-[#E8B4B8] transition-colors">Services</a>
            <a href="#" className="hover:text-[#E8B4B8] transition-colors">Gallery</a>
            <a href="#" className="hover:text-[#E8B4B8] transition-colors">About Us</a>
            <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2">
              Back to Portfolio
            </Link>
            <button data-testid="btn-book-nav" className="px-6 py-3 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-black transition-all duration-300">
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h2 className="text-[#E8B4B8] tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-[#E8B4B8]" />
              Luxury Beauty Studio
            </h2>
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              Discover your <br />
              <span className="text-[#C9A96E] italic">ultimate beauty</span> <br />
              experience
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Where sophisticated artistry meets unparalleled relaxation in the heart of the city.
            </p>
            <button data-testid="btn-book-hero" className="px-8 py-4 bg-[#C9A96E] text-black hover:bg-white transition-colors tracking-[0.1em] text-sm uppercase">
              Discover Our Services
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8B4B8]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light mb-4">Signature Services</h2>
            <p className="text-[#C9A96E] tracking-[0.2em] text-sm uppercase">Elevate your style</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Haircut & Styling", desc: "Bespoke cuts and luxury styling tailored to your features.", price: "from $85" },
              { title: "Spa Treatments", desc: "Rejuvenating therapies using premium organic botanicals.", price: "from $120" },
              { title: "Makeup Artistry", desc: "Flawless application for your most important moments.", price: "from $95" }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group p-10 bg-white/[0.02] border border-white/[0.05] hover:border-[#E8B4B8]/40 backdrop-blur-sm transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#E8B4B8]/0 to-[#E8B4B8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-light mb-4 text-[#C9A96E]">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-sans font-light">{service.desc}</p>
                <div className="text-sm tracking-[0.1em] text-white/60 border-t border-white/10 pt-6 flex justify-between items-center">
                  <span>{service.price}</span>
                  <span className="text-[#E8B4B8] opacity-0 group-hover:opacity-100 transition-opacity">Book →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
