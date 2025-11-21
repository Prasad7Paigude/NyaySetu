"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoggedNav from "@/components/navbar/DashNavbar";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg">Checking authentication...</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <>
      <LoggedNav />

      <div className="min-h-screen bg-black pt-24 px-4 pb-12 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <NeonGradientCard className="w-full max-w-md !bg-[#171717] [&>*]:!bg-[#171717]">
          <div className="p-6 flex flex-col items-center">

            {/* User Name */}
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {user.name || "User"}
            </h2>

            {/* Account info */}
            <div className="space-y-2 w-full text-left">
              <div className="flex">
                <span className="text-gray-400 font-medium w-28">
                  Name:
                </span>
                <span className="text-white">{user.name || "N/A"}</span>
              </div>

              <div className="flex">
                <span className="text-gray-400 font-medium w-28">Email:</span>
                <span className="text-white">{user.email}</span>
              </div>

              <div className="flex">
                <span className="text-gray-400 font-medium w-28">Email Status:</span>
                <span className="text-white">
                  {user.emailVerified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        </NeonGradientCard>
      </div>
    </>
  );
}
