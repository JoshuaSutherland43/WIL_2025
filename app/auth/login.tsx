/**
 * Login Screen
 * Allows users to login with email/password or Google
 * Integrates with ASP.NET Auth API for authentication
 */

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GOOGLE_AUTH } from '@/constants/Config';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AuthService from '@/services/AuthService';
import { useAuth } from '@/contexts/AuthContext';

// Required for Google Auth
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Google Auth setup
  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    clientId: GOOGLE_AUTH.CLIENT_ID,
    redirectUri: GOOGLE_AUTH.REDIRECT_URI,
  });

  // Handle standard email/password login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await AuthService.login({
        email,
        password,
        rememberMe
      });
      
      // If 2FA is required, redirect to 2FA page with token
      if (response.requiresTwoFactor) {
        (router as any).push(`/auth/two-factor?token=${response.token}`);
        return;
      }
      
      // Otherwise complete login
      await login(response.token, response.user);
      (router as any).replace('/(tabs)');
      
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    try {
      const result = await promptGoogleAsync();
      
      if (result.type === 'success') {
        setIsLoading(true);
        const { id_token } = result.params;
        
        const response = await AuthService.googleLogin({ idToken: id_token });
        
        // Handle 2FA if needed
        if (response.requiresTwoFactor) {
          (router as any).push(`/auth/two-factor?token=${response.token}`);
          return;
        }
        
        await login(response.token, response.user);
        (router as any).replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Google Sign-In Error', error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/icon.png')} 
          style={styles.logo} 
        />
        <ThemedText type="title" style={styles.title}>Horse Trail App</ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={22} 
              color="#777" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.rememberForgot}>
          <TouchableOpacity 
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[
              styles.checkbox, 
              rememberMe && styles.checkboxChecked
            ]}>
              {rememberMe && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <ThemedText style={styles.rememberText}>Remember me</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => (router as any).push('/auth/forgot-password')}>
            <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
          )}
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>or</ThemedText>
          <View style={styles.dividerLine} />
        </View>
        
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={isLoading || !googleRequest}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <ThemedText style={styles.googleButtonText}>Sign in with Google</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Don't have an account?</ThemedText>
        <TouchableOpacity onPress={() => (router as any).push('/auth/register')}>
          <ThemedText style={styles.signupText}>Sign Up</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0a7ea4',
  },
  rememberText: {
    fontSize: 14,
    color: '#555',
  },
  forgotText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#0a7ea4',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
  },
  signupText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
