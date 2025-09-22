import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      description: "Get in touch with our team",
      contact: "hello@aiintern.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      description: "Speak with our support team",
      contact: "+1 (555) 123-4567"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      description: "Come say hello at our office",
      contact: "San Francisco, CA"
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-primary-400">Get in Touch</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          Let's <span className="text-ai-gradient">Connect</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Have questions about AIIntern? Want to partner with us? We'd love to hear from you. 
          Our team is here to help you succeed.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Get in Touch</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Ready to revolutionize your internship search? Our AI-powered platform is here to help 
              you find the perfect match. Contact us today to get started.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 floating-card"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl ai-gradient flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{info.title}</h3>
                    <p className="text-slate-300 mb-2">{info.description}</p>
                    <p className="text-primary-400 font-medium">{info.contact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-slate-100 placeholder-slate-400 focus:border-primary-500 focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-slate-100 placeholder-slate-400 focus:border-primary-500 focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you" 
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-slate-100 placeholder-slate-400 focus:border-primary-500 focus:outline-none resize-none transition-colors" 
                />
              </div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full glass-button py-4 rounded-xl font-semibold text-white text-lg"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24"
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "How does the AI matching work?",
              answer: "Our AI analyzes your skills, preferences, and career goals to find the best internship matches using advanced machine learning algorithms."
            },
            {
              question: "Is AIIntern free for students?",
              answer: "Yes! Our platform is completely free for students. We believe in democratizing access to quality internship opportunities."
            },
            {
              question: "How accurate are the AI recommendations?",
              answer: "Our AI has a 95% success rate in matching students with relevant internships, based on our extensive testing and user feedback."
            },
            {
              question: "Can companies post internships on AIIntern?",
              answer: "Absolutely! We welcome companies of all sizes to post their internship opportunities and benefit from our AI-powered candidate matching."
            }
          ].map((faq, index) => (
            <motion.div 
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 floating-card"
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{faq.question}</h3>
              <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
  
export default Contact;
  