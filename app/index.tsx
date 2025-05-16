/**
 * Root Index Redirect
 * Entry point for the application that redirects based on authentication state
 */

import { Redirect } from 'expo-router';

export default function Index() {
  // We'll redirect to tabs if authenticated, or auth/login if not
  // The tabs layout will check authentication state and redirect as needed
  return <Redirect href="/(tabs)" />;
}
