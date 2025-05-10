import axios from 'axios';
import type { UserLogin } from '../interfaces/UserLogin.js';

const API_BASE_URL = 'http://localhost:3000'; // Or your actual server endpoint



interface SignupRequest {
  username: string;
  password: string;
  email: string;
}

// Function to log in a user
export async function login(loginData: UserLogin) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    // Assuming the response contains a token
    const { token } = response.data;
    // Save the token locally (e.g., in localStorage)
    localStorage.setItem('authToken', token);
     token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Function to sign up a new user
export async function signup(details: SignupRequest) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, details);
    return response.data; // Return success message or created user data
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
}

// Function to log out a user
export function logout() {
  try {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

// Function to fetch the currently authenticated user
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the user's data
  } catch (error) {
    console.error('Failed to fetch the current user:', error);
    throw error;
  }
}

// Function to check if the user is authenticated
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('authToken');
  return !!token; // Returns true if the token exists
}