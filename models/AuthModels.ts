/**
 * Authentication interface models
 * These interfaces match the DTO structures expected by the ASP.NET 8 backend
 */

// Login request model
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Registration request model
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

// Password reset request model
export interface PasswordResetRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Forgot password request model
export interface ForgotPasswordRequest {
  email: string;
}

// Two-factor authentication verification model
export interface TwoFactorVerificationRequest {
  code: string;
  rememberDevice?: boolean;
}

// User profile model
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  twoFactorEnabled: boolean;
}

// Authentication response from the API
export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
  requiresTwoFactor?: boolean;
}

// Google authentication request
export interface GoogleAuthRequest {
  idToken: string;
}
