import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
    gender: "",
    
    // Professional Information
    currentJobTitle: "",
    currentCompany: "",
    experienceLevel: "",
    totalExperience: "",
    expectedSalary: "",
    jobType: "",
    workLocation: "",
    
    // Education
    education: [{
      degree: "",
      field: "",
      institution: "",
      graduationYear: "",
      gpa: ""
    }],
    
    // Skills
    technicalSkills: [],
    softSkills: [],
    languages: [],
    
    // Work Experience
    workExperience: [{
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }],
    
    // Additional Information
    bio: "",
    portfolio: "",
    linkedin: "",
    github: "",
    website: "",
    resume: null,
    
    // Preferences
    jobPreferences: [],
    industryPreferences: [],
    companySize: "",
    remoteWork: false,
    willingToRelocate: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Populate form with existing user data when editing
  useEffect(() => {
    if (user && user.user_id) {
      setIsEditing(true);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        currentJobTitle: user.currentJobTitle || "",
        currentCompany: user.currentCompany || "",
        experienceLevel: user.experienceLevel || "",
        totalExperience: user.totalExperience || "",
        expectedSalary: user.expectedSalary || "",
        jobType: user.jobType || "",
        workLocation: user.workLocation || "",
        education: user.education || [{
          degree: "",
          field: "",
          institution: "",
          graduationYear: "",
          gpa: ""
        }],
        technicalSkills: user.technicalSkills || [],
        softSkills: user.softSkills || [],
        languages: user.languages || [],
        workExperience: user.workExperience || [{
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: ""
        }],
        bio: user.bio || "",
        portfolio: user.portfolio || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        website: user.website || "",
        jobPreferences: user.jobPreferences || [],
        industryPreferences: user.industryPreferences || [],
        companySize: user.companySize || "",
        remoteWork: user.remoteWork || false,
        willingToRelocate: user.willingToRelocate || false
      });
    }
  }, [user]);

  const handleChange = (e, section, index) => {
    const { name, value, type, checked, files } = e.target;
    
    if (section && index !== undefined) {
      // Handle array fields (education, workExperience)
      const newArray = [...formData[section]];
      newArray[index] = {
        ...newArray[index],
        [name]: type === 'checkbox' ? checked : value
      };
      setFormData(prev => ({
        ...prev,
        [section]: newArray
      }));
    } else if (section) {
      // Handle array fields without index (skills, preferences)
      setFormData(prev => ({
        ...prev,
        [section]: type === 'checkbox' ? checked : value
      }));
    } else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const addArrayItem = (section) => {
    const newItem = section === 'education' 
      ? { degree: "", field: "", institution: "", graduationYear: "", gpa: "" }
      : { company: "", position: "", startDate: "", endDate: "", current: false, description: "" };
    
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skillType, skill) => {
    if (skill.trim()) {
      setFormData(prev => ({
        ...prev,
        [skillType]: [...prev[skillType], skill.trim()]
      }));
    }
  };

  const removeSkill = (skillType, index) => {
    setFormData(prev => ({
      ...prev,
      [skillType]: prev[skillType].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    }
    
    if (step === 2) {
      if (!formData.currentJobTitle.trim()) newErrors.currentJobTitle = "Current job title is required";
      if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required";
      if (!formData.totalExperience) newErrors.totalExperience = "Total experience is required";
    }
    
    if (step === 3) {
      if (formData.education.length === 0) newErrors.education = "At least one education entry is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      alert("Profile updated successfully! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Profile update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information" },
    { number: 2, title: "Professional", description: "Work experience" },
    { number: 3, title: "Education", description: "Academic background" },
    { number: 4, title: "Skills", description: "Technical & soft skills" },
    { number: 5, title: "Preferences", description: "Job preferences" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-900 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl ai-gradient flex items-center justify-center neon-glow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-ai-gradient font-display mb-2">
            {isEditing ? 'Edit Your Profile' : 'Complete Your Profile'}
          </h1>
          <p className="text-slate-400">Help us match you with the perfect opportunities</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-card p-6 rounded-2xl mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'border-primary-500 bg-primary-500 text-white' 
                    : 'border-slate-600 text-slate-400'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-primary-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass-card p-8 rounded-2xl"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.firstName ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white placeholder-slate-400`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl glass-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-lg focus:shadow-primary-500/20 ${
                        errors.lastName ? 'border-red-500 bg-red-500/10' : 'border-slate-600/50 focus:border-primary-500 hover:border-slate-500'
                      } text-white placeholder-slate-400 backdrop-blur-sm`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.email ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white placeholder-slate-400`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.phone ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white placeholder-slate-400`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.location ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white placeholder-slate-400`}
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Professional Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Job Title *</label>
                    <input
                      type="text"
                      name="currentJobTitle"
                      value={formData.currentJobTitle}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.currentJobTitle ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white placeholder-slate-400`}
                      placeholder="e.g., Software Developer"
                    />
                    {errors.currentJobTitle && <p className="mt-1 text-sm text-red-400">{errors.currentJobTitle}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Company</label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level *</label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.experienceLevel ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white`}
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6-10 years)</option>
                      <option value="lead">Lead/Principal (10+ years)</option>
                    </select>
                    {errors.experienceLevel && <p className="mt-1 text-sm text-red-400">{errors.experienceLevel}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Total Experience *</label>
                    <select
                      name="totalExperience"
                      value={formData.totalExperience}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.totalExperience ? 'border-red-500' : 'border-slate-600 focus:border-primary-500'
                      } text-white`}
                    >
                      <option value="">Select total experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.totalExperience && <p className="mt-1 text-sm text-red-400">{errors.totalExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Expected Salary</label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      placeholder="e.g., $50,000 - $70,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Job Type</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white"
                    >
                      <option value="">Select job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Education</h2>
                  <button
                    type="button"
                    onClick={() => addArrayItem('education')}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Add Education
                  </button>
                </div>

                {formData.education.map((edu, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Degree *</label>
                        <select
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white"
                        >
                          <option value="">Select degree</option>
                          <option value="high-school">High School</option>
                          <option value="associate">Associate Degree</option>
                          <option value="bachelor">Bachelor's Degree</option>
                          <option value="master">Master's Degree</option>
                          <option value="phd">PhD</option>
                          <option value="certificate">Certificate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Field of Study *</label>
                        <input
                          type="text"
                          name="field"
                          value={edu.field}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                          placeholder="e.g., Computer Science"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Institution *</label>
                        <input
                          type="text"
                          name="institution"
                          value={edu.institution}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                          placeholder="e.g., Stanford University"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Graduation Year</label>
                        <input
                          type="number"
                          name="graduationYear"
                          value={edu.graduationYear}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                          placeholder="2023"
                          min="1950"
                          max="2030"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Skills */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
                
                {/* Technical Skills */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Technical Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.technicalSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-300 border border-primary-500/30"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('technicalSkills', index)}
                          className="ml-2 text-primary-400 hover:text-primary-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add technical skill (e.g., JavaScript, Python)"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill('technicalSkills', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        addSkill('technicalSkills', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Soft Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.softSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300 border border-green-500/30"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('softSkills', index)}
                          className="ml-2 text-green-400 hover:text-green-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add soft skill (e.g., Leadership, Communication)"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill('softSkills', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        addSkill('softSkills', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.languages.map((language, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {language}
                        <button
                          type="button"
                          onClick={() => removeSkill('languages', index)}
                          className="ml-2 text-blue-400 hover:text-blue-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add language (e.g., English, Spanish)"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill('languages', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        addSkill('languages', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Preferences */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Job Preferences</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Company Size</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white"
                    >
                      <option value="">Select company size</option>
                      <option value="startup">Startup (1-50 employees)</option>
                      <option value="small">Small (51-200 employees)</option>
                      <option value="medium">Medium (201-1000 employees)</option>
                      <option value="large">Large (1000+ employees)</option>
                      <option value="enterprise">Enterprise (5000+ employees)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Work Location Preference</label>
                    <select
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white"
                    >
                      <option value="">Select work location</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-site</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="remoteWork"
                      checked={formData.remoteWork}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-500 bg-slate-800 border-slate-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label className="ml-3 text-sm text-slate-300">
                      Open to remote work opportunities
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="willingToRelocate"
                      checked={formData.willingToRelocate}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-500 bg-slate-800 border-slate-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label className="ml-3 text-sm text-slate-300">
                      Willing to relocate for the right opportunity
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Bio/Summary</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                    placeholder="Tell us about yourself, your career goals, and what makes you unique..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Profile</label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-primary-500 hover:text-primary-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>

              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-button px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-button px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Profile...
                    </div>
                  ) : (
                    isEditing ? "Update Profile" : "Complete Profile"
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
