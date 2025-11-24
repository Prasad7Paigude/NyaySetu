// lib/auth-client.ts
// Create this file at: lib/auth-client.ts

import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

// Create the auth client with email OTP plugin
export const authClient = createAuthClient({
  // Base URL of your server (optional if same domain)
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  // Add email OTP client plugin
  plugins: [
    emailOTPClient(),
  ],
});

// Export individual methods for easier imports
export const {
  signIn,      // Sign in methods
  signUp,      // Sign up methods  
  signOut,     // Sign out method
  useSession,  // React hook to get current session
  emailOtp,    // Email OTP methods
} = authClient;