/**
 * Authentication Service
 * Handles API calls related to authentication
 * Connects to ASP.NET backend authentication endpoints
 */

import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  ForgotPasswordRequest,
  PasswordResetRequest,
  GoogleAuthRequest,
  TwoFactorVerificationRequest
} from '@/models/AuthModels';
import { AUTH_ENDPOINTS } from '@/constants/Config';

// TODO: Implement token refresh mechanism for expired tokens
// TODO: Add offline authentication support for when the network is unavailable
// TODO: Implement token storage security improvements

// API wrapper for authentication endpoints
class AuthService {
  
  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // TODO: Add proper error handling for different error codes from backend
    // TODO: Implement proper validation before sending request
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // TODO: Add validation for password strength and email format
    // TODO: Implement captcha or other anti-bot measures
    const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  }

  /**
   * Send password reset link
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    // TODO: Add rate limiting to prevent abuse
    const response = await fetch(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send password reset email');
    }
  }

  /**
   * Reset password using token
   */
  async resetPassword(request: PasswordResetRequest): Promise<void> {
    // TODO: Implement client-side password validation
    const response = await fetch(AUTH_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to reset password');
    }
  }

  /**
   * Login with Google
   */
  // TODO: Implement proper Google OAuth flow integration
  async googleLogin(request: GoogleAuthRequest): Promise<AuthResponse> {
    const response = await fetch(AUTH_ENDPOINTS.GOOGLE_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Google login failed');
    }

    return await response.json();
  }

  /**
   * Verify 2FA code
   */
  async verifyTwoFactor(request: TwoFactorVerificationRequest, token: string): Promise<AuthResponse> {
    const response = await fetch(AUTH_ENDPOINTS.VERIFY_2FA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '2FA verification failed');
    }

    return await response.json();
  }
}

export default new AuthService();
