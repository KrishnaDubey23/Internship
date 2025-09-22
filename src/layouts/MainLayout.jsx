import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollingText from "../components/ScrollingText";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* AI-powered animated background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary AI gradient orb */}
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500/20 via-accent-500/15 to-ai-500/20 blur-3xl animate-float" />
        
        {/* Secondary accent orb */}
        <div className="absolute bottom-[-40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-l from-accent-500/15 via-primary-500/10 to-ai-500/15 blur-3xl animate-pulse-slow" />
        
        {/* Tertiary floating orb */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-ai-500/10 to-primary-500/10 blur-2xl animate-glow" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Neural network lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M200,400 Q400,300 600,400 T1000,400" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M50,600 Q250,500 450,600 T850,600" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
      </div>
      
      <Navbar />
      <ScrollingText />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;


