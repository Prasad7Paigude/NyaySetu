"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavToggle,
  MobileNavHeader,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export default function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
  { name: "Home", link: "/" },
  { name: "AI Chatbot", link: "/login" },
  {
    name: "More",
    submenu: [
      { name: "About", link: "/about" },
      { name: "Training", link: "/training" },
    ],
  },
];

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 bg-black">
      {/* 🖥️ Desktop Navbar */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />

        <div className="flex items-center gap-4">
          <NavbarButton href="/login" variant="secondary">
            <Button>Log In</Button>
          </NavbarButton>

          <Link href="/signup">
            <ShimmerButton>Sign Up</ShimmerButton>
          </Link>
        </div>
      </NavBody>

      {/* 📱 Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-lg font-medium text-neutral-200"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
