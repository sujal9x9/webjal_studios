import { motion } from "framer-motion";
import { Link } from "wouter";

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      <nav className="absolute w-full z-50 py-6 px-8 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl font-serif text-[#C8A951]">LUXE</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-[#C8A951] transition-colors">Listings</a>
          <a href="#" className="hover:text-[#C8A951] transition-colors">Developments</a>
          <a href="#" className="hover:text-[#C8A951] transition-colors">Services</a>
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">Portfolio ←</Link>
        </div>
        <button className="px-6 py-2 border border-[#C8A951] text-[#C8A951] text-sm uppercase tracking-widest hover:bg-[#C8A951] hover:text-black transition-colors">
          Contact Agent
        </button>
      </nav>

      <header className="relative h-screen min-h-[700px] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075')] bg-cover bg-center" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4 mt-20"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-6 text-white drop-shadow-2xl">
            Extraordinary <br /> Homes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 tracking-widest uppercase mb-12">
            Elevate your lifestyle with Luxe Properties
          </p>

          <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 inline-flex flex-col md:flex-row gap-4 max-w-4xl w-full mx-auto">
            <input type="text" placeholder="Location or ZIP" className="bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#C8A951] text-white rounded w-full md:w-auto flex-1" />
            <select className="bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#C8A951] text-gray-400 rounded w-full md:w-auto flex-1">
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
            <select className="bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#C8A951] text-gray-400 rounded w-full md:w-auto flex-1">
              <option value="">Min Price</option>
              <option value="1M">$1,000,000</option>
              <option value="5M">$5,000,000</option>
            </select>
            <button className="bg-[#C8A951] text-black font-bold uppercase tracking-wider px-8 py-3 rounded hover:bg-white transition-colors">
              Search
            </button>
          </div>
        </motion.div>
      </header>

      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl font-serif mb-2">Featured Collection</h2>
            <p className="text-gray-400">Exclusive listings curated for you</p>
          </div>
          <button className="text-[#C8A951] uppercase tracking-widest text-sm hover:text-white transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { price: "$12,500,000", title: "Modern Estate, Bel Air", beds: 5, baths: 7, sqft: "8,500" },
            { price: "$8,950,000", title: "Oceanfront Villa, Miami", beds: 4, baths: 5, sqft: "6,200" },
            { price: "$18,000,000", title: "Penthouse, Manhattan", beds: 3, baths: 4, sqft: "4,800" },
            { price: "$14,250,000", title: "Hillside Retreat, Malibu", beds: 6, baths: 8, sqft: "10,200" },
            { price: "$9,500,000", title: "Historic Townhouse, London", beds: 4, baths: 4, sqft: "5,100" },
            { price: "$22,000,000", title: "Private Island Estate, Bahamas", beds: 8, baths: 10, sqft: "15,000" }
          ].map((property, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium uppercase tracking-wider text-white border border-white/20">
                  Featured
                </div>
                <div className="w-full h-full bg-gray-800 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button className="w-full py-3 bg-[#C8A951] text-black text-sm uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif">{property.price}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{property.title}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-white/10 pt-4">
                <span className="flex items-center gap-1"><b className="text-white">{property.beds}</b> Beds</span>
                <span className="flex items-center gap-1"><b className="text-white">{property.baths}</b> Baths</span>
                <span className="flex items-center gap-1"><b className="text-white">{property.sqft}</b> Sq.Ft.</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
