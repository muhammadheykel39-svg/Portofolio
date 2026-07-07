import { motion } from 'motion/react';
import { GraduationCap, Award, CheckCircle2, Cpu, Database, Network } from 'lucide-react';
import { Language, translations } from '../types';

interface AboutProps {
  currentLanguage: Language;
}

export default function About({ currentLanguage }: AboutProps) {
  const t = translations[currentLanguage].about;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
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

        {/* Section Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* Left Column: Biography & Education */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group shadow-sm"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500"></div>
              
              <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                <span>{currentLanguage === 'id' ? 'Profil Singkat' : 'Summary Profile'}</span>
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                {t.bioParagraph}
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group shadow-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all duration-500"></div>

              <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center gap-2 mb-4">
                <GraduationCap className="text-indigo-600" size={20} />
                <span>{t.educationTitle}</span>
              </h3>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <Award size={18} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-slate-900 text-base">
                    {t.degree}
                  </h4>
                  <p className="text-slate-600 text-sm font-sans">
                    {t.university}
                  </p>
                  <div className="inline-flex items-center space-x-1.5 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded text-indigo-700 font-mono text-xs font-bold">
                    <span>{t.gpa}</span>
                  </div>
                  <p className="text-slate-400 text-xs font-mono pt-1">
                    Graduated with High Honors (Sangat Memuaskan)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Values / Personality Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Value 1: Solutif */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-md transition-all duration-300 flex items-start gap-4 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-slate-900 text-sm sm:text-base">
                  {t.highlights.solutive}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {t.highlights.solutiveDesc}
                </p>
              </div>
            </motion.div>

            {/* Value 2: Adaptif */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-md transition-all duration-300 flex items-start gap-4 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                <Network size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-slate-900 text-sm sm:text-base">
                  {t.highlights.adaptive}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {t.highlights.adaptiveDesc}
                </p>
              </div>
            </motion.div>

            {/* Value 3: Berkualitas */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-md transition-all duration-300 flex items-start gap-4 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
                <Database size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-slate-900 text-sm sm:text-base">
                  {t.highlights.quality}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {t.highlights.qualityDesc}
                </p>
              </div>
            </motion.div>

            {/* Micro Badge / Seal Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-5 rounded-2xl border border-indigo-100 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="text-indigo-600 shrink-0 animate-pulse" size={20} />
                <div>
                  <p className="font-display font-semibold text-slate-800 text-xs">
                    {currentLanguage === 'id' ? 'Status Kredensial' : 'Credentials Status'}
                  </p>
                  <p className="font-mono text-[10px] text-slate-400">
                    S.Kom Degree - 100% Verified
                  </p>
                </div>
              </div>
              <div className="h-7 w-20 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-[9px] font-mono font-bold text-slate-500">
                #2022-GRAD
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
