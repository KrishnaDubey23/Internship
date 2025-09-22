import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/api";

const internships = [
  { 
    company: "Google", 
    role: "AI/ML Engineering Intern", 
    location: "Mountain View, CA", 
    match: 95, 
    type: "Full-time",
    duration: "12 weeks",
    salary: "$8,000/month",
    skills: ["Python", "TensorFlow", "Machine Learning"],
    description: "Work on cutting-edge AI projects with Google's research team."
  },
  { 
    company: "Microsoft", 
    role: "Software Engineering Intern", 
    location: "Seattle, WA", 
    match: 88, 
    type: "Full-time",
    duration: "16 weeks",
    salary: "$7,500/month",
    skills: ["C#", "Azure", "React"],
    description: "Develop innovative solutions using Microsoft's latest technologies."
  },
  { 
    company: "Tesla", 
    role: "Autonomous Vehicle Intern", 
    location: "Austin, TX", 
    match: 92, 
    type: "Full-time",
    duration: "20 weeks",
    salary: "$9,000/month",
    skills: ["C++", "Computer Vision", "Robotics"],
    description: "Contribute to Tesla's autonomous driving technology development."
  },
  { 
    company: "OpenAI", 
    role: "Research Intern", 
    location: "San Francisco, CA", 
    match: 90, 
    type: "Full-time",
    duration: "24 weeks",
    salary: "$10,000/month",
    skills: ["Python", "PyTorch", "NLP"],
    description: "Research and develop next-generation AI models and algorithms."
  },
  { 
    company: "Meta", 
    role: "VR/AR Intern", 
    location: "Menlo Park, CA", 
    match: 85, 
    type: "Full-time",
    duration: "16 weeks",
    salary: "$8,500/month",
    skills: ["Unity", "C#", "3D Graphics"],
    description: "Build immersive experiences for the metaverse."
  },
  { 
    company: "Netflix", 
    role: "Data Science Intern", 
    location: "Los Gatos, CA", 
    match: 87, 
    type: "Full-time",
    duration: "12 weeks",
    salary: "$7,800/month",
    skills: ["Python", "SQL", "Statistics"],
    description: "Analyze user behavior and improve recommendation algorithms."
  }
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getRecommendations(user.user_id, 15);
        setInternships(response.recommendations || []);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setError('Failed to load recommendations. Please try again.');
        // Fallback to mock data if API fails
        setInternships([
          { 
            company: "Google", 
            title: "AI/ML Engineering Intern", 
            location: "Mountain View, CA", 
            match: 95, 
            jobType: "internship",
            duration: "12 weeks",
            salary: "$8,000/month",
            skills: ["Python", "TensorFlow", "Machine Learning"],
            description: "Work on cutting-edge AI projects with Google's research team."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, isAuthenticated]);

  return (
    <section id="dashboard" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-ai-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium text-primary-400">AI-Powered Recommendations</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          Your <span className="text-ai-gradient">Perfect Matches</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {isAuthenticated 
            ? "Our AI has analyzed your profile and found the best internship opportunities tailored specifically to your skills and career goals."
            : "Sign in to see personalized internship recommendations based on your profile."
          }
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {['All', 'High Match', 'Remote', 'Full-time'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter.toLowerCase().replace('-', ''))}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedFilter === filter.toLowerCase().replace('-', '') || 
              (filter === 'All' && selectedFilter === 'all')
                ? 'glass-button text-white'
                : 'glass-card text-slate-300 hover:text-primary-400 hover:bg-white/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-xl glass-card">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-slate-300">Loading personalized recommendations...</span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-xl glass-card border border-red-500/20">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-400">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Not Authenticated State */}
      {!isAuthenticated && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="max-w-md mx-auto glass-card p-8 rounded-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl ai-gradient flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In Required</h3>
            <p className="text-slate-300 mb-6">Create an account and complete your profile to see personalized internship recommendations.</p>
            <div className="flex gap-3">
              <a href="/signup" className="flex-1 glass-button py-3 rounded-xl font-semibold text-white text-center">
                Sign Up
              </a>
              <a href="/login" className="flex-1 px-4 py-3 glass-card rounded-xl text-slate-300 hover:text-primary-400 transition-colors text-center">
                Sign In
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Internship Cards */}
      {!loading && !error && isAuthenticated && (
        <>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {internships.map((job, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-card rounded-3xl p-8 floating-card hover:shadow-2xl transition-all duration-500"
            >
              {/* Company Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl ai-gradient flex items-center justify-center text-white font-bold text-lg">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">{job.company}</h3>
                    <p className="text-slate-400">{job.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ai-gradient">{job.match}%</div>
                  <div className="text-sm text-slate-400">AI Match</div>
                </div>
              </div>

              {/* Role and Details */}
              <h4 className="text-xl font-semibold text-slate-100 mb-3">{job.title}</h4>
              <p className="text-slate-300 mb-6 leading-relaxed">{job.description}</p>

              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card rounded-xl p-3">
                  <div className="text-sm text-slate-400">Duration</div>
                  <div className="font-semibold text-slate-100">{job.duration}</div>
                </div>
                <div className="glass-card rounded-xl p-3">
                  <div className="text-sm text-slate-400">Salary</div>
                  <div className="font-semibold text-slate-100">{job.salary}</div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="text-sm text-slate-400 mb-3">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Match Score</span>
                  <span className="text-sm font-medium text-ai-gradient">{job.match}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${job.match}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-2 rounded-full ai-gradient"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 glass-button py-3 rounded-xl font-semibold text-white"
                >
                  Apply Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 glass-card rounded-xl text-slate-300 hover:text-primary-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
          </div>

          {/* Load More Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-8 py-4 rounded-2xl font-semibold text-white text-lg"
            >
              Load More Opportunities
            </motion.button>
          </motion.div>
        </>
      )}
    </section>
  );
};
  
export default Dashboard;
  