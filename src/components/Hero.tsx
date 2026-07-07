import { motion } from 'motion/react';
import { Terminal, Network, Shield, Cpu, Linkedin, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Language, translations } from '../types';

interface HeroProps {
  currentLanguage: Language;
}

export default function Hero({ currentLanguage }: HeroProps) {
  const t = translations[currentLanguage].hero;

  const contactInfo = {
    email: 'muhammadheykel39@gmail.com',
    phone: '+6282261854287',
    linkedin: 'https://www.linkedin.com/in/muhammad-heykel/',
    location: 'Jakarta, Indonesia'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const terminalCodeLines = [
    { cmd: 'whoami', output: 'muhammad_heykel' },
    { cmd: 'cat capabilities.json', output: '["Linux_SysAdmin", "SDN_Research", "FullStack_Dev"]' },
    { cmd: 'ping -c 3 azure.portal.com', output: '64 bytes from azure.microsoft: icmp_seq=1 ttl=54 time=10.4 ms' },
    { cmd: 'systemctl status portfolio.service', output: '● portfolio.service - Active: running [100% stable]' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-gradient-to-b from-white to-slate-50 overflow-hidden text-slate-800">
      {/* Visual Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>
        
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none"></div>
        
        {/* Cyber Dots */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Left Column) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <span className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-indigo-700 font-mono text-xs font-semibold tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span>{t.availability}</span>
              </span>
            </motion.div>

            {/* Name & Greeting */}
            <div className="space-y-2">
              <motion.p variants={itemVariants} className="font-mono text-slate-500 text-sm sm:text-base tracking-wide flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600 animate-bounce" />
                <span>{t.greeting}</span>
              </motion.p>
              <motion.h1 variants={itemVariants} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight">
                MUHAMMAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 drop-shadow-[0_2px_10px_rgba(99,102,241,0.1)]">HEYKEL</span>
              </motion.h1>
            </div>

            {/* Animated Roles List */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 items-center">
              <span className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700 shadow-sm">
                <Shield size={13} className="text-indigo-600" />
                <span>{t.role1}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700 shadow-sm">
                <Network size={13} className="text-violet-600" />
                <span>{t.role2}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700 shadow-sm">
                <Cpu size={13} className="text-indigo-500" />
                <span>{t.role3}</span>
              </span>
            </motion.div>

            {/* Subtitle / Bio summary */}
            <motion.p variants={itemVariants} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              {t.sub}
            </motion.p>

            {/* Location Badge */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 font-mono text-xs text-slate-500">
              <MapPin size={14} className="text-indigo-600" />
              <span>{contactInfo.location}</span>
              <span className="text-slate-300">|</span>
              <Phone size={14} className="text-violet-600" />
              <a 
                href={`https://wa.me/${contactInfo.phone.replace('+', '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-indigo-600 transition-colors"
              >
                {contactInfo.phone}
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all flex items-center space-x-2 shadow-md shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.ctaProjects}</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold px-6 py-3 rounded-lg text-sm transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
              >
                <span>{t.ctaContact}</span>
              </button>
            </motion.div>

            {/* Micro Social Bar */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4 pt-4 border-t border-slate-200 max-w-xs">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-indigo-600 transition-all p-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-indigo-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-slate-500 hover:text-violet-600 transition-all p-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-violet-200"
                aria-label="Email Contact"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-slate-500 hover:text-indigo-500 transition-all p-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-indigo-200"
                aria-label="Phone Contact"
              >
                <Phone size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Interactive Server & Console Visualization (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', duration: 1, delay: 0.4 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Console Header Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                  heykel@node-01: ~
                </div>
                <div className="w-4 h-4 rounded bg-slate-950 flex items-center justify-center border border-slate-800 text-[9px] font-mono text-indigo-400">
                  ⚡
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 font-mono text-[11px] leading-relaxed text-slate-300 space-y-4">
                
                {/* Simulated Server Stats Panel */}
                <div className="bg-slate-900/50 rounded-lg p-3.5 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-1.5">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Node Hardware</span>
                    <span className="text-indigo-400 text-[10px] bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-bold">ONLINE</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {/* CPU metric */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>CPU Load (Mininet Core)</span>
                        <span>18.4%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: '18.4%' }}></div>
                      </div>
                    </div>

                    {/* RAM metric */}
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Sys Memory Usage</span>
                        <span>3.2 GB / 8.0 GB</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                        <div className="bg-violet-500 h-full rounded-full transition-all duration-1000" style={{ width: '40%' }}></div>
                      </div>
                    </div>

                    {/* Azure Connection State */}
                    <div className="flex justify-between items-center text-[10px] pt-1 text-slate-400">
                      <span>Azure Cloud Bridge</span>
                      <span className="text-indigo-400 font-bold">CONNECTED</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Console Logs */}
                <div className="space-y-3">
                  {terminalCodeLines.map((line, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-start text-slate-400">
                        <span className="text-indigo-500 mr-2 font-bold select-none">$</span>
                        <span className="text-slate-200 font-semibold">{line.cmd}</span>
                      </div>
                      <div className="text-slate-400 pl-4 bg-slate-900/30 py-0.5 border-l border-slate-800 rounded">
                        {line.output}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blinking Prompt */}
                <div className="flex items-center text-slate-400 pt-1">
                  <span className="text-indigo-500 mr-2 font-bold select-none">$</span>
                  <span className="text-slate-300 font-semibold select-all">node init_portfolio.sh</span>
                  <span className="ml-1 w-1.5 h-3.5 bg-indigo-400 animate-pulse inline-block"></span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
