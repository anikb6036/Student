import React, { useState } from 'react';
import Logo from './Logo';
import { ArrowRight, BookOpen, Users, Shield } from 'lucide-react';
import { Course } from '../types';
import { motion } from 'motion/react';
import admissionHeroImg from '../assets/images/admission_hero_1781153839906.png';

interface HomePageProps {
  isDark: boolean;
  onEnterPortal: (tab: 'fastReg' | 'authLogin' | 'adminLogin') => void;
  courses?: Course[];
}

export default function HomePage({ isDark, onEnterPortal, courses = [] }: HomePageProps) {
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const activeCourseId = hoveredCourseId;
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#E0E6ED_0%,#EDF2F7_50%,#E2E8F0_100%)] dark:bg-[linear-gradient(135deg,#0E131F_0%,#151D30_50%,#090D16_100%)] text-[#1E293B] dark:text-slate-200 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden font-sans z-0">
      
      {/* High-Resolution Modern Geometric & Wave Background (Matching the reference picture) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        {/* Subtle split plane layout backgrounds */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-[#E5ECF6] dark:bg-[#131A2C] opacity-40 dark:opacity-20 [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[#D9E2EC] dark:bg-[#0D1525] opacity-35 dark:opacity-15 [clip-path:polygon(0_0,100%_100%,0_100%)]" />

        <svg className="absolute w-full h-full opacity-80 dark:opacity-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7"/>
              <stop offset="50%" stopColor="#D9E4F5" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#C4D4EC" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="wave2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B0CBE9" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#9BBEE3" stopOpacity="0.25"/>
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#8DA9C4" stopOpacity="0"/>
              <stop offset="25%" stopColor="#8DA9C4" stopOpacity="0.35"/>
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8"/>
              <stop offset="75%" stopColor="#6C8EBF" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#6C8EBF" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="darkLineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#334E68" stopOpacity="0"/>
              <stop offset="30%" stopColor="#486581" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6"/>
              <stop offset="70%" stopColor="#243B53" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#243B53" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Smooth layered backdrop ribbons */}
          <path d="M-100,280 C300,120 500,450 900,220 C1100,105 1300,200 1600,150 L1600,850 L-100,850 Z" fill="url(#wave1)" />
          <path d="M-50,380 C250,520 600,180 1000,380 C1200,480 1350,350 1550,420 L1550,850 L-50,850 Z" fill="url(#wave2)" />

          {/* Precision high resolution guilloche contour waves */}
          <g stroke="url(#lineGrad)" fill="none" strokeWidth="1.2" className="dark:hidden">
            <path d="M-100,290 Q200,380 500,240 T1100,350 T1600,210" />
            <path d="M-100,310 Q200,400 500,260 T1100,370 T1600,230" />
            <path d="M-100,330 Q200,420 500,280 T1100,390 T1600,250" />
            <path d="M-100,350 Q200,440 500,300 T1100,410 T1600,270" />
            <path d="M-100,370 Q200,460 500,320 T1100,430 T1600,290" />
            <path d="M-100,390 Q200,480 500,340 T1100,450 T1600,310" />
            <path d="M-100,410 Q200,500 500,360 T1100,470 T1600,330" />
            <path d="M-100,430 Q200,520 500,380 T1100,490 T1600,350" />
            <path d="M-100,450 Q200,540 500,400 T1100,510 T1600,370" />
            <path d="M-100,470 Q200,560 500,420 T1100,530 T1600,390" />
            <path d="M-100,490 Q200,580 500,440 T1100,550 T1600,410" />
          </g>

          <g stroke="url(#darkLineGrad)" fill="none" strokeWidth="1.2" className="hidden dark:g">
            <path d="M-100,290 Q200,380 500,240 T1100,350 T1600,210" />
            <path d="M-100,310 Q200,400 500,260 T1100,370 T1600,230" />
            <path d="M-100,330 Q200,420 500,280 T1100,390 T1600,250" />
            <path d="M-100,350 Q200,440 500,300 T1100,410 T1600,270" />
            <path d="M-100,370 Q200,460 500,320 T1100,430 T1600,290" />
            <path d="M-100,390 Q200,480 500,340 T1100,450 T1600,310" />
            <path d="M-100,410 Q200,500 500,360 T1100,470 T1600,330" />
            <path d="M-100,430 Q200,520 500,380 T1100,490 T1600,350" />
            <path d="M-100,450 Q200,540 500,400 T1100,510 T1600,370" />
          </g>
        </svg>

        {/* Soft, crisp radial glowing point */}
        <div className="absolute right-[10%] top-[25%] w-[450px] h-[450px] rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-[5%] bottom-[15%] w-[350px] h-[350px] rounded-full bg-slate-300/30 dark:bg-indigo-900/15 blur-[100px]" />
      </div>

      {/* Nav Header */}
      <header className="w-full border-b border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-colors shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Logo size="sm" withStrapline={true} inverse={isDark} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <button type="button" onClick={() => onEnterPortal('fastReg')} className="hover:text-amber-500 transition-colors text-left cursor-pointer">
              Apply Now
            </button>
            <button type="button" onClick={() => onEnterPortal('authLogin')} className="hover:text-amber-500 transition-colors text-left cursor-pointer">
              Student Login
            </button>
            <button type="button" onClick={() => onEnterPortal('adminLogin')} className="hover:text-amber-500 transition-colors text-left cursor-pointer">
              Staff Portal
            </button>
            
            <button 
              type="button" 
              onClick={() => onEnterPortal('authLogin')}
              className="ml-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-sm active:scale-95"
            >
              Sign In
            </button>
          </nav>

          {/* Mobile Nav Toggle (Simplified) */}
          <div className="md:hidden">
            <button type="button" onClick={() => onEnterPortal('authLogin')} className="px-5 py-2 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 rounded-lg font-bold text-sm">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography & Calls to Action */}
        <div className="flex flex-col items-start gap-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Admissions Open 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Learn<span className="text-red-500">ora</span> <br/>
            <span className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 block mt-2">Empowering Minds, Shaping Futures</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
            The next generation platform for collaborative academic discovery. Streamlined courses, real-time administrative workflows, and a thriving student community.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
            <button 
              onClick={() => onEnterPortal('fastReg')}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)] active:scale-95 text-lg"
            >
              Start Application <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onEnterPortal('authLogin')}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold transition-all active:scale-95 text-lg"
            >
              Student Login
            </button>
          </div>

          {/* Feature Highlights row */}
          <div className="grid grid-cols-3 gap-6 pt-8 w-full border-t border-slate-200 dark:border-white/10 mt-4">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Smart Curriculum</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Coaching</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Secure Sandbox</h3>
            </div>
          </div>
        </div>

        {/* Right Side: Beautiful Illustration Graphic with Motion Effects */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex items-center justify-center relative w-full h-full min-h-[400px]"
        >
          {/* Decorative glowing background circles */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-red-400/10 dark:bg-red-500/5 blur-3xl -z-10 animate-pulse" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-400/10 dark:bg-amber-500/5 blur-2xl -z-10" />

          {/* Floated Image Container */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
            className="relative max-w-full lg:max-w-md xl:max-w-xl flex items-center justify-center select-none"
          >
            <img 
              src={admissionHeroImg}
              alt="Unlock Learning Capabilities"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[480px] object-contain drop-shadow-[0_15px_30px_rgba(239,68,68,0.15)] dark:drop-shadow-[0_15px_40px_rgba(239,68,68,0.08)] filter"
              style={{ transform: 'scaleX(-1)' }}
            />
          </motion.div>
        </motion.div>

      </main>

      {/* Active Running Courses Section */}
      <section className="w-full bg-[#fbd4d6] dark:bg-[#1a0e10] py-12 md:py-20 relative z-10 border-t border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white dark:bg-[#0B0C10] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 dark:text-white tracking-tight mb-12">
                  Choose Your Area of Interest
                </h2>

                {courses.length === 0 ? (
                  <div className="p-8 md:p-12 text-center rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                    <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600 dark:text-gray-305">No active academic cohorts published yet.</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">Please sign in as staff or administrator to build and publish learning programs into the registry.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course, idx) => {
                      const isActive = activeCourseId === course.id;
                      return (
                        <div 
                          key={course.id}
                          onClick={() => onEnterPortal('fastReg')}
                          onMouseEnter={() => setHoveredCourseId(course.id)}
                          onMouseLeave={() => setHoveredCourseId(null)}
                          className={`p-6 rounded-2xl bg-white dark:bg-[#15161A] border-2 transition-all duration-300 flex justify-between items-center group cursor-pointer shadow-sm hover:shadow-md ${
                            isActive 
                              ? 'border-red-500 ring-2 ring-red-500/10' 
                              : 'border-slate-100 dark:border-white/5 hover:border-red-400'
                          }`}
                        >
                          <div className="flex-1 pr-4">
                            <h3 className={`text-lg md:text-xl font-bold leading-tight transition-colors ${
                              isActive 
                                ? 'text-red-600 dark:text-red-500 font-extrabold' 
                                : 'text-slate-900 dark:text-white group-hover:text-red-500'
                            }`}>
                              {course.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 font-medium">
                              {course.durationWeeks ? `${course.durationWeeks} Months` : '1 Course'}
                            </p>
                          </div>

                          <div className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-red-50 dark:bg-red-500/10 text-red-500 scale-105 shadow-sm' 
                              : 'bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:bg-red-50 dark:group-hover:bg-red-500/10 group-hover:text-red-500 group-hover:scale-105'
                          }`}>
                            {idx % 3 === 0 ? <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> : 
                             idx % 3 === 1 ? <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg> :
                             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Roadmap Section */}
              <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:border-l border-slate-200 dark:border-white/10 lg:pl-12 xl:pl-16 pt-12 lg:pt-0">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  Admission Roadmap
                </h3>
                
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto lg:before:ml-5 lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-red-500 before:via-red-300 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0B0C10] bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:translate-x-0 lg:order-none z-10 font-bold text-sm">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] lg:w-[calc(100%-4rem)] p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15161A] shadow-sm ml-4 lg:ml-4 md:ml-0 md:group-odd:mr-4 lg:mr-0 text-left">
                      <h4 className="font-bold text-slate-900 dark:text-white">Apply Online</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fill out the quick registration form and submit your basic details.</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0B0C10] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:translate-x-0 lg:order-none z-10 font-bold text-sm">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] lg:w-[calc(100%-4rem)] p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15161A] shadow-sm ml-4 lg:ml-4 md:ml-0 md:group-odd:mr-4 lg:mr-0 text-left opacity-70">
                      <h4 className="font-bold text-slate-900 dark:text-white">Entrance Test</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Take our online aptitude assessment to evaluate your foundation.</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0B0C10] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:translate-x-0 lg:order-none z-10 font-bold text-sm">
                      3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] lg:w-[calc(100%-4rem)] p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15161A] shadow-sm ml-4 lg:ml-4 md:ml-0 md:group-odd:mr-4 lg:mr-0 text-left opacity-70">
                      <h4 className="font-bold text-slate-900 dark:text-white">Counseling</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Discuss your goals and pick the right course track with our advisors.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0B0C10] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:translate-x-0 lg:order-none z-10 font-bold text-sm">
                      4
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] lg:w-[calc(100%-4rem)] p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15161A] shadow-sm ml-4 lg:ml-4 md:ml-0 md:group-odd:mr-4 lg:mr-0 text-left opacity-70">
                      <h4 className="font-bold text-slate-900 dark:text-white">Enrollment</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Complete your registration, receive credentials and get onboarded.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full bg-[#0B0C10] text-white pt-12 pb-12 relative z-10 overflow-hidden font-sans mt-0">
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-between min-h-[500px]">
          {/* Top Header inside footer */}
          <div className="flex justify-between items-center mb-16 md:mb-24">
            <Logo size="sm" withStrapline={false} inverse={true} />
            <div className="flex items-center gap-8 text-sm font-medium text-slate-300">
              <button className="hover:text-white transition-colors">Programs</button>
              <button className="hover:text-white transition-colors">Admissions</button>
              <button className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start flex-1 gap-12 relative">
            {/* Left Content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 flex flex-col justify-between h-full z-10">
              <div>
                 <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.05] mb-16 text-white max-w-lg">
                   Empowering Minds, Shaping Futures
                 </h2>
                 <div className="flex flex-wrap gap-16 md:gap-32 mb-16">
                    <div>
                       <h4 className="font-bold text-white mb-6 tracking-wide">Programs</h4>
                       <ul className="space-y-3 text-sm text-slate-400 font-medium">
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Engineering App</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Medicine</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Business Systems</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Arts / UX</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Web Design</button></li>
                       </ul>
                    </div>
                    <div>
                       <h4 className="font-bold text-white mb-6 tracking-wide">Resources</h4>
                       <ul className="space-y-3 text-sm text-slate-400 font-medium">
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Student Portal</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Behance Labs</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Dribbble Works</button></li>
                          <li><button className="hover:text-white transition-colors hover:underline underline-offset-4">Github Repos</button></li>
                       </ul>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mt-auto md:w-3/4">
                <p>© 2026, Learnora Edu Inc.</p>
                <div className="flex items-center gap-4">
                  <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                  <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></button>
                  <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></button>
                  <button className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></button>
                </div>
              </div>
            </div>

            {/* Right Graphic "L" */}
            <div className="hidden md:flex flex-1 items-center justify-center relative min-h-[450px]">
              <div className="relative w-[340px] h-[450px] drop-shadow-2xl">
                 {/* L Vertical Stem background */}
                 <div className="absolute left-0 top-0 w-[100px] h-full bg-[#fbbc04] shadow-[inset_-8px_0_15px_rgba(0,0,0,0.15)]" />
                 
                 {/* L Vertical Stem Top Blue shape */}
                 <div className="absolute left-0 top-0 w-[160px] h-[180px] bg-[#4285f4] rounded-tr-[80px] overflow-hidden shadow-lg border-b border-[#3061b4]">
                   {/* Inner texture white shape */}
                   <div className="absolute right-[-20px] top-[20px] w-[130px] h-[140px] bg-[#f0f0f0] rounded-l-full shadow-inner mix-blend-luminosity flex items-center opacity-90">
                     <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                   </div>
                   {/* Red wedge */}
                   <div className="absolute right-0 bottom-0 w-[40px] h-[90px] bg-[#ea4335] rounded-tl-full shadow-inner z-10" />
                 </div>

                 {/* Middle Pink Wedge */}
                 <div className="absolute left-[15px] top-[140px] w-[80px] h-[130px] bg-[#d946ef] rounded-tl-full shadow-[5px_10px_20px_rgba(0,0,0,0.3)] z-20 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                 </div>

                 {/* Bottom horizontal base red/yellow */}
                 <div className="absolute left-0 bottom-0 w-[240px] h-[80px] bg-[#ea4335] shadow-[0_-5px_15px_rgba(0,0,0,0.2)] z-30">
                   <div className="absolute top-0 right-0 w-[80px] h-full bg-[#fbbc04]" />
                   <div className="absolute left-0 top-0 w-[100px] h-full bg-[#b91c1c] shadow-inner mix-blend-multiply opacity-50" />
                 </div>

                 {/* Bottom horizontal top Pink Piece */}
                 <div className="absolute left-[10px] bottom-[20px] w-[180px] h-[90px] bg-[#d946ef] rounded-tr-[50px] shadow-[0_-10px_20px_rgba(0,0,0,0.3)] z-40 overflow-hidden border-t-2 border-fuchsia-400/40">
                    <div className="absolute left-[20px] top-[-10px] w-[90px] h-[60px] bg-[#f0f0f0] rounded-b-full shadow-[inset_0_5px_10px_rgba(0,0,0,0.1)] opacity-90 flex items-center justify-center">
                       <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                    </div>
                 </div>
              </div>

              {/* Multi-pagination dots on the far right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500 cursor-pointer transition-colors" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500 cursor-pointer transition-colors" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500 cursor-pointer transition-colors" />
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
