import { motion } from "framer-motion";
import { Link } from "wouter";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const borrowData = [
  { name: "Mon", count: 120 }, { name: "Tue", count: 150 }, { name: "Wed", count: 180 },
  { name: "Thu", count: 140 }, { name: "Fri", count: 210 }, { name: "Sat", count: 250 }, { name: "Sun", count: 190 }
];

const pieData = [
  { name: "Books", value: 45000 },
  { name: "E-Books", value: 12000 },
  { name: "Media", value: 5000 },
  { name: "Journals", value: 8000 }
];
const COLORS = ["#00BCD4", "#1565C0", "#8E24AA", "#009688"];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f1923] border-r border-gray-800 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 text-white font-bold text-xl">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00BCD4] to-[#1565C0] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            Bibliotech
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { name: "Dashboard", active: true },
            { name: "Catalog", active: false },
            { name: "Members", active: false },
            { name: "Circulation", active: false },
            { name: "Reports", active: false },
            { name: "Settings", active: false },
          ].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#00BCD4]/10 text-[#00BCD4]' : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-[#00BCD4]' : 'bg-transparent'}`} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Exit to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-[#0f1923] border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center bg-[#0d1117] rounded-md border border-gray-800 px-3 py-1.5 w-64 md:w-96 focus-within:border-[#00BCD4] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search books, authors, ISBN..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-600" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f1923]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-gray-700"></div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
            <p className="text-gray-500 text-sm">System status and key metrics for today.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Books", value: "45,821", trend: "+124 this week", color: "from-blue-500/20 to-blue-500/0", border: "border-blue-500/50" },
              { label: "Active Members", value: "12,305", trend: "+45 new", color: "from-cyan-500/20 to-cyan-500/0", border: "border-cyan-500/50" },
              { label: "Current Loans", value: "1,842", trend: "Steady", color: "from-emerald-500/20 to-emerald-500/0", border: "border-emerald-500/50" },
              { label: "Overdue Books", value: "119", trend: "-12 from yesterday", color: "from-red-500/20 to-red-500/0", border: "border-red-500/50" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-[#0f1923] p-5 rounded-xl border border-gray-800 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.color} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500`} />
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.border.replace('border-', 'bg-').replace('/50', '')}`} />
                  {stat.trend}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="bg-[#0f1923] p-6 rounded-xl border border-gray-800 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6">Borrowing Statistics</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={borrowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff' }} itemStyle={{ color: '#00BCD4' }} />
                    <Line type="monotone" dataKey="count" stroke="#00BCD4" strokeWidth={3} dot={{ fill: '#0f1923', stroke: '#00BCD4', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#00BCD4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-[#0f1923] p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">Resource Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f1923', borderColor: '#1f2937', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
