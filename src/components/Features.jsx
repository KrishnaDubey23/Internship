import { motion } from "framer-motion";

const features = [
  { 
    title: "AI-Powered Matching", 
    desc: "Advanced machine learning algorithms analyze your skills, preferences, and career goals to find the perfect internship matches.", 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-primary-500 to-primary-600"
  },
  { 
    title: "Smart Analytics", 
    desc: "Real-time insights and analytics help you track your application progress and optimize your internship search strategy.", 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-accent-500 to-accent-600"
  },
  { 
    title: "Global Network", 
    desc: "Access internships from top companies worldwide, from startups to Fortune 500 companies across all industries.", 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-ai-500 to-ai-600"
  },
  { 
    title: "Career Guidance", 
    desc: "Get personalized career advice, skill recommendations, and mentorship opportunities to accelerate your professional growth.", 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: "from-primary-500 via-accent-500 to-ai-500"
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-primary-400">AI-Powered Features</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
          Why Choose{" "}
          <span className="text-ai-gradient">AIIntern</span>?
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Experience the next generation of internship matching with cutting-edge AI technology 
          that understands your potential and connects you with the right opportunities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={feature.title} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group glass-card rounded-3xl p-8 floating-card hover:shadow-2xl transition-all duration-500"
          >
            {/* Icon Container */}
            <motion.div 
              className={`w-16 h-16 rounded-2xl mb-6 grid place-items-center text-white bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300 neon-glow`}
              whileHover={{ rotate: 5 }}
            >
              {feature.icon}
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-4 text-slate-100 group-hover:text-primary-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
              {feature.desc}
            </p>

            {/* Hover Effect Line */}
            <motion.div 
              className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-ai-500 mt-4 group-hover:w-full transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Additional Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-ai-gradient mb-2">98%</div>
          <div className="text-slate-400">Satisfaction Rate</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-ai-gradient mb-2">24/7</div>
          <div className="text-slate-400">AI Support</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-ai-gradient mb-2">50+</div>
          <div className="text-slate-400">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-ai-gradient mb-2">3x</div>
          <div className="text-slate-400">Faster Matching</div>
        </div>
      </motion.div>
    </section>
  );
};
  
export default Features;
  