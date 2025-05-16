/**
 * Two-Factor Authentication Screen
 * Handles 2FA code verification after initial login
 * Integrates with ASP.NET Auth API's 2FA functionality
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AuthService from '@/services/AuthService';
import { useAuth } from '@/contexts/AuthContext';

export default function TwoFactorScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: string }>();
  const { login } = useAuth();
  
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Code input refs for focusing next input
  const inputRefs = Array(6).fill(0).map(() => useRef<TextInput>(null));
  
  // Handle verification code input
  const handleCodeChange = (text: string, index: number) => {
    // Update code state
    const newCode = code.split('');
    newCode[index] = text;
    setCode(newCode.join(''));
    
    // Move to next input if available
    if (text !== '' && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  // Handle verifying code
  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await AuthService.verifyTwoFactor({
        code,
        rememberDevice,
      }, token);
      
      await login(response.token, response.user);
      router.replace('/(tabs)');
      
    } catch (error) {
      Alert.alert('Verification Failed', error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={80} color="#0a7ea4" />
        </View>
        
        <ThemedText type="title" style={styles.title}>Two-Factor Authentication</ThemedText>
        
        <ThemedText style={styles.subtitle}>
          Enter the 6-digit code from your authenticator app to verify your identity.
        </ThemedText>
        
        <View style={styles.codeInputContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.codeInput}
              value={code[index] || ''}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectionColor="#0a7ea4"
            />
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.rememberContainer}
          onPress={() => setRememberDevice(!rememberDevice)}
        >
          <View style={[
            styles.checkbox, 
            rememberDevice && styles.checkboxChecked
          ]}>
            {rememberDevice && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <ThemedText style={styles.rememberText}>Remember this device for 30 days</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.verifyButton, isLoading && styles.disabledButton]}
          onPress={handleVerifyCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText style={styles.verifyButtonText}>Verify</ThemedText>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.helpButton}>
          <ThemedText style={styles.helpButtonText}>Need help?</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '80%',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  codeInput: {
    width: 50,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
  verifyButton: {
    backgroundColor: '#0a7ea4',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    marginTop: 16,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonText: {
    color: '#0a7ea4',
    fontSize: 16,
    fontWeight: '500',
  },
});
