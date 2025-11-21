// lib/auth.ts
// Create this file at: lib/auth.ts

import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

// ============================================
// MONGODB CONNECTION
// ============================================
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.DB_NAME || "nyaysetu");

// ============================================
// EMAIL SERVICE (RESEND)
// ============================================
const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// BETTER AUTH CONFIGURATION
// ============================================
export const auth = betterAuth({
  // Database adapter for MongoDB
  database: mongodbAdapter(db),
  
  // Base URL of your app
  baseURL: process.env.BETTER_AUTH_URL,
  
  // Email and password authentication settings
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // User must verify email before login
    minPasswordLength: 6,
    autoSignIn: false, // Don't auto sign in after signup
  },

  // Add custom fields to user
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false, // Set to false to avoid signup errors
        input: true,     // Allow this field to be set during signup
      },
      lastName: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  // Plugins
  plugins: [
    emailOTP({
      otpLength: 6,                    // 6-digit OTP
      expiresIn: 300,                  // OTP expires in 5 minutes (300 seconds)
      sendVerificationOnSignUp: true,  // Auto-send OTP on signup
      
      // Function to send OTP via email
      async sendVerificationOTP({ email, otp, type }) {
        let subject = "";
        let message = "";

        // Different messages for different OTP types
        if (type === "email-verification") {
          subject = "Verify your email - Nyaysetu AI";
          message = "Please use this code to verify your email address.";
        } else if (type === "sign-in") {
          subject = "Sign in OTP - Nyaysetu AI";
          message = "Please use this code to sign in to your account.";
        } else if (type === "forget-password") {
          subject = "Reset your password - Nyaysetu AI";
          message = "Please use this code to reset your password.";
        }

        // Send email using Resend
        // IMPORTANT: On Resend free tier, you can only:
        // 1. Send to your own verified email, OR
        // 2. Use "onboarding@resend.dev" as the from address
        // 3. Add and verify your own domain for production
        
        console.log(`📧 Attempting to send OTP to: ${email}`);
        console.log(`📧 OTP Code: ${otp}`); // Remove this in production!
        
        try {
          const emailResponse = await resend.emails.send({
            // from: "Nyaysetu AI <onboarding@resend.dev>", // This is Resend's test sender
            from: "Nyaysetu AI <NyaysetuAI@shivrajtaware.in>", // This is custom sender
            to: email,
            subject: subject,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #000000; padding: 40px 20px;">
                  <div style="max-width: 500px; margin: 0 auto; background-color: #171717; border-radius: 16px; padding: 40px;">
                    <h1 style="color: #0891b2; margin: 0 0 10px 0; font-size: 24px;">Nyaysetu AI</h1>
                    <p style="color: #d1d5db; margin: 0 0 30px 0; font-size: 14px;">${message}</p>
                    
                    <div style="background-color: #000000; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
                      <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your verification code</p>
                      <p style="color: #0891b2; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0;">${otp}</p>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
                      This code expires in 5 minutes. If you didn't request this code, please ignore this email.
                    </p>
                  </div>
                </body>
              </html>
            `,
          });
          console.log(`OTP sent to ${email}`);
        } catch (error) {
          console.error("Failed to send OTP email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],

  // Social providers (uncomment when ready to add)
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },
});

// Export session type for TypeScript
export type Session = typeof auth.$Infer.Session;