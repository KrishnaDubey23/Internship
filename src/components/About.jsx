import { motion } from "framer-motion";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & AI Research Lead",
      image: "SC",
      bio: "Former Google AI researcher with 15+ years in machine learning and neural networks."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder",
      image: "MR",
      bio: "Ex-Microsoft engineer specializing in scalable AI systems and distributed computing."
    },
    {
      name: "Dr. Priya Patel",
      role: "Head of Data Science",
      image: "PP",
      bio: "Stanford PhD in Computer Science, expert in recommendation systems and NLP."
    },
    {
      name: "Alex Kim",
      role: "Lead Product Designer",
      image: "AK",
      bio: "Former Apple designer focused on creating intuitive AI-powered user experiences."
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI technology to create better matching experiences.",
      icon: "🚀"
    },
    {
      title: "Student-Centric",
      description: "Every feature we build is designed with students' success and career growth in mind.",
      icon: "🎓"
    },
    {
      title: "Transparency",
      description: "We believe in open communication about how our AI works and makes decisions.",
      icon: "🔍"
    },
    {
      title: "Global Impact",
      description: "Connecting talent worldwide to create opportunities that transcend borders.",
      icon: "🌍"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-primary-400">Our Story</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          Revolutionizing <span className="text-ai-gradient">Internship Matching</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
          Founded by a team of AI researchers and industry veterans, AIIntern is on a mission to 
          democratize access to quality internship opportunities through cutting-edge artificial intelligence.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-12 mb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-100 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              We believe that every student deserves access to meaningful internship opportunities 
              that align with their skills, interests, and career aspirations. Our AI-powered platform 
              eliminates the traditional barriers in internship matching, making the process more 
              efficient, fair, and successful for everyone involved.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-ai-gradient mb-2">50K+</div>
                <div className="text-slate-400">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ai-gradient mb-2">95%</div>
                <div className="text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-80 rounded-2xl ai-gradient flex items-center justify-center">
              <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center floating-card"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{value.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-slate-100 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center floating-card"
            >
              <div className="w-20 h-20 rounded-full ai-gradient flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {member.image}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{member.name}</h3>
              <p className="text-primary-400 font-medium mb-3">{member.role}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
  
export default About;
  