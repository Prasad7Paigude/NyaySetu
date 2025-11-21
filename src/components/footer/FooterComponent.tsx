"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

export default function FooterComponent() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "AI Chatbot", link: "/chatbot" },
    { name: "Advantages", link: "/advantages" },
    { name: "Training", link: "/training" },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo2.png" alt="logo" width={40} height={40} />
              <span className="text-xl font-semibold">NyaySetu AI</span>
            </Link>
            <p className="max-w-xs text-gray-400">
              Empowering AI-driven solutions for smarter business and learning.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Join Us</h3>
            <div className="flex gap-2 mt-2">
              <Link href="/login">
                <Button className="bg-white text-black">Log In</Button>
              </Link>
              <Link href="/signup">
                <ShimmerButton>Sign Up</ShimmerButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} NyaySetu AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
