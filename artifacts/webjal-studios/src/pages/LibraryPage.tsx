import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const borrowData = [
  { name: "Mon", count: 120 }, { name: "Tue", count: 158 }, { name: "Wed", count: 183 },
  { name: "Thu", count: 141 }, { name: "Fri", count: 214 }, { name: "Sat", count: 252 }, { name: "Sun", count: 196 }
];
const genreData = [
  { name: "Fiction", value: 38 }, { name: "Science", value: 22 },
  { name: "History", value: 18 }, { name: "Tech", value: 14 }, { name: "Other", value: 8 }
];
const COLORS = ["#00BCD4", "#1565C0", "#8E24AA", "#009688", "#FF5722"];

const recentActivity = [
  { member: "Alice Chen", action: "Borrowed", book: "Project Hail Mary", time: "2 min ago", avatar: "AC" },
  { member: "Ravi Kumar", action: "Returned", book: "Sapiens", time: "8 min ago", avatar: "RK" },
  { member: "Maria Santos", action: "Reserved", book: "The Midnight Library", time: "15 min ago", avatar: "MS" },
  { member: "James Obi", action: "Overdue", book: "Atomic Habits", time: "2 days ago", avatar: "JO", overdue: true },
  { member: "Lily Zhao", action: "Borrowed", book: "Dune Messiah", time: "32 min ago", avatar: "LZ" },
  { member: "Tom Harris", action: "Returned", book: "The Power of Now", time: "1 hr ago", avatar: "TH" },
];

