"use client";
import { SparklesCore } from "../components/ui/sparkles";

export function SparklesPreview() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Main title: keep same size as before */}
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        NyaySetu
      </h1>

      {/* Sparkles container */}
      <div className="w-[40rem] h-40 relative mt-8">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Sparkles */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>

      {/* Subtitle / features below sparkles */}
      <div className="text-center mt-12 space-y-4 max-w-3xl">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          AI-Powered Justice for Every Citizen
        </h2>

        <ul className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 text-gray-300 text-sm md:text-base font-medium">
          <li className="before:content-['•'] before:text-white before:mr-2">Chatbot</li>
          <li className="before:content-['•'] before:text-white before:mr-2">IPC Section Prediction</li>
          <li className="before:content-['•'] before:text-white before:mr-2">Legal Draft Generator</li>
          <li className="before:content-['•'] before:text-white before:mr-2">Law & Judgement Updates</li>
        </ul>
      </div>
    </div>
  );
}
