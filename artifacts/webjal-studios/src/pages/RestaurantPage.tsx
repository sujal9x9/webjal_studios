import { motion } from "framer-motion";
import { Link } from "wouter";

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#f4f4f4] font-serif">
      <nav className="absolute w-full z-50 py-6 px-10 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl tracking-[0.2em] font-light text-[#C8A440]">SAVORIA</div>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-[#C8A440] transition-colors">Menu</a>
          <a href="#" className="hover:text-[#C8A440] transition-colors">Reservations</a>
          <a href="#" className="hover:text-[#C8A440] transition-colors">Our Story</a>
          <Link href="/" className="hover:text-white transition-colors">← Portfolio</Link>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-transparent to-[#111111] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
        
        <div className="relative z-20 text-center max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="text-[#C8A440] tracking-[0.3em] uppercase text-sm mb-6 block font-sans">Fine Dining</span>
            <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight">
              Culinary <br />
              <span className="italic text-[#C8A440]">Excellence</span>
            </h1>
            <button className="mt-8 px-10 py-4 border border-[#C8A440] text-[#C8A440] hover:bg-[#C8A440] hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-xs font-sans">
              Explore Our Menu
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-light mb-4">Signature Offerings</h2>
          <div className="w-12 h-px bg-[#C8A440] mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
          {[
            { cat: "Aperitifs", item: "Oysters & Champagne", desc: "Freshly shucked belon oysters served with vintage reserve champagne.", price: "$45" },
            { cat: "Entrées", item: "Truffle Risotto", desc: "Aquerello rice, aged parmesan, shaved white alba truffle.", price: "$38" },
            { cat: "Main Courses", item: "Wagyu Beef", desc: "A5 Japanese Wagyu, pomme purée, charred asparagus, red wine jus.", price: "$120" },
            { cat: "Desserts", item: "Chocolate Soufflé", desc: "Valrhona dark chocolate, madagascar vanilla bean ice cream.", price: "$24" }
          ].map((dish, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-[#C8A440] uppercase tracking-[0.2em] text-xs font-sans mb-4">{dish.cat}</div>
              <div className="flex justify-between items-baseline mb-3 border-b border-white/10 pb-3">
                <h3 className="text-2xl font-light">{dish.item}</h3>
                <span className="text-[#C8A440] font-sans text-sm">{dish.price}</span>
              </div>
              <p className="text-gray-500 font-sans font-light leading-relaxed text-sm">
                {dish.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
