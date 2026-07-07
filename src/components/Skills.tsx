import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { Language, translations, skillCategories } from '../types';

interface SkillsProps {
  currentLanguage: Language;
}

export default function Skills({ currentLanguage }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const t = translations[currentLanguage].skills;

  const categories = [
    { id: 'all', label: currentLanguage === 'id' ? 'Semua Keahlian' : 'All Skills' },
    { id: 'os', label: t.categories.os },
    { id: 'networking', label: t.categories.networking },
    { id: 'programming', label: t.categories.programming },
    { id: 'general', label: t.categories.general },
  ];

  // Helper to dynamically render lucide icons
  const renderIcon = (iconName: string, className = '') => {
    switch (iconName) {
      case 'terminal': return <Icons.Terminal className={className} size={18} />;
      case 'laptop': return <Icons.Laptop className={className} size={18} />;
      case 'network': return <Icons.Network className={className} size={18} />;
      case 'cpu': return <Icons.Cpu className={className} size={18} />;
      case 'cloud': return <Icons.Cloud className={className} size={18} />;
      case 'router': return <Icons.Router className={className} size={18} />;
      case 'code': return <Icons.Code className={className} size={18} />;
      case 'coffee': return <Icons.Coffee className={className} size={18} />;
      case 'globe': return <Icons.Globe className={className} size={18} />;
      case 'database': return <Icons.Database className={className} size={18} />;
      case 'git-branch': return <Icons.GitBranch className={className} size={18} />;
      case 'credit-card': return <Icons.CreditCard className={className} size={18} />;
      case 'file-text': return <Icons.FileText className={className} size={18} />;
      case 'wrench': return <Icons.Wrench className={className} size={18} />;
      default: return <Icons.Check className={className} size={18} />;
    }
  };

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/5 blur-[150px]"></div>
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

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 font-sans border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-md shadow-indigo-100'
                  : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-300 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm"
              >
                {/* Category Header */}
                <h3 className="font-display font-bold text-slate-900 text-lg mb-6 flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>{category.translations[currentLanguage].title}</span>
                </h3>

                {/* Subskills layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="bg-slate-50/50 p-4.5 rounded-xl border border-slate-200/80 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start space-x-4 group"
                    >
                      {/* Icon */}
                      <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-100 flex items-center justify-center shrink-0 transition-all shadow-sm">
                        {renderIcon(skill.icon, "transition-transform group-hover:scale-110")}
                      </div>

                      {/* Info & Bar */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-sans font-semibold text-slate-800 text-sm truncate pr-2">
                            {skill.name}
                          </h4>
                          <span className="font-mono text-xs text-slate-400">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress bar container */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Diagnostic Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono text-slate-500 shadow-sm">
            <Icons.Settings size={12} className="text-indigo-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>SYSTEM_CAPABILITIES_MATCH_OK : Linux + Azure + Networks + Databases</span>
          </div>
        </div>

      </div>
    </section>
  );
}
