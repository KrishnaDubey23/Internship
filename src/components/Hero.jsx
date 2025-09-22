import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20"
            >
              <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-primary-400">AI-Powered Matching</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              The Future of{" "}
              <span className="text-ai-gradient">Internships</span>{" "}
              is Here
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-slate-300 leading-relaxed max-w-2xl"
            >
              Experience AI-powered matching that connects the right talent with the right opportunities. 
              Discover internships tailored to your skills, aspirations, and career goals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-4 rounded-2xl font-semibold text-white text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Your Journey
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl font-semibold text-slate-300 border border-slate-600 hover:border-primary-500 hover:text-primary-400 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-ai-gradient">10K+</div>
                <div className="text-sm text-slate-400">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ai-gradient">500+</div>
                <div className="text-sm text-slate-400">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ai-gradient">95%</div>
                <div className="text-sm text-slate-400">Match Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - AI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[600px]">
              {/* Main AI Brain Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-80 h-80 rounded-full border-2 border-primary-500/20 relative"
                >
                  {/* Neural Network Nodes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                      className="absolute w-4 h-4 bg-ai-gradient rounded-full"
                      style={{
                        top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                  
                  {/* Central AI Core */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 ai-gradient rounded-full flex items-center justify-center neon-glow"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-20 right-0 glass-card p-4 rounded-xl max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-ai-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Matching Active</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">Finding perfect matches...</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute bottom-20 left-0 glass-card p-4 rounded-xl max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Smart Recommendations</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">Personalized for you</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
