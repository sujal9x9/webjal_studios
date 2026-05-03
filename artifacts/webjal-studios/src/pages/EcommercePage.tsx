import { motion } from "framer-motion";
import { Link } from "wouter";

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white font-sans selection:bg-[#8B5CF6] selection:text-white">
      <nav className="fixed w-full z-50 bg-[#090909]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
            URBAN <span className="text-[#8B5CF6]">THREADS</span>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-wider text-gray-400">
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all">Shop All</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all">New Arrivals</a>
            <a href="#" className="text-[#EC4899] hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-all">Sale</a>
            <Link href="/" className="hover:text-white transition-colors">Portfolio ↗</Link>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#8B5CF6] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold">
              2
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#EC4899]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-12 md:p-24 relative overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1550614000-4b95d4ed89ce?q=80&w=2070')] bg-cover bg-center opacity-50 grayscale mix-blend-screen" />
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-20 max-w-xl"
            >
              <div className="inline-block px-4 py-1 rounded-full border border-[#EC4899]/50 text-[#EC4899] text-xs font-bold uppercase tracking-widest mb-6">
                Drop 004 // Live Now
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
                Streetwear <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">Reimagined</span>
              </h1>
              <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-[#8B5CF6] hover:text-white transition-colors rounded-sm">
                Shop Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-white flex items-center gap-4">
            New Arrivals <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Cyber Punk Jacket", price: "$149", rating: "4.8" },
              { title: "Neon Graffiti Hoodie", price: "$89", rating: "4.9" },
              { title: "Urban Tech Cargo", price: "$110", rating: "4.7" },
              { title: "Reflective Sling Bag", price: "$65", rating: "4.8" }
            ].map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group relative bg-[#111] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/50 transition-colors"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#8B5CF6]/0 to-[#8B5CF6]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="aspect-square bg-[#1a1a1a] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="w-1/2 h-1/2 bg-white/5 rotate-45 transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-xs font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {product.rating}
                  </div>
                </div>
                <h3 className="font-bold mb-1 truncate">{product.title}</h3>
                <div className="text-gray-400 mb-4">{product.price}</div>
                <button className="w-full py-3 bg-white/5 hover:bg-[#8B5CF6] text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-colors border border-white/10 hover:border-transparent">
                  Add to Bag
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
