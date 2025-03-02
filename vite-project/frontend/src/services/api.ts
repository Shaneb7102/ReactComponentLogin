import axios from "axios";

// Define API base URL (Spring Boot backend)
const API_URL = "http://localhost:8080/api/auth";

// Define TypeScript interface for user credentials
export interface LoginCredentials {
    email: string;
    password: string;
}

// Define TypeScript interface for API response
export interface LoginResponse {
    token: string;
}

// Function to login user
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        return null;
    }
};
