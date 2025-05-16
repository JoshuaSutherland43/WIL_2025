/**
 * Configuration file for environment-specific settings
 * Contains API endpoints, authentication settings, and other environment variables
 */

// TODO: Replace localhost URL with actual production API endpoint before deployment
// TODO: Consider using environment variables for different environments (dev/staging/prod)
export const API_BASE_URL = 'https://localhost:5001/api'; // Update with your ASP.NET API URL in production

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  GOOGLE_LOGIN: `${API_BASE_URL}/auth/google`,
  FORGOT_PASSWORD: `${API_BASE_URL}/account/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/account/reset-password`,
  VERIFY_2FA: `${API_BASE_URL}/twofactor/verify`,
  SETUP_2FA: `${API_BASE_URL}/twofactor/setup`,
  // TODO: Add endpoints for refreshing tokens
  // TODO: Add endpoints for user profile management
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  UNIT_PREFERENCES: 'unit_preferences',
  // TODO: Add keys for storing user preferences and app settings
};

// Google Auth
export const GOOGLE_AUTH = {
  // TODO: Replace placeholder values with actual Google OAuth credentials
  CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID', 
  REDIRECT_URI: 'YOUR_REDIRECT_URI',
};

// App Configuration
export const APP_CONFIG = {
  DEFAULT_LOCATION: 'Sardinia Bay, Eastern Cape, South Africa',
  DEFAULT_LATITUDE: -33.9833,
  DEFAULT_LONGITUDE: 25.5000,
  DEFAULT_ZOOM: 12,
  TEMPERATURE_UNIT: 'C', // Celsius for South Africa
  DISTANCE_UNIT: 'km', // Kilometers for South Africa
  LOCALE: 'en-ZA', // South African English
  TIMEZONE: 'Africa/Johannesburg',
  // TODO: Add additional South African region-specific configurations
  // TODO: Consider adding support for multiple languages (English/Afrikaans/Zulu)
};
