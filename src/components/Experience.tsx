import { motion } from 'motion/react';
import { Briefcase, Calendar, Users, MapPin, ChevronRight, Server, Activity, ArrowUpRight } from 'lucide-react';
import { Language, translations, professionalExperiences, organizationalExperiences } from '../types';

interface ExperienceProps {
  currentLanguage: Language;
}

export default function Experience({ currentLanguage }: ExperienceProps) {
  const t = translations[currentLanguage].experience;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="experience" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Network Grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-[100px]"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 opacity-50 hidden md:block"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl tracking-tight relative inline-block">
            {t.title}
            <span className="absolute -bottom-2 left-1/3 right-1/3 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Career Timeline - Styled as Traceroute Hop Chain */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Professional Experience Column (Left) */}
          <div className="lg:col-span-7 space-y-10">
            <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <Activity className="text-indigo-600" size={18} />
              <span>{t.title}</span>
              <span className="font-mono text-[9px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded font-bold">
                TRACE_ROUTE_PRO
              </span>
            </h3>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="relative border-l-2 border-slate-200 ml-3.5 pl-6 sm:pl-8 space-y-12"
            >
              {professionalExperiences.map((exp, index) => {
                const trans = exp.translations[currentLanguage];
                return (
                  <motion.div 
                    key={exp.id}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Glowing timeline node / Hop index */}
                    <span className="absolute -left-[45px] sm:-left-[53px] top-0 h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white border-2 border-indigo-200 group-hover:border-indigo-600 text-indigo-600 font-mono text-xs font-bold flex items-center justify-center shadow-md group-hover:shadow-[0_0_15px_rgba(79,70,229,0.25)] transition-all">
                      0{index + 1}
                    </span>

                    {/* Card container */}
                    <div className="bg-white border border-slate-200 group-hover:border-indigo-100 p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-md">
                      {/* Interactive shine */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                      
                      {/* Date / Metadata banner */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                        <span className="flex items-center space-x-1.5 font-mono text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full font-semibold">
                          <Calendar size={11} />
                          <span>{exp.period}</span>
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 font-bold">
                          RTT: {10 + index * 4}ms
                        </span>
                      </div>

                      {/* Header copy */}
                      <div className="space-y-1 mb-4">
                        <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors">
                          {trans.role}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-slate-600 font-sans">
                          <Server size={13} className="text-slate-400" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                      </div>

                      {/* Accomplishments points */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {trans.points.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2.5">
                            <ChevronRight size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Organizational Experience Column (Right) */}
          <div className="lg:col-span-5 space-y-10">
            <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <Users className="text-violet-600" size={18} />
              <span>{t.orgTitle}</span>
              <span className="font-mono text-[9px] text-violet-600 bg-violet-50 border border-violet-100 px-1.5 py-0.5 rounded font-bold">
                TRACE_ROUTE_ORG
              </span>
            </h3>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="relative border-l-2 border-slate-200 ml-3.5 pl-6 sm:pl-8 space-y-12"
            >
              {organizationalExperiences.map((org, index) => {
                const trans = org.translations[currentLanguage];
                return (
                  <motion.div 
                    key={org.id}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Glowing timeline node / Hop index */}
                    <span className="absolute -left-[45px] sm:-left-[53px] top-0 h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white border-2 border-violet-200 group-hover:border-violet-600 text-violet-600 font-mono text-xs font-bold flex items-center justify-center shadow-md group-hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all">
                      0{index + professionalExperiences.length + 1}
                    </span>

                    {/* Card container */}
                    <div className="bg-white border border-slate-200 group-hover:border-violet-100 p-5 rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-md">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all"></div>
                      
                      {/* Date / Metadata banner */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                        <span className="flex items-center space-x-1.5 font-mono text-[10px] text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-0.5 rounded-full font-semibold">
                          <Calendar size={11} />
                          <span>{org.period}</span>
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 font-bold">
                          TTL: 64h
                        </span>
                      </div>

                      {/* Header copy */}
                      <div className="space-y-1 mb-4">
                        <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg group-hover:text-violet-600 transition-colors">
                          {trans.role}
                        </h4>
                        <div className="text-xs text-slate-600 font-sans flex items-center space-x-2">
                          <Users size={13} className="text-slate-400" />
                          <span className="font-semibold">{org.organization}</span>
                        </div>
                      </div>

                      {/* Accomplishments points */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {trans.points.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-violet-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

        {/* Trace report signature bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-mono text-slate-500 shadow-sm">
            <Activity size={12} className="text-indigo-600 animate-pulse" />
            <span>TRACEROUTE COMPLETE : 3 hops verified, packet loss 0.00%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
