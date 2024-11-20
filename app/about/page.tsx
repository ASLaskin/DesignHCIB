"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";


export default function AboutPage() {
  const { theme } = useTheme(); // Get the current theme
  const router = useRouter(); // Initialize the router

  const containerStyles = {
    backgroundColor: theme === "dark" ? "#181818" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
  };

  return (
    <div
      style={containerStyles}
      className="min-h-screen p-8 space-y-8 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold text-center">About CodeScanner</h1>

      <div className="flex flex-row justify-center space-x-8">
        <span className="font-medium text-lg">Andrew Laskin</span>
        <span className="font-medium text-lg">Xalan Dames</span>
        <span className="font-medium text-lg">Ryan Machado</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-base">
            At CodeScanner, our mission is to simplify and enhance the learning
            experience for developers at all levels. By providing real-time code
            analysis and meaningful insights, we aim to bridge the gap between
            learning and application in a seamless, intuitive way.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-base">
            CodeScanner was born from a shared passion for technology and
            education. Andrew, Xalan, and Ryan joined forces to create a tool
            that empowers developers to experiment, learn, and grow. Through
            collaboration and innovation, CodeScanner evolved into more than a
            tool—it became a platform for fostering creativity and confidence in
            coding.
          </p>
        </div>
      </div>

      {/* Add the back button */}
      <button
        onClick={() => router.push("/")} // Navigate to the main screen
        className="px-6 py-3 mt-8 bg-black text-white rounded-lg hover:bg-gray-600"
      >
        Back to Main Screen
      </button>
    </div>
  );
}
