// Simple API test utility
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_BASE_URL);
    
    // Test basic connectivity
    const response = await fetch(`${API_BASE_URL}/docs`);
    console.log('API docs response status:', response.status);
    
    if (response.ok) {
      console.log('✅ API is running and accessible');
      return true;
    } else {
      console.log('❌ API returned error status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ API connection failed:', error);
    console.log('Possible issues:');
    console.log('1. Backend server is not running');
    console.log('2. CORS issues');
    console.log('3. Wrong API URL');
    console.log('4. Network connectivity issues');
    return false;
  }
};

export const testRegisterEndpoint = async () => {
  try {
    console.log('Testing register endpoint...');
    
    const testData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "",
      location: "",
      dateOfBirth: "",
      gender: "",
      currentJobTitle: "",
      currentCompany: "",
      experienceLevel: "",
      totalExperience: "",
      expectedSalary: "",
      jobType: "",
      workLocation: "",
      education: [],
      technicalSkills: [],
      softSkills: [],
      languages: [],
      workExperience: [],
      bio: "",
      portfolio: "",
      linkedin: "",
      github: "",
      website: "",
      jobPreferences: [],
      industryPreferences: [],
      companySize: "",
      remoteWork: false,
      willingToRelocate: false
    };
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Register endpoint response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Register endpoint working:', data);
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log('❌ Register endpoint error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('❌ Register endpoint test failed:', error);
    return false;
  }
};
