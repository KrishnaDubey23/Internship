import { motion } from "framer-motion";

const Corporates = () => {
  const features = [
    {
      title: "AI-Powered Candidate Matching",
      description: "Our advanced algorithms analyze candidate profiles and match them with your specific requirements, saving you hours of screening time.",
      icon: "🎯"
    },
    {
      title: "Quality Assurance",
      description: "Every candidate is pre-screened and verified, ensuring you only interview qualified candidates who are genuinely interested.",
      icon: "✅"
    },
    {
      title: "Real-time Analytics",
      description: "Track your hiring metrics, candidate engagement, and success rates with our comprehensive dashboard and reporting tools.",
      icon: "📊"
    },
    {
      title: "Global Talent Pool",
      description: "Access a diverse pool of talented students from top universities worldwide, expanding your reach beyond local candidates.",
      icon: "🌍"
    }
  ];

  const testimonials = [
    {
      company: "TechCorp",
      name: "Sarah Johnson",
      role: "HR Director",
      quote: "AIIntern helped us find 3 amazing interns in just 2 weeks. The AI matching was incredibly accurate!",
      rating: 5
    },
    {
      company: "StartupXYZ",
      name: "Mike Chen",
      role: "Founder",
      quote: "The quality of candidates we received was outstanding. We've hired 2 full-time employees from our interns.",
      rating: 5
    },
    {
      company: "GlobalTech",
      name: "Emily Rodriguez",
      role: "Talent Acquisition",
      quote: "The platform is intuitive and the AI recommendations are spot-on. It's revolutionized our internship program.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small teams",
      features: [
        "Up to 5 internship postings",
        "Basic AI matching",
        "Email support",
        "Standard analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$99/month",
      description: "For growing companies",
      features: [
        "Unlimited internship postings",
        "Advanced AI matching",
        "Priority support",
        "Advanced analytics",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "White-label solution"
      ],
      popular: false
    }
  ];

  return (
    <section id="corporates" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-primary-400">For Companies</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          Find Your Next <span className="text-ai-gradient">Star Intern</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Stop wasting time on manual candidate screening. Our AI-powered platform connects you with 
          the most qualified interns who match your specific requirements and company culture.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-button px-8 py-4 rounded-2xl font-semibold text-white text-lg"
        >
          Start Hiring Today
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">Why Choose AIIntern?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center floating-card"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">What Companies Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 floating-card"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-slate-100">{testimonial.name}</div>
                <div className="text-sm text-primary-400">{testimonial.role}, {testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card rounded-3xl p-8 floating-card relative ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-ai-gradient mb-2">{plan.price}</div>
                <p className="text-slate-400">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-300">
                    <svg className="w-5 h-5 text-ai-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'glass-button text-white' 
                    : 'glass-card text-slate-300 hover:text-primary-400 hover:bg-white/5'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-12 text-center"
      >
        <h2 className="text-4xl font-bold text-slate-100 mb-6">Ready to Transform Your Hiring?</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Join hundreds of companies already using AIIntern to find their next generation of talent. 
          Start your free trial today and experience the future of recruitment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button px-8 py-4 rounded-2xl font-semibold text-white text-lg"
          >
            Start Free Trial
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl font-semibold text-slate-300 border border-slate-600 hover:border-primary-500 hover:text-primary-400 transition-all duration-300"
          >
            Schedule Demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
  
export default Corporates;
  