/**
 * API Service
 * Core service for making authenticated API calls to the backend
 * Handles token management, authentication, and request/response formatting
 * 
 * TODO: Implement token refresh mechanism
 * TODO: Add request caching for offline support
 * TODO: Add request queuing for poor connectivity areas in South Africa
 * TODO: Implement proper error handling and retry logic
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS } from '@/constants/Config';

// TODO: Add request interceptors for logging and debugging
// TODO: Add response interceptors for global error handling
// TODO: Implement rate limiting protection

class ApiService {
  /**
   * Make an authenticated API request
   */
  async request<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    requiresAuth: boolean = true
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error('Authentication required but no token found');
      }
    }

    // TODO: Add device information headers for analytics
    // TODO: Add language preference headers for localization

    const config: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    // TODO: Implement network connectivity check before making request
    // TODO: Add timeout handling for slow connections
    
    const response = await fetch(url, config);
    
    // Handle unauthorized errors (token expired)
    if (response.status === 401) {
      // TODO: Implement token refresh here
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      throw new Error('Unauthorized - please login again');
    }

    // TODO: Handle specific HTTP error codes with custom error messages
    // TODO: Implement retry logic for server errors (5xx)

    // Parse JSON response
    let responseData: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Handle error responses
    if (!response.ok) {
      const message = typeof responseData === 'object' && responseData.message 
        ? responseData.message 
        : 'An unknown error occurred';
      throw new Error(message);
    }

    return responseData as T;
  }

  // Convenience methods for different HTTP verbs
  async get<T>(endpoint: string, requiresAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, requiresAuth);
  }

  async post<T>(endpoint: string, data: any, requiresAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, requiresAuth);
  }

  async put<T>(endpoint: string, data: any, requiresAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, requiresAuth);
  }

  async delete<T>(endpoint: string, requiresAuth: boolean = true): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, requiresAuth);
  }
}

export default new ApiService();
