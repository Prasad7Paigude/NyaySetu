"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import LoggedNav from "@/components/navbar/DashNavbar";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { SparklesPreview } from "@/components/sparclesUi";

// Auth
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  // Get session from Better Auth
  const { data: session, isPending } = authClient.useSession();

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Redirect user if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  // Loading screen
  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Safety fallback
  if (!session) return null;

  const user = session.user;

  return (
    <>
      <LoggedNav />
      <SparklesPreview />

      <div className="min-h-screen bg-black pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome back, {user.name || "User"}!
            </h1>
            <p className="text-gray-400 text-lg">
              Access your legal AI tools and manage your account
            </p>
          </div>

          {/* Account Info */}
          {/* <div className="mb-12">
            <NeonGradientCard className="w-full max-w-2xl !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Account Information</h2>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-28">Name:</span>
                    <span className="text-white">{user.name || "N/A"}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-28">Email:</span>
                    <span className="text-white">{user.email}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-28">Email Status:</span>
                    <span className="text-white">
                      {user.emailVerified ? (
                        <span className="text-green-400">Verified</span>
                      ) : (
                        <span className="text-yellow-400">Pending</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-28">User ID:</span>
                    <span className="text-white text-xs font-mono">
                      {user.id}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            </NeonGradientCard>
          </div> */}

          {/* Section Title */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Your AI Legal Tools</h2>
            <p className="mt-2 text-gray-400 text-sm md:text-base">
              Choose from our powerful AI features to get started
            </p>
          </div>

          {/* TOOLS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">

            {/* Chatbot */}
            <NeonGradientCard className="w-full h-auto hover:scale-105 transition-transform !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6 text-white flex flex-col h-full">
                <div className="mb-4">
                  <svg width="38" height="38" fill="none" stroke="white" strokeWidth="1.7">
                    <path d="M12 22c4.97 0 9-3.58 9-8s-4.03-8-9-8-9 3.58-9 8c0 2.64 1.32 5 3.43 6.57L5 22l4.21-1.31C10.1 21.56 11.03 22 12 22z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chatbot</h3>
                <p className="text-sm text-gray-300 flex-grow">
                  Get instant legal guidance for IPC sections.
                </p>
                <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md">
                  Launch Chatbot
                </button>
              </div>
            </NeonGradientCard>

            {/* IPC Prediction */}
            <NeonGradientCard className="w-full h-auto hover:scale-105 transition-transform !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6 text-white flex flex-col h-full">
                <div className="mb-4">
                  <svg width="38" height="38" fill="none" stroke="white" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">IPC Section Prediction</h3>
                <p className="text-sm text-gray-300 flex-grow">
                  Predict relevant IPC sections from incident details.
                </p>
                <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md">
                  Start Prediction
                </button>
              </div>
            </NeonGradientCard>

            {/* Draft Generator */}
            <NeonGradientCard className="w-full h-auto hover:scale-105 transition-transform !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6 text-white flex flex-col h-full">
                <div className="mb-4">
                  <svg width="38" height="38" fill="none" stroke="white" strokeWidth="1.7">
                    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Legal Draft Generator</h3>
                <p className="text-sm text-gray-300 flex-grow">
                  Generate court-ready legal drafts instantly.
                </p>
                <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md">
                  Generate Draft
                </button>
              </div>
            </NeonGradientCard>

            {/* Judgment Updates */}
            <NeonGradientCard className="w-full h-auto hover:scale-105 transition-transform !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6 text-white flex flex-col h-full">
                <div className="mb-4">
                  <svg width="38" height="38" fill="none" stroke="white" strokeWidth="1.7">
                    <path d="M21 6h-8l-2-3H3v17h18V6z"></path>
                    <path d="M3 13h18"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Judgement Updates</h3>
                <p className="text-sm text-gray-300 flex-grow">
                  Latest judgements, legal updates, amendments.
                </p>
                <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md">
                  View Updates
                </button>
              </div>
            </NeonGradientCard>

          </div>

          {/* Recent Activity */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <NeonGradientCard className="w-full !bg-[#171717] [&>*]:!bg-[#171717]">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white text-center mb-6">more features coming soon</h3>
                <p className="text-gray-400 text-center py-8">
                  No recent activity yet. 
                </p>
              </div>
            </NeonGradientCard>
          </div>
        </div>
      </div>
    </>
  );
}
