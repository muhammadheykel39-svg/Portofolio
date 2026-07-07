import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Server, Network, Database, Layers, Play, Square, PlusCircle, 
  ShoppingCart, RefreshCw, Trash2, CheckCircle, Search, AlertCircle, 
  ArrowRight, ShieldAlert, Check, Copy, ChevronDown, ChevronUp, Globe 
} from 'lucide-react';
import { Language, translations, technicalProjects, ProjectData } from '../types';

interface ProjectsProps {
  currentLanguage: Language;
}

// -----------------------------------------------------------------
// SUB-SIMULATOR 1: SDN LOAD BALANCER
// -----------------------------------------------------------------
interface Packet {
  id: number;
  server: string;
  progress: number; // 0 to 100
  color: string;
}

function SDNLoadBalancerSimulator({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].projects.lb;
  const [isPlaying, setIsPlaying] = useState(false);
  const [trafficRate, setTrafficRate] = useState(2); // packets/s
  const [isAuto, setIsAuto] = useState(false);
  const [totalHandled, setTotalHandled] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [servers, setServers] = useState([
    { id: 'A', name: 'Server-A (Node 1)', load: 15, connections: 0, status: 'online' },
    { id: 'B', name: 'Server-B (Node 2)', load: 10, connections: 0, status: 'online' },
    { id: 'C', name: 'Server-C (Node 3)', load: 20, connections: 0, status: 'online' }
  ]);

  const packetCounterRef = useRef(0);
  const requestIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Decays server loads over time to simulate completed jobs
  useEffect(() => {
    const timer = setInterval(() => {
      setServers(prev => prev.map(srv => {
        const targetLoad = srv.status === 'offline' ? 0 : Math.max(5, srv.load - Math.floor(Math.random() * 5) - 2);
        const targetConn = srv.status === 'offline' ? 0 : Math.max(0, srv.connections - (Math.random() > 0.6 ? 1 : 0));
        return { ...srv, load: targetLoad, connections: targetConn };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Frame animation update for flying packets
  useEffect(() => {
    let frameId: number;
    const updatePackets = () => {
      setPackets(prev => {
        const next = prev.map(p => ({ ...p, progress: p.progress + 2.5 }));
        
        // Find packets that arrived at their destination server
        const arrived = next.filter(p => p.progress >= 100);
        if (arrived.length > 0) {
          setServers(curr => curr.map(srv => {
            const hitCount = arrived.filter(p => p.server === srv.id).length;
            if (hitCount > 0 && srv.status === 'online') {
              return {
                ...srv,
                load: Math.min(100, srv.load + hitCount * 12),
                connections: srv.connections + hitCount
              };
            }
            return srv;
          }));
        }

        return next.filter(p => p.progress < 100);
      });
      frameId = requestAnimationFrame(updatePackets);
    };

    frameId = requestAnimationFrame(updatePackets);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Send a single traffic packet
  const sendPacket = () => {
    // Find next online server
    const onlineServers = servers.filter(s => s.status === 'online');
    if (onlineServers.length === 0) {
      return; // No online servers to handle traffic
    }

    // Round robin logic across online servers
    let targetServer = servers[nextIndex % servers.length];
    let attempts = 0;
    while (targetServer.status !== 'online' && attempts < servers.length) {
      const nextIdx = (nextIndex + 1) % servers.length;
      targetServer = servers[nextIdx];
      attempts++;
    }

    if (targetServer.status !== 'online') {
      return; // Fallback safeguard
    }

    // Log packet creation
    packetCounterRef.current += 1;
    const packetId = packetCounterRef.current;
    
    const colors = ['#10b981', '#06b6d4', '#6366f1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setPackets(prev => [...prev, {
      id: packetId,
      server: targetServer.id,
      progress: 0,
      color: randomColor
    }]);

    setTotalHandled(prev => prev + 1);

    // Increment next index for round robin order
    setNextIndex(prev => (prev + 1) % servers.length);
  };

  // Toggle automated traffic generator
  useEffect(() => {
    if (isAuto && isPlaying) {
      const intervalMs = 1000 / trafficRate;
      requestIntervalRef.current = setInterval(() => {
        sendPacket();
      }, intervalMs);
    } else {
      if (requestIntervalRef.current) {
        clearInterval(requestIntervalRef.current);
      }
    }

    return () => {
      if (requestIntervalRef.current) {
        clearInterval(requestIntervalRef.current);
      }
    };
  }, [isAuto, isPlaying, trafficRate, servers, nextIndex]);

  const toggleServerStatus = (id: string) => {
    setServers(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'online' ? 'offline' : 'online';
        return { 
          ...s, 
          status: nextStatus,
          load: nextStatus === 'offline' ? 0 : 15,
          connections: nextStatus === 'offline' ? 0 : 0
        };
      }
      return s;
    }));
  };

  const isSystemOverloaded = servers.some(s => s.load > 85);

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
            <Network className="text-indigo-400" size={18} />
            <span>{t.simTitle}</span>
          </h4>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            {t.roundRobinExplanation}
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (isPlaying) setIsAuto(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
                : 'bg-indigo-600 text-white font-bold'
            }`}
          >
            {isPlaying ? (
              <>
                <Square size={12} fill="currentColor" />
                <span>{t.btnStop}</span>
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                <span>{t.btnStart}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulator Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Simulator Console (Interactions) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
            {t.config}
          </span>

          {/* Traffic controller */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-sans">{t.autoTraffic}</span>
              <input
                type="checkbox"
                disabled={!isPlaying}
                checked={isAuto}
                onChange={(e) => setIsAuto(e.target.checked)}
                className="rounded border-slate-850 text-indigo-500 focus:ring-indigo-500 h-4 w-4 bg-slate-950 transition-all cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Rasio Lalu Lintas:</span>
                <span className="text-indigo-400">{trafficRate} req/sec</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                disabled={!isAuto || !isPlaying}
                value={trafficRate}
                onChange={(e) => setTrafficRate(Number(e.target.value))}
                className="w-full accent-indigo-500 disabled:opacity-40 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Manual Packet Trigger */}
            <button
              onClick={sendPacket}
              disabled={!isPlaying}
              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-slate-100 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all disabled:opacity-40 cursor-pointer"
            >
              <PlusCircle size={14} className="text-indigo-400" />
              <span>{t.addTraffic}</span>
            </button>
          </div>

          {/* System Metrics */}
          <div className="space-y-2 border-t border-slate-850 pt-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
              {t.metrics}
            </span>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-500 font-sans block">Total Packet</span>
                <span className="font-mono text-base font-bold text-slate-200">{totalHandled}</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-500 font-sans block">{t.status}</span>
                {isSystemOverloaded ? (
                  <span className="text-[10px] font-mono font-bold text-red-400 flex items-center justify-center gap-1 mt-1">
                    <ShieldAlert size={10} className="animate-bounce" />
                    <span>OVERLOAD</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-indigo-400 flex items-center justify-center gap-1 mt-1">
                    <CheckCircle size={10} />
                    <span>STABLE</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Simulator Canvas (Visualization) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden h-[240px]">
          
          {/* Dynamic flow grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none"></div>

          <div className="flex justify-between items-center relative z-10">
            {/* Client source node */}
            <div className="flex flex-col items-center">
              <div className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shadow-md">
                <Globe size={16} />
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase font-bold">CLIENT</span>
            </div>

            {/* Load Balancer logic node */}
            <div className="flex flex-col items-center relative">
              <div className="h-10 w-10 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
                <Layers size={18} className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: '6s' }} />
              </div>
              <span className="text-[9px] font-mono text-indigo-400 mt-1 uppercase font-bold">SDN_LB</span>
              <span className="text-[8px] font-mono text-slate-500 bg-slate-900 px-1 py-0.5 rounded mt-0.5 border border-slate-800">
                R-Robin
              </span>
            </div>

            {/* Servers target list */}
            <div className="flex flex-col gap-3">
              {servers.map((srv) => (
                <div key={srv.id} className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleServerStatus(srv.id)}
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                      srv.status === 'offline'
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                    title="Toggle Online/Offline"
                  >
                    <Server size={14} />
                  </button>
                  <div className="text-[9px] font-mono">
                    <div className="flex items-center space-x-1">
                      <span className={srv.status === 'offline' ? 'text-slate-500 line-through' : 'text-slate-300 font-bold'}>
                        {srv.id}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${srv.status === 'offline' ? 'bg-red-500' : 'bg-indigo-500'}`}></span>
                    </div>
                    {srv.status === 'online' && (
                      <div className="text-[8px] text-slate-500">
                        {srv.load}% / {srv.connections}c
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flying Packets layer */}
          <div className="absolute inset-0 pointer-events-none">
            {packets.map((p) => {
              // Calculate positioning
              // Source is left: 10%, middle: 50%
              // SDN is center: 45%, middle: 50%
              // Server is right: 80%, server offset: top (20%), middle (50%), bottom (80%)
              let startX = 14;
              let startY = 50;
              let midX = 45;
              let midY = 50;
              let endX = 75;
              let endY = p.server === 'A' ? 22 : p.server === 'B' ? 50 : 78;

              let currentX = startX;
              let currentY = startY;

              if (p.progress < 50) {
                // Flying client -> LB
                const ratio = p.progress / 50;
                currentX = startX + (midX - startX) * ratio;
                currentY = startY + (midY - startY) * ratio;
              } else {
                // Flying LB -> Server
                const ratio = (p.progress - 50) / 50;
                currentX = midX + (endX - midX) * ratio;
                currentY = midY + (endY - midY) * ratio;
              }

              return (
                <div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full shadow-lg transition-transform"
                  style={{
                    left: `${currentX}%`,
                    top: `${currentY}%`,
                    backgroundColor: p.color,
                    boxShadow: `0 0 10px ${p.color}`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              );
            })}
          </div>

          {/* Visual indicator for servers loads bar */}
          <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-3 mt-4 relative z-10">
            {servers.map((srv) => (
              <div key={srv.id} className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-slate-500">
                  <span>Srv {srv.id}</span>
                  <span className={srv.load > 80 ? 'text-red-400 font-bold' : ''}>{srv.load}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      srv.status === 'offline' 
                        ? 'bg-transparent' 
                        : srv.load > 80 ? 'bg-red-500' : srv.load > 50 ? 'bg-yellow-500' : 'bg-indigo-500'
                    }`} 
                    style={{ width: `${srv.status === 'offline' ? 0 : srv.load}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// SUB-SIMULATOR 2: PHARMACY MANAGEMENT SYSTEM
// -----------------------------------------------------------------
interface Medicine {
  name: string;
  stock: number;
  price: number;
}

function PharmacyManagementSimulator({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].projects.pharmacy;
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: 'Paracetamol 500mg', stock: 120, price: 5000 },
    { name: 'Amoxicillin Trihydrate', stock: 5, price: 12000 },
    { name: 'Vitamin C 1000mg', stock: 85, price: 8000 },
    { name: 'Antasida Doen', stock: 0, price: 4500 }
  ]);
  const [salesCount, setSalesCount] = useState(14);
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState<string[]>([]);

  // Form states
  const [newName, setNewName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Auto compile low stock alerts on mount / change
  useEffect(() => {
    const list: string[] = [];
    medicines.forEach(m => {
      if (m.stock === 0) {
        list.push(`${m.name}: ${t.outOfStock}`);
      } else if (m.stock < 10) {
        list.push(`${m.name}: ${t.lowStock} (${m.stock} sisa)`);
      }
    });
    setAlerts(list);
  }, [medicines, currentLanguage]);

  const handleSell = (name: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.name === name) {
        if (m.stock <= 0) return m;
        setSalesCount(s => s + 1);
        return { ...m, stock: m.stock - 1 };
      }
      return m;
    }));
  };

  const handleRestock = (name: string) => {
    setMedicines(prev => prev.map(m => {
      if (m.name === name) {
        return { ...m, stock: m.stock + 50 };
      }
      return m;
    }));
  };

  const handleAddMedicine = (e: FormEvent) => {
    e.preventDefault();
    if (!newName || !newStock || !newPrice) return;
    
    const item: Medicine = {
      name: newName,
      stock: Math.max(0, parseInt(newStock) || 0),
      price: Math.max(0, parseInt(newPrice) || 0)
    };

    setMedicines(prev => [...prev, item]);
    setNewName('');
    setNewStock('');
    setNewPrice('');
    setShowAddForm(false);
  };

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
            <Database className="text-indigo-400" size={18} />
            <span>{t.simTitle}</span>
          </h4>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            Database lokal SQLite/Java Swing UI yang disimulasikan menggunakan React State.
          </p>
        </div>

        {/* Counter summary bar */}
        <div className="flex gap-2 text-xs font-mono">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShoppingCart size={13} className="text-indigo-400" />
            <span className="text-slate-400">{t.salesToday}:</span>
            <span className="text-indigo-400 font-bold">{salesCount}</span>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Product Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            {/* Toggle Add form */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">{t.addStock}</span>
            </button>
          </div>

          {/* Add Medicine form inline collapse */}
          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddMedicine}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3 overflow-hidden"
              >
                <span className="text-xs font-semibold text-slate-200 block">{t.formTitle}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={t.formName}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 outline-none"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder={t.formQty}
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 outline-none"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder={t.formPrice}
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer shadow-md"
                  >
                    {t.formBtnAdd}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Table list */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-300">
                <thead className="bg-slate-900/60 text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  <tr>
                     <th className="p-3 font-semibold">{t.medName}</th>
                    <th className="p-3 font-semibold text-center">{t.medStock}</th>
                    <th className="p-3 font-semibold">{t.medPrice}</th>
                    <th className="p-3 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredMedicines.map((med) => {
                    const isLow = med.stock < 10;
                    const isOut = med.stock === 0;

                    return (
                      <tr key={med.name} className="hover:bg-slate-900/30 transition-colors">
                        <td className="p-3 font-medium">
                          <div className="flex flex-col">
                            <span className="text-slate-200">{med.name}</span>
                            {isOut ? (
                              <span className="text-[9px] text-red-400 font-mono font-semibold mt-0.5">{t.outOfStock}</span>
                            ) : isLow ? (
                              <span className="text-[9px] text-yellow-400 font-mono font-semibold mt-0.5">{t.lowStock}</span>
                            ) : null}
                          </div>
                        </td>
                        <td className="p-3 text-center font-mono">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            isOut ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                            isLow ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
                            'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}>
                            {med.stock}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-400">
                          Rp {med.price.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleSell(med.name)}
                              disabled={isOut}
                              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                              title={t.quickSale}
                            >
                              {t.btnBuy}
                            </button>
                            <button
                              onClick={() => handleRestock(med.name)}
                              className="px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-[10px] text-indigo-400 transition-all cursor-pointer"
                              title="Restock +50"
                            >
                              +50
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredMedicines.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500 font-sans">
                        Tidak ada data obat yang sesuai kata kunci.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: System Warnings & Live Logs */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 space-y-3.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
              {t.alerts}
            </span>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {alerts.map((alert, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs font-sans ${
                    alert.includes(t.outOfStock) 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                  }`}
                >
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{alert}</span>
                </div>
              ))}
              {alerts.length === 0 && (
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs py-10 font-sans">
                  <CheckCircle size={14} className="text-indigo-400" />
                  <span>Stok aman, tidak ada kendala sistem.</span>
                </div>
              )}
            </div>
          </div>

          {/* System diagnostics telemetry block */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[10px] text-slate-500 space-y-1">
            <span className="text-slate-400 font-bold block uppercase pb-1 border-b border-slate-900 mb-1.5">Telemetri Apotek-DB</span>
            <div>DB_ENGINE: SQLite Local Flat File</div>
            <div>STATUS: Sync OK</div>
            <div>THREADS: Java-Swing-GUI-Worker</div>
          </div>
        </div>

      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// SUB-SIMULATOR 3: E-COMMERCE PLATFORM
// -----------------------------------------------------------------
interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

function ECommerceSQLSimulator({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].projects.ecommerce;
  const [cart, setCart] = useState<{ name: string; qty: number; price: number }[]>([]);
  const [logs, setLogs] = useState<string[]>([
    '-- [INIT] initialized CodeIgniter v3 Web MVC framework Controller',
    '-- [INIT] connected successfully to Oracle SQL Database instance (SID: XE)'
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const consoleBottomRef = useRef<HTMLDivElement | null>(null);

  const products: StoreProduct[] = [
    { id: 'PROD-01', name: 'Mechanical Keyb.', category: 'Hardware', price: 450000, image: '⌨️' },
    { id: 'PROD-02', name: 'Wireless Mouse', category: 'Hardware', price: 250000, image: '🖱️' },
    { id: 'PROD-03', name: 'USB-C Dock Hub', category: 'Connectivity', price: 180000, image: '🔌' }
  ];

  const pushLog = (msg: string) => {
    setLogs(curr => [...curr, msg]);
  };

  useEffect(() => {
    // Scroll logs console to bottom
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleAddToCart = (prod: StoreProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === prod.name);
      if (existing) {
        return prev.map(item => item.name === prod.name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { name: prod.name, qty: 1, price: prod.price }];
    });

    const timestamp = new Date().toLocaleTimeString();
    pushLog(`\n-- [${timestamp}] USER_ACTION: Add ${prod.name} to Cart`);
    pushLog(`[PHP Controller] $this->cart_model->add_item('${prod.id}', 1);`);
    pushLog(`[Oracle SQL] SELECT stock_qty, price FROM products WHERE prod_id = '${prod.id}' FOR UPDATE;`);
    pushLog(`[Oracle SQL] INSERT INTO shopping_cart_items (item_id, prod_id, qty, added_at) VALUES (SYS_GUID(), '${prod.id}', 1, SYSDATE);`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const invoiceId = 'INV-' + Math.floor(Math.random() * 9000 + 1000);
    const totalPrice = cart.reduce((acc, c) => acc + (c.price * c.qty), 0);

    pushLog(`\n-- [${timestamp}] USER_ACTION: Perform Cart Checkout`);
    pushLog(`[PHP Controller] $this->checkout_model->execute_transaction($invoice_data);`);
    pushLog(`[Oracle SQL] SAVEPOINT before_checkout;`);
    pushLog(`[Oracle SQL] INSERT INTO invoices (invoice_id, order_date, total_val, pay_status) VALUES ('${invoiceId}', SYSDATE, ${totalPrice}, 'PAID');`);
    
    cart.forEach(item => {
      const dbProd = products.find(p => p.name === item.name);
      const prodId = dbProd ? dbProd.id : 'PROD-UNK';
      pushLog(`[Oracle SQL] UPDATE products SET stock_qty = stock_qty - ${item.qty} WHERE prod_id = '${prodId}';`);
    });

    pushLog(`[Oracle SQL] COMMIT TRANSACTION; -- Invoice ${invoiceId} finalized successfully.`);
    
    setCart([]);
    alert(currentLanguage === 'id' ? 'Transaksi checkout berhasil dilakukan di simulator! Cek log query Oracle SQL di samping.' : 'Checkout transaction executed in simulator! Review the generated Oracle SQL transaction logs.');
  };

  const handleClearCart = () => {
    setCart([]);
    const timestamp = new Date().toLocaleTimeString();
    pushLog(`\n-- [${timestamp}] USER_ACTION: Clear shopping cart`);
    pushLog(`[Oracle SQL] DELETE FROM shopping_cart_items;`);
  };

  const handleCopyLogs = () => {
    const raw = logs.join('\n');
    navigator.clipboard.writeText(raw);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
            <Database className="text-indigo-400" size={18} />
            <span>{t.simTitle}</span>
          </h4>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            Integrasi PHP MVC CodeIgniter dan Relasional Oracle SQL Database yang disimulasikan live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mini Store & Cart */}
        <div className="lg:col-span-6 space-y-5">
          {/* Products lists */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
              {t.productsTitle}
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {products.map((prod) => (
                <div key={prod.id} className="bg-slate-900 border border-slate-800/80 p-3 rounded-xl flex flex-col justify-between items-center text-center">
                  <span className="text-2xl mb-1.5 filter drop-shadow-[0_2px_5px_rgba(255,255,255,0.05)]">{prod.image}</span>
                  <div className="space-y-0.5 min-w-0 w-full">
                    <span className="text-[10px] font-bold text-slate-200 block truncate">{prod.name}</span>
                    <span className="text-[9px] font-mono text-slate-500 block">Rp {prod.price.toLocaleString('id-ID')}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 rounded text-[9px] mt-2 cursor-pointer transition-all shadow-sm"
                  >
                    + {currentLanguage === 'id' ? 'Beli' : 'Buy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout/Cart Box */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                {t.cartTitle}
              </span>
              {cart.length > 0 && (
                <button 
                  onClick={handleClearCart} 
                  className="text-[9px] text-red-400 hover:text-red-300 flex items-center gap-0.5 cursor-pointer"
                >
                  <Trash2 size={10} />
                  <span>Kosongkan</span>
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-sans">
                  <span className="text-slate-300 font-medium truncate max-w-[120px]">{item.name}</span>
                  <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px]">
                    <span>x{item.qty}</span>
                    <span>Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <span className="text-xs text-slate-500 font-sans block py-6 text-center">{t.emptyCart}</span>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-3 space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-400">Total Tagihan:</span>
                  <span className="text-indigo-400 font-bold">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-indigo-900/10"
                >
                  {t.checkoutBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SQL Output Console */}
        <div className="lg:col-span-6 flex flex-col h-[280px]">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
            
            {/* Console top menu */}
            <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                {t.sqlLogTitle}
              </span>
              <button
                onClick={handleCopyLogs}
                className="text-[9px] text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-750 px-2 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer"
                title="Copy queries"
              >
                {isCopied ? <Check size={10} className="text-indigo-400" /> : <Copy size={10} />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Console Area */}
            <div className="p-3.5 bg-slate-950 font-mono text-[10px] leading-relaxed text-slate-300 overflow-y-auto flex-1 whitespace-pre-wrap">
              {logs.map((log, idx) => {
                let colorClass = 'text-slate-400';
                if (log.startsWith('--')) colorClass = 'text-slate-500 font-semibold italic';
                else if (log.includes('[PHP')) colorClass = 'text-cyan-400 font-medium';
                else if (log.includes('[Oracle SQL]')) colorClass = 'text-indigo-400';

                return (
                  <div key={idx} className={`${colorClass} pb-0.5`}>
                    {log}
                  </div>
                );
              })}
              <div ref={consoleBottomRef} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// PRIMARY COMPONENT: PROJECTS
// -----------------------------------------------------------------
export default function Projects({ currentLanguage }: ProjectsProps) {
  const t = translations[currentLanguage].projects;
  const [expandedSimId, setExpandedSimId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 70, damping: 20 }
    }
  };

  const toggleSim = (id: string) => {
    if (expandedSimId === id) {
      setExpandedSimId(null);
    } else {
      setExpandedSimId(id);
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-violet-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl tracking-tight relative inline-block">
            {t.title}
            <span className="absolute -bottom-2 left-1/3 right-1/3 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Projects Cards List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          {technicalProjects.map((proj) => {
            const translation = proj.translations[currentLanguage];
            const isSimOpen = expandedSimId === proj.id;

            return (
              <motion.div
                key={proj.id}
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
                  
                  {/* Left block - text & specifics */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Badge and Title */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                          {translation.category}
                        </span>
                        <h3 className="font-display font-bold text-slate-900 text-lg sm:text-2xl leading-tight">
                          {translation.title}
                        </h3>
                      </div>

                      {/* Paragraph Description */}
                      <p className="text-slate-600 text-sm leading-relaxed font-sans">
                        {translation.description}
                      </p>

                      {/* Technical Stack Tags */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                          {t.techStackTitle}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Launch simulator trigger */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleSim(proj.id)}
                        className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer ${
                          isSimOpen
                            ? 'bg-red-50 hover:bg-red-100 border border-red-200 text-red-600'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-indigo-100'
                        }`}
                      >
                        {isSimOpen ? (
                          <>
                            <Square size={13} fill="currentColor" />
                            <span>{t.hideDemoButton}</span>
                          </>
                        ) : (
                          <>
                            <Play size={13} fill="currentColor" />
                            <span>{t.demoButton}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right block - contributions timeline */}
                  <div className="lg:col-span-5 bg-slate-50/50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-xs text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-250 flex items-center gap-2">
                        <Terminal size={14} className="text-indigo-600" />
                        <span>{t.contributionsTitle}</span>
                      </h4>
                      <ul className="space-y-3 text-xs leading-relaxed text-slate-600 font-sans">
                        {translation.contributions.map((con, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5"></span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Simple terminal diagnostics metadata */}
                    <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>STATUS: AUDITED_OK</span>
                      <span>#PROJ_ID_{proj.id.toUpperCase().replace('-','_')}</span>
                    </div>
                  </div>

                </div>

                {/* Simulated Interactive Demonstration Drawer */}
                <AnimatePresence>
                  {isSimOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-slate-200 bg-slate-50/30 overflow-hidden"
                    >
                      <div className="p-6 sm:p-8 bg-slate-50/50">
                        {proj.id === 'sdn-load-balancer' && (
                          <SDNLoadBalancerSimulator currentLanguage={currentLanguage} />
                        )}
                        {proj.id === 'pharmacy-app' && (
                          <PharmacyManagementSimulator currentLanguage={currentLanguage} />
                        )}
                        {proj.id === 'ecommerce-platform' && (
                          <ECommerceSQLSimulator currentLanguage={currentLanguage} />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
