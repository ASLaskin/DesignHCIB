"use client"; // Ensure this is a client component

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes"; // Import useTheme to detect current theme
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
];

const predefinedSnippets: Record<string, string> = {
  'print("hello world")': 'This statement prints out hello world',
  'console.log("hello world")': 'This logs hello world to the console',
  '#include<iostream>\nint main(){\n std::cout << "hello world";\n return 0;\n}': 'This prints hello world in C++',
};

export function CodeEditorWrapper() {
  const { theme } = useTheme(); // Get the current theme
  const [language, setLanguage] = useState("javascript");
  const [leftCode, setLeftCode] = useState("");
  const [rightCode, setRightCode] = useState("");

  const handleRunCode = () => {
    const output = predefinedSnippets[leftCode] || "Code not recognized";
    setRightCode(output);
  };

  // Define light and dark mode styles
  const editorStyles = {
    light: {
      backgroundColor: "#f5f5f5",
      color: "#000",
    },
    dark: {
      backgroundColor: "#2c2c2c",
      color: "#fff",
    },
  };

  // Define page background styles
  const pageBackground = theme === "dark" ? "#181818" : "#ffffff";

  const buttonStyles = theme === "dark" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-500 text-black hover:bg-blue-600";

  return (
    <div style={{ backgroundColor: pageBackground }} className="min-h-screen p-4 space-y-4">
      <div className="flex justify-center space-x-1">
        <div className="w-full max-w-xs">
          <div style={{
              backgroundColor: theme === "dark" ? "#444" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
              borderColor: theme === "dark" ? "#666" : "#ccc",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: "0.375rem", // Equivalent to rounded-md
            }}>
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <button
          onClick={handleRunCode}
          className={`px-4 py-2 font-semibold rounded-md transition ${buttonStyles}`}
        >
          Run
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left code editor */}
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={leftCode}
            language={language}
            placeholder="Enter code here"
            onChange={(evn) => setLeftCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              height: "100%",
              backgroundColor:
                theme === "dark" ? editorStyles.dark.backgroundColor : editorStyles.light.backgroundColor,
              color: theme === "dark" ? editorStyles.dark.color : editorStyles.light.color,
            }}
          />
        </div>
        {/* Right output editor */}
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={rightCode}
            language={language}
            readOnly
            placeholder="Output will appear here"
            padding={15}
            style={{
              fontSize: 12,
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              height: "100%",
              backgroundColor:
                theme === "dark" ? editorStyles.dark.backgroundColor : editorStyles.light.backgroundColor,
              color: theme === "dark" ? editorStyles.dark.color : editorStyles.light.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
