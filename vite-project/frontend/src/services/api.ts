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
  role?: string;
  message?: string;
}

export interface User {
  email: string;
  role?: string;
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

    const data = await response.json();
    
    // Store token, email and role
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', credentials.email);
      
      if (data.role) {
        localStorage.setItem('role', data.role);
      }
    }

    return data;
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

// Add this to api.ts
export const logoutUser = (): void => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  
  // Redirect to the login page
  window.location.href = '#/login';
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  
  if (!token || !email) return null;
  
  return { email, role: role || 'RESEARCHER' };
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Get all users (for admin)
export const fetchAllUsers = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Update a user's role (for admin)
export const updateUserRole = async (email: string, role: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/users/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ email, role })
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error updating role:", error);
    return false;
  }
};