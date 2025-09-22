import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProfileEnhanced = () => {
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
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
    
    // Additional Info
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

  // Enhanced steps configuration
  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information", icon: "👤" },
    { number: 2, title: "Professional", description: "Work experience", icon: "💼" },
    { number: 3, title: "Education", description: "Academic background", icon: "🎓" },
    { number: 4, title: "Skills", description: "Technical & soft skills", icon: "⚡" },
    { number: 5, title: "Preferences", description: "Job preferences", icon: "🎯" }
  ];

  // Populate form with existing user data when editing
  useEffect(() => {
    if (user && user.user_id && !isInitialized) {
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
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const handleChange = useCallback((e, section, index) => {
    const { name, value, type, checked, files } = e.target;
    
    if (section && index !== undefined) {
      // Handle array fields (education, workExperience)
      const newArray = [...formData[section]];
      newArray[index] = {
        ...newArray[index],
        [name]: type === 'checkbox' ? checked : value
      };
      setFormData(prev => ({ ...prev, [section]: newArray }));
    } else if (section) {
      // Handle array fields without index (skills, preferences)
      if (type === 'checkbox') {
        setFormData(prev => ({
          ...prev,
          [section]: checked 
            ? [...prev[section], value]
            : prev[section].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [section]: value }));
      }
    } else {
      // Handle regular fields
      if (type === 'file') {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      } else {
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      }
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formData, errors]);

  const addArrayItem = (section, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Skills helpers
  const addSkill = (skillType, skill) => {
    const trimmed = (skill || '').trim();
    if (!trimmed) return;
    setFormData(prev => ({
      ...prev,
      [skillType]: [...prev[skillType], trimmed]
    }));
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
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced input component
  const EnhancedInput = ({ label, name, type = "text", placeholder, required = false, value, onChange, error, className = "", ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-2 ${className}`}
    >
      <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full px-4 py-3 rounded-xl glass-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-lg focus:shadow-primary-500/20 ${
          error ? 'border-red-500 bg-red-500/10' : 'border-slate-600/50 focus:border-primary-500 hover:border-slate-500'
        } text-white placeholder-slate-400 backdrop-blur-sm`}
        {...props}
      />
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </motion.div>
  );

  // Enhanced select component
  const EnhancedSelect = ({ label, name, options, required = false, value, onChange, error, className = "", ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-2 ${className}`}
    >
      <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full px-4 py-3 rounded-xl glass-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:shadow-lg focus:shadow-primary-500/20 ${
          error ? 'border-red-500 bg-red-500/10' : 'border-slate-600/50 focus:border-primary-500 hover:border-slate-500'
        } text-white backdrop-blur-sm bg-slate-800/50`}
        {...props}
      >
        <option value="" className="bg-slate-800 text-slate-300">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-800 text-slate-300">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 shadow-2xl"
        >
          {/* Enhanced Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl ai-gradient flex items-center justify-center neon-glow shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-ai-gradient font-display mb-3">
              {isEditing ? 'Edit Your Profile' : 'Complete Your Profile'}
            </h1>
            <p className="text-slate-400 text-lg">Help us match you with the perfect opportunities</p>
          </motion.div>

          {/* Enhanced Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                          currentStep >= step.number 
                            ? 'bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                            : 'bg-slate-700 text-slate-400 border-2 border-slate-600'
                        }`}
                        animate={{
                          scale: currentStep === step.number ? 1.1 : 1,
                          boxShadow: currentStep === step.number ? '0 0 25px rgba(59, 130, 246, 0.6)' : 'none'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentStep > step.number ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-lg">{step.icon}</span>
                        )}
                      </motion.div>
                      <div className="mt-3 text-center">
                        <div className={`text-sm font-bold transition-colors duration-300 ${
                          currentStep >= step.number ? 'text-primary-400' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {step.description}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-6">
                        <div className={`h-1 rounded-full transition-all duration-500 ${
                          currentStep > step.number 
                            ? 'bg-gradient-to-r from-primary-400 to-primary-600' 
                            : 'bg-slate-700'
                        }`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EnhancedInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  
                  <EnhancedInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                  
                  <EnhancedInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  
                  <EnhancedInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  
                  <EnhancedInput
                    label="Location"
                    name="location"
                    placeholder="Enter your location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    error={errors.location}
                  />
                  
                  <EnhancedInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth}
                  />
                  
                  <EnhancedSelect
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                      { value: "prefer-not-to-say", label: "Prefer not to say" }
                    ]}
                    error={errors.gender}
                    className="md:col-span-2"
                  />
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EnhancedInput
                    label="Current Job Title"
                    name="currentJobTitle"
                    placeholder="e.g., Software Developer"
                    required
                    value={formData.currentJobTitle}
                    onChange={handleChange}
                    error={errors.currentJobTitle}
                  />

                  <EnhancedInput
                    label="Current Company"
                    name="currentCompany"
                    placeholder="e.g., Google, Microsoft"
                    value={formData.currentCompany}
                    onChange={handleChange}
                  />

                  <EnhancedSelect
                    label="Experience Level"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    options={[
                      { value: "entry", label: "Entry Level (0-2 years)" },
                      { value: "mid", label: "Mid Level (3-5 years)" },
                      { value: "senior", label: "Senior Level (6-10 years)" },
                      { value: "lead", label: "Lead/Principal (10+ years)" }
                    ]}
                    required
                    error={errors.experienceLevel}
                  />

                  <EnhancedSelect
                    label="Total Experience"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    options={[
                      { value: "0-1", label: "0-1 years" },
                      { value: "1-3", label: "1-3 years" },
                      { value: "3-5", label: "3-5 years" },
                      { value: "5-10", label: "5-10 years" },
                      { value: "10+", label: "10+ years" }
                    ]}
                    required
                    error={errors.totalExperience}
                  />

                  <EnhancedInput
                    label="Expected Salary"
                    name="expectedSalary"
                    placeholder="e.g., $50,000 - $70,000"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                  />

                  <EnhancedSelect
                    label="Preferred Job Type"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    options={[
                      { value: "full-time", label: "Full-time" },
                      { value: "part-time", label: "Part-time" },
                      { value: "contract", label: "Contract" },
                      { value: "internship", label: "Internship" },
                      { value: "freelance", label: "Freelance" }
                    ]}
                  />
                </div>
              )}

              {/* Step 3: Education */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Education</h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('education', { degree: "", field: "", institution: "", graduationYear: "", gpa: "" })}
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
                        <EnhancedSelect
                          label="Degree"
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index)}
                          options={[
                            { value: "high-school", label: "High School" },
                            { value: "associate", label: "Associate Degree" },
                            { value: "bachelor", label: "Bachelor's Degree" },
                            { value: "master", label: "Master's Degree" },
                            { value: "phd", label: "PhD" },
                            { value: "certificate", label: "Certificate" }
                          ]}
                        />

                        <EnhancedInput
                          label="Field of Study"
                          name="field"
                          placeholder="e.g., Computer Science"
                          value={edu.field}
                          onChange={(e) => handleChange(e, 'education', index)}
                        />

                        <EnhancedInput
                          label="Institution"
                          name="institution"
                          placeholder="e.g., Stanford University"
                          value={edu.institution}
                          onChange={(e) => handleChange(e, 'education', index)}
                        />

                        <EnhancedInput
                          label="Graduation Year"
                          name="graduationYear"
                          type="number"
                          placeholder="2023"
                          value={edu.graduationYear}
                          onChange={(e) => handleChange(e, 'education', index)}
                          min="1950"
                          max="2030"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Skills */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  {/* Technical Skills */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Technical Skills</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.technicalSkills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-300 border border-primary-500/30">
                          {skill}
                          <button type="button" onClick={() => removeSkill('technicalSkills', index)} className="ml-2 text-primary-400 hover:text-primary-300">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add technical skill (e.g., JavaScript, Python)"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); addSkill('technicalSkills', e.target.value); e.target.value = ''; }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => { const input = e.target.previousElementSibling; addSkill('technicalSkills', input.value); input.value = ''; }}
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
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300 border border-green-500/30">
                          {skill}
                          <button type="button" onClick={() => removeSkill('softSkills', index)} className="ml-2 text-green-400 hover:text-green-300">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add soft skill (e.g., Leadership, Communication)"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); addSkill('softSkills', e.target.value); e.target.value = ''; }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => { const input = e.target.previousElementSibling; addSkill('softSkills', input.value); input.value = ''; }}
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
                      {formData.languages.map((lang, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {lang}
                          <button type="button" onClick={() => removeSkill('languages', index)} className="ml-2 text-blue-400 hover:text-blue-300">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add language (e.g., English, Spanish)"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder-slate-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); addSkill('languages', e.target.value); e.target.value = ''; }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => { const input = e.target.previousElementSibling; addSkill('languages', input.value); input.value = ''; }}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EnhancedSelect
                      label="Preferred Company Size"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      options={[
                        { value: "startup", label: "Startup (1-50 employees)" },
                        { value: "small", label: "Small (51-200 employees)" },
                        { value: "medium", label: "Medium (201-1000 employees)" },
                        { value: "large", label: "Large (1000+ employees)" },
                        { value: "enterprise", label: "Enterprise (5000+ employees)" }
                      ]}
                    />

                    <EnhancedSelect
                      label="Work Location Preference"
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleChange}
                      options={[
                        { value: "remote", label: "Remote" },
                        { value: "hybrid", label: "Hybrid" },
                        { value: "onsite", label: "On-site" },
                        { value: "flexible", label: "Flexible" }
                      ]}
                    />
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
                      <label className="ml-3 text-sm text-slate-300">Open to remote work opportunities</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="willingToRelocate"
                        checked={formData.willingToRelocate}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-500 bg-slate-800 border-slate-600 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <label className="ml-3 text-sm text-slate-300">Willing to relocate for the right opportunity</label>
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
                    <EnhancedInput
                      label="LinkedIn Profile"
                      name="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />

                    <EnhancedInput
                      label="GitHub Profile"
                      name="github"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1 
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                      : 'glass-button text-white hover:scale-105'
                  }`}
                  whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
                >
                  Previous
                </motion.button>

                {currentStep < 5 ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    className="glass-button px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="glass-button px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isEditing ? "Updating Profile..." : "Creating Profile..."}
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
    </div>
  );
};

export default ProfileEnhanced;

