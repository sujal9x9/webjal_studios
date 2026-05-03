import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Link } from "wouter";
import ThreeBackground from "@/components/ThreeBackground";

// Import assets
import gymImg from "@assets/gym-website_1777794447699.png";
import salonImg from "@assets/salon-website_1777794447700.png";
import libraryImg from "@assets/library-management_1777794447699.png";
import restaurantImg from "@assets/restaurant-website_1777794447700.png";
import realestateImg from "@assets/realestate-website_1777794447700.png";
import ecommerceImg from "@assets/ecommerce-website_1777794447699.png";

const projects = [
  { id: 1, title: "IronFit Gym", category: "Websites", route: "/gym", image: gymImg },
  { id: 2, title: "Glamour Salon", category: "Websites", route: "/salon", image: salonImg },
  { id: 3, title: "LibraTrack", category: "Software", route: "/library", image: libraryImg },
  { id: 4, title: "Savoria Restaurant", category: "Websites", route: "/restaurant", image: restaurantImg },
  { id: 5, title: "Luxe Properties", category: "Websites", route: "/realestate", image: realestateImg },
  { id: 6, title: "Urban Threads", category: "E-commerce", route: "/ecommerce", image: ecommerceImg },
];

const MagneticButton = ({ children, className, onClick, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ type: "spring", stiffness: 80, damping: 20 }}
    className="mb-16 md:mb-24"
  >
    {subtitle && <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4">{subtitle}</p>}
    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">{title}</h2>
  </motion.div>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <ThreeBackground />
      
      {/* Navbar */}
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-bold font-serif tracking-tighter text-white">
            &lt;Webjal.Studios/&gt;
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {["Home", "About", "Services", "Portfolio", "Why Us", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <MagneticButton className="hidden md:block px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors text-sm font-bold text-white" data-testid="btn-nav-contact">
            Let's Talk
          </MagneticButton>
        </div>
      </motion.header>

      <main>
        {/* Hero */}
        <section id="home" className="relative min-h-screen flex items-center pt-20">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div style={{ y }} className="max-w-5xl">
              <h1 className="text-6xl md:text-[8rem] leading-[0.9] font-black font-serif tracking-tighter text-white mb-6 flex flex-wrap gap-x-4">
                {["We", "Build", "Digital", "Experiences"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 + 0.5 }}
                    className={word === "Digital" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-[length:200%_auto] animate-gradient" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-3xl text-gray-400 mb-12 font-light max-w-2xl"
              >
                Websites, Software & Creative Solutions
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-8 md:gap-16 items-center"
              >
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-bold text-white"><Counter to={150} />+</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest mt-2">Projects Done</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-bold text-white"><Counter to={98} />%</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest mt-2">Client Satisfaction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-bold text-white"><Counter to={5} />+</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest mt-2">Years Experience</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest writing-vertical-rl">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="py-32 bg-[#050505] relative z-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading subtitle="Who We Are" title="Crafting digital excellence with precision and passion." />
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-400 mb-8 leading-relaxed"
                >
                  We are a collective of designers, developers, and strategists based in Noida. We don't just build websites; we engineer digital ecosystems that drive growth and captivate audiences.
                </motion.p>
                <div className="space-y-6">
                  {["Innovation First", "Quality Assurance", "Client Focused"].map((item, i) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-white font-medium"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {[
                  { label: "Web Development", percent: 95 },
                  { label: "UI/UX Design", percent: 90 },
                  { label: "Software Development", percent: 88 }
                ].map((skill, i) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-2 text-white font-medium">
                      <span>{skill.label}</span>
                      <span>{skill.percent}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-32 relative z-20 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading subtitle="What We Do" title="Expertise that elevates your brand." />
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { num: "01", title: "Website Development", desc: "React / Next.js / Vue" },
                { num: "02", title: "E-commerce Development", desc: "Shopify / WooCommerce / Custom" },
                { num: "03", title: "Custom Software", desc: "SaaS / API / Cloud" },
                { num: "04", title: "UI/UX Design", desc: "Figma / Prototyping / Research" }
              ].map((service, i) => (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-10 bg-[#111] border border-white/5 rounded-2xl hover:bg-[#151515] transition-colors"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />
                  <div className="text-4xl font-serif text-white/20 mb-6 group-hover:text-white transition-colors">{service.num}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-32 bg-[#050505] relative z-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <SectionHeading subtitle="Selected Work" title="Our latest creations." />
              <div className="flex flex-wrap gap-4 pb-8">
                {["All", "Websites", "Software", "E-commerce"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    data-testid={`btn-filter-${cat.toLowerCase()}`}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#111] cursor-pointer border border-white/5"
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-3">{project.category}</span>
                    <h3 className="text-3xl font-serif font-bold text-white mb-6">{project.title}</h3>
                    <a href={project.route} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors" data-testid={`btn-view-${project.id}`}>
                      View Live Demo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" className="py-32 relative z-20">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <SectionHeading title="Why choose Webjal Studios?" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              {[
                { title: "Lightning Fast", val: "2x", sub: "Faster Delivery" },
                { title: "Modern Design", val: "100%", sub: "Custom Built" },
                { title: "Affordable", val: "40%", sub: "More Cost Effective" },
                { title: "Satisfaction", val: "98%", sub: "Happy Clients" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 md:p-8 rounded-2xl bg-[#111] border border-white/5 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</div>
                  <div className="text-white font-bold mb-1">{stat.title}</div>
                  <div className="text-xs text-gray-500 uppercase">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 bg-[#050505] relative z-20 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading subtitle="Get In Touch" title="Let's build something extraordinary together." />
                <div className="space-y-8 text-gray-400">
                  <div>
                    <h4 className="text-white font-bold mb-2">Email</h4>
                    <a href="mailto:webjalstudios@outlook.com" className="hover:text-blue-400 transition-colors">webjalstudios@outlook.com</a>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Location</h4>
                    <p>Noida Sector 62, UP, India</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Social</h4>
                    <div className="flex gap-4">
                      <a href="https://wa.me/917599508709" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a>
                      <a href="https://instagram.com/webjalstudios" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name</label>
                  <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email</label>
                  <input type="email" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Message</label>
                  <textarea rows={4} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <MagneticButton className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors" data-testid="btn-submit-contact">
                  Send Message
                </MagneticButton>
              </motion.form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black relative z-20 text-center text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        <p>© {new Date().getFullYear()} Webjal Studios. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          {["Home", "About", "Services", "Portfolio", "Why Us", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
