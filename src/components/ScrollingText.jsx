import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ScrollingText = () => {
  const announcements = [
    "1. Internship Screening & Selection Ongoing! Check your dashboard, email, and SMS regularly. Confirm joining via the Internship tile on your dashboard.",
    "2. Verify your Aadhaar-seeded bank account status on your dashboard to ensure smooth payment processing.",
    "3. Complete your profile verification to unlock all features and opportunities.",
    "4. New AI-powered internship matching is now available! Update your preferences for better matches.",
    "5. Upcoming webinar: 'Maximizing Your Internship Experience' - Register now!",
    "6. Scholarship applications are now open for top-performing interns. Apply before the deadline!",
    "7. New mentorship program launched! Connect with industry experts and accelerate your career."
  ];

  const [isPaused, setIsPaused] = useState(false);

  // Calculate total width for smooth animation based on screen size
  const [screenSize, setScreenSize] = useState('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalWidth = announcements.length * (screenSize === 'mobile' ? 120 : 100);

  return (
    <div 
      className="relative w-full overflow-hidden bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-primary-500/30 shadow-lg backdrop-blur-sm"
      style={{ marginTop: '81px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="marquee"
      aria-label="Important announcements and updates"
    >
      {/* Gradient overlay for smooth edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 z-10" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-ai-500/5 z-5" />
      
      {/* Latest News section */}
      <div className="absolute left-0 top-0 bottom-0 z-30 flex items-center px-4 sm:px-6">
        <motion.div
          className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-sm border border-primary-500/30 rounded-lg px-3 py-2 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)"
          }}
        >
          {/* Glowing news icon */}
          <motion.div
            className="relative"
            animate={{
              boxShadow: [
                "0 0 10px rgba(14, 165, 233, 0.3)",
                "0 0 20px rgba(14, 165, 233, 0.6)",
                "0 0 10px rgba(14, 165, 233, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
              />
            </svg>
          </motion.div>
          
          {/* Latest News text with glow effect */}
          <motion.span 
            className="text-primary-400 font-bold text-xs sm:text-sm whitespace-nowrap tracking-wide"
            animate={{
              textShadow: [
                "0 0 5px rgba(14, 165, 233, 0.5)",
                "0 0 10px rgba(14, 165, 233, 0.8)",
                "0 0 5px rgba(14, 165, 233, 0.5)"
              ],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            LATEST NEWS
          </motion.span>
        </motion.div>
      </div>

      {/* Scrolling text container */}
      <div className="relative z-20 py-1 pl-32 sm:pl-40 md:pl-48">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, `-${totalWidth}%`]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: screenSize === 'mobile' ? 35 : 45, // Faster on mobile
              ease: "linear",
            },
          }}
          style={{
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {/* Duplicate the announcements for seamless loop */}
          {[...announcements, ...announcements].map((announcement, index) => (
            <div
              key={index}
              className="flex items-center text-slate-100 font-semibold text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 min-w-max"
            >
              <span className="flex items-center">
                {/* Notification icon with animation */}
                <motion.svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 sm:mr-3 text-primary-400 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828zM4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" 
                  />
                </motion.svg>
                {announcement}
              </span>
              
              {/* Animated separator dot */}
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full mx-3 sm:mx-4 md:mx-6 flex-shrink-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Left fade effect - adjusted for Latest News section */}
      <div className="absolute left-32 sm:left-40 md:left-48 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-800 to-transparent z-30 pointer-events-none" />
      
      {/* Right fade effect */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-800 to-transparent z-30 pointer-events-none" />
      
      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="bg-slate-900/90 text-primary-400 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-primary-500/30">
            Paused
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollingText;
