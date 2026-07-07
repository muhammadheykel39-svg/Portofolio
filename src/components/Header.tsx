import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Terminal, Cpu, ArrowRight } from 'lucide-react';
import { Language, translations } from '../types';

interface HeaderProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

export default function Header({ currentLanguage, setLanguage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const t = translations[currentLanguage].header;

  const navItems = [
    { id: 'hero', label: currentLanguage === 'id' ? 'Beranda' : 'Home' },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'experience', label: t.experience },
    { id: 'contact', label: t.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    setIsOpen(false);
    
    if (element) {
      setTimeout(() => {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-md shadow-indigo-100">
              <Terminal size={16} />
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                HEYKEL<span className="text-indigo-600">.SYS</span>
              </span>
              <div className="hidden sm:flex items-center space-x-1 font-mono text-[10px] text-slate-400">
                <Cpu size={10} className="text-indigo-500 animate-pulse" />
                <span>PING: 12ms</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium font-sans transition-all relative ${
                  activeSection === item.id
                    ? 'text-indigo-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Language Toggle & Call to Action (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all ${
                  currentLanguage === 'id'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => scrollTo('contact')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>{currentLanguage === 'id' ? 'Kontak' : 'Hire Me'}</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Language toggle mobile */}
            <button
              onClick={() => setLanguage(currentLanguage === 'id' ? 'en' : 'id')}
              className="flex items-center space-x-1 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-950 text-xs font-mono"
            >
              <Globe size={12} className="text-indigo-600" />
              <span className="uppercase font-bold">{currentLanguage}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all focus:outline-none"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 pl-4 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-200 mt-2">
                <a
                  href="https://wa.me/6282261854287"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-indigo-600 text-white text-center font-semibold text-xs py-3 rounded-lg flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-indigo-100"
                >
                  <span>{currentLanguage === 'id' ? 'Hubungi Saya' : 'Get In Touch'}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
