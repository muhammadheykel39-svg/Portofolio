import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import { Language } from './types';

export default function App() {
  const [currentLanguage, setLanguage] = useState<Language>('id');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-500/20 selection:text-indigo-900 font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Header / Navigation */}
      <Header currentLanguage={currentLanguage} setLanguage={setLanguage} />

      <main className="relative">
        
        {/* Hero Presentation & Telemetry Rack */}
        <Hero currentLanguage={currentLanguage} />

        {/* Bio, Education, & Credentials About */}
        <About currentLanguage={currentLanguage} />

        {/* Interactive Matrix Skills Grid */}
        <Skills currentLanguage={currentLanguage} />

        {/* System & Application Technical Projects (with Live Simulators) */}
        <Projects currentLanguage={currentLanguage} />

        {/* Professional & Organizational Trace Experience Timeline */}
        <Experience currentLanguage={currentLanguage} />

        {/* Contact Docks & Handshake Socket Messaging */}
        <Contact currentLanguage={currentLanguage} />

      </main>

      {/* Sleek Dark Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-[10px] font-bold">
              $
            </div>
            <span className="font-display font-semibold text-sm text-slate-300">
              Muhammad Heykel Portfolio <span className="text-indigo-400 font-bold">© {new Date().getFullYear()}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-mono text-[10px]">
            <span>ENV: production</span>
            <span>•</span>
            <span>HOST: cloud-run-v1</span>
            <span>•</span>
            <span>COMPILED: React_19_Vite_6</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
