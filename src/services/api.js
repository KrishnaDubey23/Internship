const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log(`Making API request to: ${url}`);
    console.log('Request config:', config);

    try {
      const response = await fetch(url, config);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error response:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User Authentication
  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Internships
  async getInternships() {
    return this.request('/internships');
  }

  async getInternship(internshipId) {
    return this.request(`/internships/${internshipId}`);
  }

  async createInternship(internshipData) {
    return this.request('/internships', {
      method: 'POST',
      body: JSON.stringify(internshipData),
    });
  }

  // Recommendations
  async getRecommendations(userId, topN = 10) {
    return this.request(`/recommendations?user_id=${userId}&top_n=${topN}`);
  }

  // Applications
  async applyForInternship(userId, internshipId) {
    return this.request('/apply', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        internship_id: internshipId,
      }),
    });
  }

  // Seed Data
  async seedInternships(internships) {
    return this.request('/seed_internships', {
      method: 'POST',
      body: JSON.stringify(internships),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
