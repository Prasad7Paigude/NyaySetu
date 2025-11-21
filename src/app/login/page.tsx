// app/login/page.tsx
// Create this file at: app/login/page.tsx

"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

// Separate component that uses useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // UI states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for success message from signup verification
  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setSuccess("Email verified successfully! You can now log in.");
    }
  }, [searchParams]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ============================================
  // LOGIN FORM SUBMISSION
  // ============================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Call Better Auth sign in
      const { data, error: signInError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        // Check specific error cases
        if (signInError.status === 403) {
          setError("Please verify your email before logging in.");
          return;
        }
        throw new Error(signInError.message || "Login failed");
      }

      // Success! Redirect to dashboard
      router.push("/dashboard");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-black min-h-screen">
      <div className="shadow-input mx-auto w-full max-w-md rounded-2xl p-6 md:p-8 bg-[#171717]">
        <h2 className="text-xl font-bold text-white">Welcome Back</h2>
        <p className="mt-2 max-w-sm text-sm text-gray-300">
          Login to Nyaysetu AI
        </p>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-3 rounded-md bg-green-500/10 border border-green-500/50">
            <p className="text-sm text-green-500">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/50">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <form className="my-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <LabelInputContainer>
            <Label htmlFor="email" className="text-white">
              Email
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
          <LabelInputContainer>
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

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative h-10 w-48 rounded-md bg-black text-white font-medium shadow-[0px_1px_0px_0px_#00000040_inset,0px_-1px_0px_0px_#00000040_inset] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login →"}
              <BottomGradient />
            </button>

            <p className="text-sm text-gray-400 mt-2">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-cyan-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          {/* Social Login Buttons (Disabled for now) */}
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              disabled
              className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-900 px-4 font-medium text-white opacity-50 cursor-not-allowed"
            >
              <IconBrandGithub className="h-4 w-4 text-white" />
              <span className="text-sm text-white">GitHub (Coming Soon)</span>
            </button>
            <button
              type="button"
              disabled
              className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-900 px-4 font-medium text-white opacity-50 cursor-not-allowed"
            >
              <IconBrandGoogle className="h-4 w-4 text-white" />
              <span className="text-sm text-white">Google (Coming Soon)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// MAIN LOGIN PAGE COMPONENT
// ============================================
const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
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

export default LoginPage;