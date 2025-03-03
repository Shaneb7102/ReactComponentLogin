// Define types for API requests and responses
export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string; // Optional for your current backend
  }
  
  export interface AuthResponse {
    token: string;
    email: string;
    message?: string;
  }
  
  const API_URL = 'http://localhost:8080/api/auth';
  
  // Login function
  export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        return null;
      }
  
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };
  
  // Register function
  export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse | null> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        return null;
      }
  
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  };
  
  // Example of a protected API call (requires token)
  export const fetchProtectedData = async (): Promise<any> => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const response = await fetch(`${API_URL}/protected-endpoint`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch protected data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching protected data:', error);
      throw error;
    }
  };