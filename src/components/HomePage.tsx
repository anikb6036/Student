import React from 'react';
import Logo from './Logo';
import { ArrowRight, BookOpen, Users, Shield } from 'lucide-react';

interface HomePageProps {
  isDark: boolean;
  onEnterPortal: (tab: 'fastReg' | 'authLogin' | 'adminLogin') => void;
}

export default function HomePage({ isDark, onEnterPortal }: HomePageProps) {
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
            <span className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 block mt-2">Learn Beyond Limits</span>
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

        {/* Right Side Empty for Graphic (The absolute positioned yeast bg lives here visually) */}
        <div className="hidden lg:block relative h-full">
          {/* Spacer block, the actual graphic is absolute positioned to the screen so it breaks out of the container nicely */}
        </div>

      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-slate-200/50 dark:border-white/5 pt-16 pb-8 mt-auto z-10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
             <div className="space-y-4">
                <Logo size="sm" withStrapline={false} inverse={isDark} />
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed pr-4">
                  Empowering the next generation through collaborative learning and modern educational practices.
                </p>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-gray-400 font-medium">
                   <li><button className="hover:text-amber-500 transition-colors">About Us</button></li>
                   <li><button className="hover:text-amber-500 transition-colors">Programs & Courses</button></li>
                   <li><button className="hover:text-amber-500 transition-colors">Admissions</button></li>
                   <li><button className="hover:text-amber-500 transition-colors">Student Life</button></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Support</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-gray-400 font-medium">
                   <li><button className="hover:text-amber-500 transition-colors">Help Center</button></li>
                   <li><button className="hover:text-amber-500 transition-colors">Contact Us</button></li>
                   <li><button className="hover:text-amber-500 transition-colors">FAQ</button></li>
                   <li><button onClick={() => onEnterPortal('adminLogin')} className="hover:text-amber-500 transition-colors">Staff Portal</button></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Contact</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-gray-400 font-medium">
                   <li className="flex items-center gap-2">
                     <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-slate-400 dark:text-gray-300">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                     </span>
                     hello@learnora.edu
                   </li>
                   <li className="flex items-center gap-2">
                     <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-slate-400 dark:text-gray-300">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                     </span>
                     +1 (555) 123-4567
                   </li>
                   <li className="flex gap-2">
                     <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 dark:text-gray-300">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                     </span>
                     123 Education Ave,<br/>Innovation City, TX 75001
                   </li>
                </ul>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/60 dark:border-white/10 text-xs font-semibold text-slate-500 dark:text-gray-500">
            <p>&copy; {new Date().getFullYear()} Learnora Institute. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button className="hover:text-amber-500 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-500 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
