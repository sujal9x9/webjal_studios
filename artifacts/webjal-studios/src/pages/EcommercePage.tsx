import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const products = [
  { id: 1, title: "Oversized Cyber Jacket", price: 149, originalPrice: 199, tag: "New", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200", rating: 4.8, reviews: 124, sizes: ["XS","S","M","L","XL"] },
  { id: 2, title: "Neon Graffiti Hoodie", price: 89, originalPrice: null, tag: "Best Seller", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=1200", rating: 4.9, reviews: 238, sizes: ["S","M","L","XL","XXL"] },
  { id: 3, title: "Urban Tech Cargo", price: 110, originalPrice: 140, tag: "Sale", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200", rating: 4.7, reviews: 87, sizes: ["28","30","32","34","36"] },
  { id: 4, title: "Reflective Windbreaker", price: 165, originalPrice: null, tag: "New", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200", rating: 4.6, reviews: 53, sizes: ["S","M","L","XL"] },
  { id: 5, title: "Distressed Denim Set", price: 195, originalPrice: 250, tag: "Sale", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200", rating: 4.9, reviews: 312, sizes: ["XS","S","M","L","XL"] },
  { id: 6, title: "Tactical Sling Bag", price: 65, originalPrice: null, tag: null, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200", rating: 4.8, reviews: 177, sizes: ["One Size"] },
  { id: 7, title: "Graphic Band Tee", price: 45, originalPrice: null, tag: "Best Seller", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200", rating: 4.7, reviews: 441, sizes: ["XS","S","M","L","XL","XXL"] },
  { id: 8, title: "Platform Combat Boots", price: 210, originalPrice: 270, tag: "Sale", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200", rating: 4.8, reviews: 95, sizes: ["6","7","8","9","10","11"] },
];

interface CartItem { id: number; title: string; price: number; img: string; size: string; qty: number; }

export default function EcommercePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [quickView, setQuickView] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "confirm">("cart");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState<number | null>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addToCart = (product: typeof products[0], size: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, title: product.title, price: product.price, img: product.img, size, qty: 1 }];
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
    setQuickView(null);
    setSelectedSize(null);
  };

  const removeFromCart = (id: number, size: string) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  const updateQty = (id: number, size: string, delta: number) => setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const tags = ["All", "New", "Best Seller", "Sale"];
  const filtered = filter === "All" ? products : products.filter(p => p.tag === filter);
  const qv = quickView !== null ? products.find(p => p.id === quickView) : null;

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed w-full z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#8B5CF6]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-black italic tracking-tighter uppercase">
            URBAN <span className="text-[#8B5CF6]">THREADS</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`transition-all hover:text-white ${filter === t ? (t === "Sale" ? "text-[#EC4899]" : "text-white") : ""}`}>
                {t}
              </button>
            ))}
            <Link href="/" className="hover:text-white transition-colors">Portfolio ↗</Link>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/5 flex items-center justify-center hover:border-[#8B5CF6] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B5CF6] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative pt-20 h-[85vh] min-h-[600px] overflow-hidden flex items-center">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2560&auto=format&fit=crop"
          alt="Fashion" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute inset-0 mix-blend-color-burn bg-[#8B5CF6]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EC4899]/50 text-[#EC4899] text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 bg-[#EC4899] rounded-full animate-pulse" />
              Drop 004 — Live Now
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none mb-6">
              Street<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">wear</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 font-light">Redefining urban fashion. Limited drops. Zero compromises.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-[#8B5CF6] hover:text-white transition-all rounded-sm shadow-lg">
                Shop Collection
              </button>
              <button onClick={() => setFilter("Sale")}
                className="px-8 py-4 border-2 border-[#EC4899]/50 text-[#EC4899] hover:bg-[#EC4899]/10 font-black uppercase tracking-widest transition-all rounded-sm">
                Sale Items
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            {filter === "All" ? "All Products" : filter} <span className="text-gray-600 text-xl">({filtered.length})</span>
          </h2>
          <div className="flex gap-2 flex-wrap">
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === t ? (t === "Sale" ? "bg-[#EC4899] text-white" : "bg-[#8B5CF6] text-white") :
                  "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <motion.div key={product.id} layout whileHover={{ y: -4 }}
              className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#8B5CF6]/40 transition-all">
              <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => { setQuickView(product.id); setSelectedSize(null); }}>
                <img src={product.img} alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                {product.tag && (
                  <div className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                    product.tag === "Sale" ? "bg-[#EC4899] text-white" :
                    product.tag === "New" ? "bg-[#8B5CF6] text-white" :
                    "bg-white text-black"
                  }`}>{product.tag}</div>
                )}
                <button onClick={(e) => { e.stopPropagation(); setWishlist(prev => prev.includes(product.id) ? prev.filter(i => i !== product.id) : [...prev, product.id]); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? "#EC4899" : "none"} stroke={wishlist.includes(product.id) ? "#EC4899" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setQuickView(product.id); setSelectedSize(null); }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black text-[11px] font-black uppercase tracking-wider rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Quick View
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 truncate">{product.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[10px]">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white">${product.price}</span>
                    {product.originalPrice && <span className="text-gray-500 text-xs line-through">${product.originalPrice}</span>}
                  </div>
                  <button onClick={() => { setQuickView(product.id); setSelectedSize(null); }}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                      added === product.id ? "bg-green-600 text-white" : "bg-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
                    }`}>
                    {added === product.id ? "Added!" : "Add"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {qv && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setQuickView(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl grid md:grid-cols-2"
              onClick={e => e.stopPropagation()}>
              <div className="relative aspect-square md:aspect-auto overflow-hidden">
                <img src={qv.img} alt={qv.title} className="w-full h-full object-cover" />
                {qv.tag && (
                  <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${
                    qv.tag === "Sale" ? "bg-[#EC4899] text-white" : qv.tag === "New" ? "bg-[#8B5CF6] text-white" : "bg-white text-black"
                  }`}>{qv.tag}</div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-gray-400 hover:text-white">✕</button>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.floor(qv.rating) ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                    <span className="text-gray-400 text-xs">{qv.rating} · {qv.reviews} reviews</span>
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{qv.title}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black">${qv.price}</span>
                    {qv.originalPrice && <span className="text-gray-500 text-lg line-through">${qv.originalPrice}</span>}
                    {qv.originalPrice && <span className="text-[#EC4899] text-sm font-bold">-{Math.round((1 - qv.price / qv.originalPrice) * 100)}% OFF</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Select Size</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {qv.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-bold transition-all ${
                          selectedSize === size ? "border-[#8B5CF6] bg-[#8B5CF6] text-white" : "border-white/20 text-gray-300 hover:border-white/50"
                        }`}>{size}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <button onClick={() => selectedSize && addToCart(qv, selectedSize)}
                    disabled={!selectedSize}
                    className="w-full py-4 bg-[#8B5CF6] disabled:opacity-30 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest rounded-xl transition-all">
                    {selectedSize ? `Add to Cart — $${qv.price}` : "Select a Size"}
                  </button>
                  <button onClick={() => setQuickView(null)}
                    className="w-full py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors text-sm">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => { setCartOpen(false); setCheckoutStep("cart"); }} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  {checkoutStep === "cart" ? `Cart (${cartCount})` : checkoutStep === "checkout" ? "Checkout" : "Order Confirmed"}
                </h2>
                <button onClick={() => { setCartOpen(false); setCheckoutStep("cart"); }} className="text-gray-400 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {checkoutStep === "cart" && (
                  <div className="p-4 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-16 text-gray-500">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 opacity-30"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                        <p className="text-sm">Your cart is empty</p>
                        <button onClick={() => setCartOpen(false)} className="mt-4 text-[#8B5CF6] text-sm font-bold hover:underline">Continue Shopping</button>
                      </div>
                    ) : cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-3 bg-[#111] rounded-xl p-3 border border-white/5">
                        <img src={item.img} alt={item.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{item.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5">Size: {item.size}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg border border-white/10">
                              <button onClick={() => updateQty(item.id, item.size, -1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white">−</button>
                              <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.size, 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white">+</button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm">${item.price * item.qty}</span>
                              <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-600 hover:text-red-400 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {checkoutStep === "checkout" && (
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <input type="text" placeholder="Full Name" className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                      <input type="email" placeholder="Email" className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                      <input type="text" placeholder="Shipping Address" className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                      <input type="text" placeholder="Card Number (demo)" className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                        <input type="text" placeholder="CVV" className="bg-[#111] border border-white/10 px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-gray-600" />
                      </div>
                    </div>
                    <div className="bg-[#111] rounded-xl p-4 border border-white/5 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>${cartTotal}</span></div>
                      <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400">Free</span></div>
                      <div className="flex justify-between font-black text-white border-t border-white/10 pt-2 mt-2"><span>Total</span><span>${cartTotal}</span></div>
                    </div>
                  </div>
                )}

                {checkoutStep === "confirm" && (
                  <div className="p-6 text-center py-16">
                    <div className="w-16 h-16 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <h3 className="text-xl font-black uppercase mb-2">Order Placed!</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Your order has been confirmed. Check your email for tracking info.</p>
                    <p className="text-[#8B5CF6] font-bold mt-2">Total: ${cartTotal}</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && checkoutStep !== "confirm" && (
                <div className="p-6 border-t border-white/10 space-y-3">
                  {checkoutStep === "cart" && (
                    <>
                      <div className="flex justify-between font-black text-lg">
                        <span>Total</span><span>${cartTotal}</span>
                      </div>
                      <button onClick={() => setCheckoutStep("checkout")}
                        className="w-full py-4 bg-[#8B5CF6] hover:bg-white hover:text-black text-white font-black uppercase tracking-widest rounded-xl transition-all">
                        Checkout
                      </button>
                    </>
                  )}
                  {checkoutStep === "checkout" && (
                    <div className="flex gap-3">
                      <button onClick={() => setCheckoutStep("cart")} className="px-4 py-4 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors text-sm">Back</button>
                      <button onClick={() => { setCheckoutStep("confirm"); setCart([]); }}
                        className="flex-1 py-4 bg-[#8B5CF6] hover:bg-green-500 text-white font-black uppercase tracking-widest rounded-xl transition-all">
                        Place Order — ${cartTotal}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {checkoutStep === "confirm" && (
                <div className="p-6 border-t border-white/10">
                  <button onClick={() => { setCartOpen(false); setCheckoutStep("cart"); }}
                    className="w-full py-4 bg-[#8B5CF6] text-white font-black uppercase tracking-widest rounded-xl">
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="bg-[#050505] border-t border-[#8B5CF6]/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black italic tracking-tighter uppercase mb-3">
              URBAN <span className="text-[#8B5CF6]">THREADS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Redefining urban fashion. Limited drops, exclusive cuts, zero compromises. Wear the streets.</p>
            <div className="flex gap-3">
              {[
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>,
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
              ].map((icon, i) => (
                <button key={i} className="w-9 h-9 border border-[#8B5CF6]/20 hover:border-[#8B5CF6] hover:text-[#8B5CF6] text-gray-600 flex items-center justify-center rounded-lg transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Shop</h4>
            <ul className="space-y-3">
              {[["All Products", "All"], ["New Arrivals", "New"], ["Best Sellers", "Best Seller"], ["Sale Items", "Sale"]].map(([label, f]) => (
                <li key={label}>
                  <button onClick={() => setFilter(f)} className="text-gray-500 hover:text-[#8B5CF6] transition-colors text-sm">
                    {label}
                  </button>
                </li>
              ))}
              {["Gift Cards", "Lookbook", "Collaborations"].map(l => (
                <li key={l}><button className="text-gray-500 hover:text-[#8B5CF6] transition-colors text-sm">{l}</button></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Info</h4>
            <ul className="space-y-3">
              {["About Us", "Sustainability", "Size Guide", "Shipping & Returns", "FAQ", "Careers"].map(l => (
                <li key={l}><button className="text-gray-500 hover:text-[#8B5CF6] transition-colors text-sm">{l}</button></li>
              ))}
            </ul>
          </div>

          {/* Perks + Contact */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">We Got You</h4>
            <ul className="space-y-4 mb-8">
              {[
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>, label: "Free returns", sub: "On all orders" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, label: "Fast shipping", sub: "2–5 business days" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "Secure checkout", sub: "256-bit SSL" },
              ].map(({ icon, label, sub }) => (
                <li key={label} className="flex gap-3 items-start">
                  <span className="text-[#8B5CF6] mt-0.5 flex-shrink-0">{icon}</span>
                  <div>
                    <div className="text-gray-300 text-sm font-bold">{label}</div>
                    <div className="text-gray-600 text-xs">{sub}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-gray-600 text-xs mb-2 uppercase tracking-widest">Contact</p>
              <p className="text-gray-500 text-sm">support@urbanthreads.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} Urban Threads. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-700">
              {["Privacy", "Terms", "Accessibility"].map(l => (
                <button key={l} className="hover:text-gray-500 transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