const books = [
  { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", isbn: "978-0593135204", copies: 3, available: 1, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400" },
  { title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", isbn: "978-0525559474", copies: 5, available: 3, img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400" },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", isbn: "978-0062316097", copies: 4, available: 0, img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", isbn: "978-0735211292", copies: 6, available: 2, img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400" },
  { title: "Dune Messiah", author: "Frank Herbert", genre: "Sci-Fi", isbn: "978-0593098233", copies: 2, available: 2, img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400" },
  { title: "Educated", author: "Tara Westover", genre: "Memoir", isbn: "978-0399590528", copies: 3, available: 1, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400" },
];

const members = [
  { name: "Alice Chen", id: "M-1042", plan: "Premium", borrowed: 3, overdue: 0, joined: "Jan 2023", avatar: "AC" },
  { name: "Ravi Kumar", id: "M-2381", plan: "Standard", borrowed: 1, overdue: 0, joined: "Mar 2022", avatar: "RK" },
  { name: "Maria Santos", id: "M-0819", plan: "Premium", borrowed: 5, overdue: 1, joined: "Jun 2021", avatar: "MS" },
  { name: "James Obi", id: "M-3347", plan: "Standard", borrowed: 2, overdue: 2, joined: "Nov 2023", avatar: "JO" },
  { name: "Lily Zhao", id: "M-4892", plan: "Student", borrowed: 2, overdue: 0, joined: "Sep 2024", avatar: "LZ" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { id: "catalog", label: "Catalog", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
  { id: "members", label: "Members", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: "activity", label: "Activity", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "reports", label: "Reports", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
];

export default function LibraryPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [addBookModal, setAddBookModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", isbn: "" });
  const [bookAdded, setBookAdded] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", plan: "Standard" });
  const [memberAdded, setMemberAdded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans flex overflow-x-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen z-40 w-60 bg-[#0f1923] border-r border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00BCD4] to-[#1565C0] flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            <span>Bibliotech</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeNav === item.id ? "bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/20" : "hover:bg-gray-800/60 text-gray-400 hover:text-white"}`}>
              {item.icon}
              {item.label}
              {item.id === "activity" && <span className="ml-auto w-5 h-5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-full flex items-center justify-center">4</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-gray-800/60 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Exit to Portfolio
          </Link>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-[#0f1923] border-b border-gray-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-400 hover:text-white mr-1" onClick={() => setSidebarOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="flex items-center bg-[#0d1117] rounded-lg border border-gray-800 px-3 py-1.5 w-48 md:w-80 focus-within:border-[#00BCD4] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 flex-shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveNav("catalog"); }}
                type="text" placeholder="Search books, members..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-600" />
              {searchQuery && <button onClick={() => setSearchQuery("")} className="text-gray-500 hover:text-white ml-1">✕</button>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors" onClick={() => setNotifications(0)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {notifications > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f1923]" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer border-2 border-gray-700">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            {/* DASHBOARD */}
            {activeNav === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-500 text-xs mt-0.5">System overview · Last updated just now</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setAddBookModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#00BCD4] rounded-lg text-xs font-medium hover:bg-[#00BCD4]/20 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add Book
                    </button>
                    <button onClick={() => setAddMemberModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1565C0]/20 border border-[#1565C0]/30 text-blue-400 rounded-lg text-xs font-medium hover:bg-[#1565C0]/30 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add Member
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Books", value: "45,821", trend: "+124 this week", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { label: "Active Members", value: "12,305", trend: "+45 new", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                    { label: "Current Loans", value: "1,842", trend: "Steady", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { label: "Overdue Books", value: "119", trend: "-12 from yesterday", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
                  ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      className={`bg-[#0f1923] p-5 rounded-xl border ${stat.border} relative overflow-hidden group cursor-default`}>
                      <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`} />
                      <p className="text-gray-400 text-xs font-medium mb-1">{stat.label}</p>
                      <h3 className={`text-2xl md:text-3xl font-bold text-white mb-1.5`}>{stat.value}</h3>
                      <p className={`text-xs ${stat.color} flex items-center gap-1`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />{stat.trend}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#0f1923] p-5 rounded-xl border border-gray-800 lg:col-span-2">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-bold text-white text-sm">Weekly Borrowing Activity</h3>
                      <select className="bg-gray-800 border border-gray-700 text-xs text-gray-400 px-2 py-1 rounded outline-none">
                        <option>This Week</option>
                        <option>Last Week</option>
                        <option>This Month</option>
                      </select>
                    </div>
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={borrowData} barSize={24}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                          <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: '#00BCD4' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                          <Bar dataKey="count" fill="#00BCD4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-[#0f1923] p-5 rounded-xl border border-gray-800">
                    <h3 className="font-bold text-white text-sm mb-5">Collection by Genre</h3>
                    <div className="h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={genreData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                            {genreData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 space-y-2">
                      {genreData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            <span className="text-gray-400">{item.name}</span>
                          </div>
                          <span className="text-gray-300 font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#0f1923] rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center p-5 border-b border-gray-800">
                    <h3 className="font-bold text-white text-sm">Recent Activity</h3>
                    <button onClick={() => setActiveNav("activity")} className="text-xs text-[#00BCD4] hover:underline">View All</button>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {recentActivity.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-800/30 transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.overdue ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/20"}`}>
                          {item.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{item.member}</p>
                          <p className="text-xs text-gray-500 truncate">{item.action}: <span className="text-gray-400">{item.book}</span></p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 ${
                          item.action === "Overdue" ? "bg-red-500/20 text-red-400" :
                          item.action === "Returned" ? "bg-emerald-500/20 text-emerald-400" :
                          item.action === "Reserved" ? "bg-purple-500/20 text-purple-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>{item.action}</span>
                        <span className="text-xs text-gray-600 hidden sm:block">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CATALOG */}
            {activeNav === "catalog" && (
              <motion.div key="catalog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-white">Book Catalog</h1>
                    <p className="text-gray-500 text-xs mt-0.5">{filteredBooks.length} books {searchQuery ? `matching "${searchQuery}"` : "in library"}</p>
                  </div>
                  <button onClick={() => setAddBookModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#00BCD4] rounded-lg text-xs font-medium hover:bg-[#00BCD4]/20 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Book
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredBooks.map((book, i) => (
                    <motion.div key={i} whileHover={{ y: -3 }}
                      className="bg-[#0f1923] border border-gray-800 rounded-xl overflow-hidden flex gap-4 p-4 hover:border-[#00BCD4]/30 transition-all">
                      <img src={book.img} alt={book.title} className="w-14 h-20 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{book.title}</h3>
                        <p className="text-gray-400 text-xs mt-0.5">{book.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/20 px-2 py-0.5 rounded-full">{book.genre}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${book.available === 0 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                            {book.available === 0 ? "All Borrowed" : `${book.available}/${book.copies} Available`}
                          </span>
                        </div>
                        <p className="text-gray-600 text-[10px] mt-1.5">ISBN: {book.isbn}</p>
                        <button className="mt-2 px-3 py-1.5 bg-gray-800 hover:bg-[#00BCD4]/20 hover:text-[#00BCD4] text-gray-300 rounded-lg text-xs transition-all">
                          Issue Book
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {filteredBooks.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-600">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-30"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                      <p className="text-sm">No books found for "{searchQuery}"</p>
                      <button onClick={() => setSearchQuery("")} className="mt-2 text-[#00BCD4] text-xs hover:underline">Clear search</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* MEMBERS */}
            {activeNav === "members" && (
              <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-white">Members</h1>
                    <p className="text-gray-500 text-xs mt-0.5">{members.length} registered members</p>
                  </div>
                  <button onClick={() => setAddMemberModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1565C0]/20 border border-[#1565C0]/30 text-blue-400 rounded-lg text-xs font-medium hover:bg-[#1565C0]/30 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Member
                  </button>
                </div>
                <div className="bg-[#0f1923] border border-gray-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">
                          <th className="text-left px-5 py-3 font-medium">Member</th>
                          <th className="text-left px-5 py-3 font-medium">ID</th>
                          <th className="text-left px-5 py-3 font-medium">Plan</th>
                          <th className="text-left px-5 py-3 font-medium">Borrowed</th>
                          <th className="text-left px-5 py-3 font-medium">Overdue</th>
                          <th className="text-left px-5 py-3 font-medium">Joined</th>
                          <th className="text-left px-5 py-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {members.map((member, i) => (
                          <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.overdue > 0 ? "bg-red-500/20 text-red-400" : "bg-[#00BCD4]/10 text-[#00BCD4]"}`}>{member.avatar}</div>
                                <span className="text-white text-sm font-medium">{member.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-gray-500 text-xs font-mono">{member.id}</td>
                            <td className="px-5 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                member.plan === "Premium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                                member.plan === "Student" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                "bg-gray-700 text-gray-300"
                              }`}>{member.plan}</span>
                            </td>
                            <td className="px-5 py-4 text-gray-300 text-sm">{member.borrowed}</td>
                            <td className="px-5 py-4">
                              {member.overdue > 0 ? <span className="text-red-400 font-medium text-sm">{member.overdue}</span> : <span className="text-emerald-400 text-sm">0</span>}
                            </td>
                            <td className="px-5 py-4 text-gray-500 text-xs">{member.joined}</td>
                            <td className="px-5 py-4">
                              <div className="flex gap-2">
                                <button className="text-xs px-2.5 py-1 bg-gray-800 hover:bg-[#00BCD4]/20 hover:text-[#00BCD4] text-gray-400 rounded-lg transition-colors">View</button>
                                <button className="text-xs px-2.5 py-1 bg-gray-800 hover:bg-blue-500/20 hover:text-blue-400 text-gray-400 rounded-lg transition-colors">Edit</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACTIVITY */}
            {activeNav === "activity" && (
              <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="text-xl font-bold text-white mb-6">Live Activity Feed</h1>
                <div className="bg-[#0f1923] border border-gray-800 rounded-xl divide-y divide-gray-800">
                  {recentActivity.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 p-5 hover:bg-gray-800/30 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${item.overdue ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/20"}`}>
                        {item.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">{item.member}</p>
                        <p className="text-xs text-gray-500">{item.action} <span className="text-gray-400">"{item.book}"</span></p>
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full flex-shrink-0 font-medium ${
                        item.action === "Overdue" ? "bg-red-500/20 text-red-400 border border-red-500/20" :
                        item.action === "Returned" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                        item.action === "Reserved" ? "bg-purple-500/20 text-purple-400 border border-purple-500/20" :
                        "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                      }`}>{item.action}</span>
                      <span className="text-xs text-gray-600 hidden md:block">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* REPORTS */}
            {activeNav === "reports" && (
              <motion.div key="reports" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h1 className="text-xl font-bold text-white mb-6">Reports & Analytics</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#0f1923] border border-gray-800 rounded-xl p-5">
                    <h3 className="font-bold text-white text-sm mb-5">Borrowing Trend</h3>
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={borrowData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                          <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: '#00BCD4' }} />
                          <Line type="monotone" dataKey="count" stroke="#00BCD4" strokeWidth={3} dot={{ fill: '#0f1923', stroke: '#00BCD4', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#00BCD4' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-[#0f1923] border border-gray-800 rounded-xl p-5">
                    <h3 className="font-bold text-white text-sm mb-5">Genre Distribution</h3>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={genreData} cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value">
                            {genreData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {genreData.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                          <span className="text-gray-400">{item.name}</span>
                          <span className="text-gray-300 ml-auto font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#0f1923] border border-gray-800 rounded-xl p-5 lg:col-span-2">
                    <h3 className="font-bold text-white text-sm mb-4">Export Reports</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Monthly Loans", "Member Activity", "Overdue Report", "Collection Summary"].map(rep => (
                        <button key={rep} className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-xs text-gray-300 hover:border-[#00BCD4]/40 hover:text-[#00BCD4] transition-all text-left">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2 opacity-60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          {rep}
                          <p className="text-gray-600 text-[10px] mt-1">Download PDF</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Book Modal */}
      <AnimatePresence>
        {addBookModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => { if (!bookAdded) setAddBookModal(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0f1923] border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {bookAdded ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-[#00BCD4]/10 border border-[#00BCD4]/30 rounded-full flex items-center justify-center mx-auto mb-3 text-[#00BCD4]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Book Added!</h3>
                  <p className="text-gray-400 text-sm">"{newBook.title}" has been added to the catalog.</p>
                  <button onClick={() => { setAddBookModal(false); setBookAdded(false); setNewBook({ title: "", author: "", genre: "", isbn: "" }); }}
                    className="mt-5 px-6 py-2.5 bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#00BCD4] rounded-lg text-sm hover:bg-[#00BCD4]/20 transition-colors">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-5">Add New Book</h3>
                  <div className="space-y-3 mb-5">
                    {[
                      { key: "title", placeholder: "Book Title" },
                      { key: "author", placeholder: "Author Name" },
                      { key: "genre", placeholder: "Genre (e.g. Fiction)" },
                      { key: "isbn", placeholder: "ISBN Number" },
                    ].map(field => (
                      <input key={field.key} value={(newBook as any)[field.key]} onChange={e => setNewBook({ ...newBook, [field.key]: e.target.value })}
                        type="text" placeholder={field.placeholder}
                        className="w-full bg-[#0d1117] border border-gray-700 px-4 py-2.5 rounded-lg text-white text-sm outline-none focus:border-[#00BCD4] transition-colors placeholder:text-gray-600" />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setAddBookModal(false)} className="px-4 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors text-sm">Cancel</button>
                    <button disabled={!newBook.title || !newBook.author} onClick={() => setBookAdded(true)}
                      className="flex-1 py-2.5 bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#00BCD4] disabled:opacity-30 rounded-lg text-sm font-medium hover:bg-[#00BCD4]/20 transition-colors">
                      Add to Catalog
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {addMemberModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => { if (!memberAdded) setAddMemberModal(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#0f1923] border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}>
              {memberAdded ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Member Registered!</h3>
                  <p className="text-gray-400 text-sm">{newMember.name} has been added as a {newMember.plan} member.</p>
                  <button onClick={() => { setAddMemberModal(false); setMemberAdded(false); setNewMember({ name: "", email: "", plan: "Standard" }); }}
                    className="mt-5 px-6 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-5">Register New Member</h3>
                  <div className="space-y-3 mb-5">
                    <input value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                      type="text" placeholder="Full Name"
                      className="w-full bg-[#0d1117] border border-gray-700 px-4 py-2.5 rounded-lg text-white text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600" />
                    <input value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                      type="email" placeholder="Email Address"
                      className="w-full bg-[#0d1117] border border-gray-700 px-4 py-2.5 rounded-lg text-white text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600" />
                    <select value={newMember.plan} onChange={e => setNewMember({ ...newMember, plan: e.target.value })}
                      className="w-full bg-[#0d1117] border border-gray-700 px-4 py-2.5 rounded-lg text-gray-300 text-sm outline-none focus:border-blue-500 transition-colors">
                      <option value="Student">Student</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setAddMemberModal(false)} className="px-4 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors text-sm">Cancel</button>
                    <button disabled={!newMember.name || !newMember.email} onClick={() => setMemberAdded(true)}
                      className="flex-1 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 disabled:opacity-30 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors">
                      Register Member
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
