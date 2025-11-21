// app/signup/page.tsx
// Create this file at: app/signup/page.tsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

const SignupPage = () => {
  const router = useRouter();
  
  // Track which step user is on: "signup" or "verify"
  const [step, setStep] = useState<"signup" | "verify">("signup");
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  // OTP input state
  const [otp, setOtp] = useState("");
  
  // Error and loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ============================================
  // STEP 1: SIGNUP FORM SUBMISSION
  // ============================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    
    try {
      // Call Better Auth signup
      const { data, error: signUpError } = await authClient.signUp.email({
  email: formData.email,
  password: formData.password,
  name: `${formData.firstName} ${formData.lastName}`,
}, {
  // Pass additional custom fields here
  body: {
    firstName: formData.firstName,
    lastName: formData.lastName,
  }
});

      if (signUpError) {
        throw new Error(signUpError.message || "Signup failed");
      }

      // Success! Move to OTP verification step
      // OTP is automatically sent because we set sendVerificationOnSignUp: true
      setStep("verify");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // STEP 2: OTP VERIFICATION
  // ============================================
  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verify the OTP
      const { data, error: verifyError } = await authClient.emailOtp.verifyEmail({
        email: formData.email,
        otp: otp,
      });

      if (verifyError) {
        throw new Error(verifyError.message || "Verification failed");
      }

      // Success! Redirect to login page
      router.push("/login?verified=true");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RESEND OTP
  // ============================================
  const handleResendOTP = async () => {
    setError("");
    setLoading(true);
    
    try {
      const { error: resendError } = await authClient.emailOtp.sendVerificationOtp({
        email: formData.email,
        type: "email-verification",
      });
      
      if (resendError) {
        throw new Error(resendError.message);
      }
      
      alert("New OTP sent to your email!");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RENDER: OTP VERIFICATION SCREEN
  // ============================================
  if (step === "verify") {
    return (
      <div className="flex items-center justify-center p-8 min-h-screen bg-black">
        <div className="shadow-input mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 bg-[#171717]">
          <h2 className="text-xl font-bold text-white">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-300">
            We have sent a 6-digit code to{" "}
            <span className="text-cyan-500">{formData.email}</span>
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/50">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <form className="my-8" onSubmit={handleVerifyOTP}>
            <LabelInputContainer className="mb-6">
              <Label htmlFor="otp" className="text-white">
                Enter OTP
              </Label>
              <Input
                id="otp"
                placeholder="123456"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                className="text-white text-center text-2xl tracking-widest placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
              />
            </LabelInputContainer>

            <div className="flex flex-col items-center space-y-4">
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="group/btn relative h-10 w-48 rounded-md bg-black text-white font-medium shadow-[0px_1px_0px_0px_#00000040_inset,0px_-1px_0px_0px_#00000040_inset] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Email →"}
                <BottomGradient />
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-sm text-cyan-500 hover:underline disabled:opacity-50"
              >
                Did not receive code? Resend OTP
              </button>

              <button
                type="button"
                onClick={() => setStep("signup")}
                className="text-sm text-gray-400 hover:text-white"
              >
                ← Back to signup
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: SIGNUP FORM
  // ============================================
  return (
    <div className="flex items-center justify-center p-8 min-h-screen bg-black">
      <div className="shadow-input mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 bg-[#171717]">
        <h2 className="text-xl font-bold text-white">Welcome to Nyaysetu AI</h2>
        <p className="mt-2 max-w-sm text-sm text-gray-300">
          Create your account to get started
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/50">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstName" className="text-white">
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="Shivraj"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastName" className="text-white">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Taware"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
              />
            </LabelInputContainer>
          </div>

          {/* Email Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="abc@gmail.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
            />
          </LabelInputContainer>

          {/* Password Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
            />
          </LabelInputContainer>

          {/* Confirm Password Field */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              style={{ backgroundColor: "#171717", borderColor: "#3A3A3A" }}
            />
          </LabelInputContainer>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="group/btn relative h-10 w-48 rounded-md bg-black text-white font-medium shadow-[0px_1px_0px_0px_#00000040_inset,0px_-1px_0px_0px_#00000040_inset] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing up..." : "Sign up →"}
              <BottomGradient />
            </button>

            <p className="text-sm text-gray-400 mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-cyan-500 hover:underline">
                Login
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          {/* Social Login Buttons (Disabled for now) */}
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              disabled
              className="group/btn opacity-50 cursor-not-allowed shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-900 px-4 font-medium text-white"
            >
              <IconBrandGithub className="h-4 w-4 text-white" />
              <span className="text-sm text-white">GitHub (Coming Soon)</span>
            </button>
            <button
              type="button"
              disabled
              className="group/btn opacity-50 cursor-not-allowed shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-900 px-4 font-medium text-white"
            >
              <IconBrandGoogle className="h-4 w-4 text-white" />
              <span className="text-sm text-white">Google (Coming Soon)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

export default SignupPage;