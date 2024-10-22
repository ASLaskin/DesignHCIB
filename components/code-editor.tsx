"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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

export function CodeEditorWrapper() {
  const [language, setLanguage] = useState("javascript");
  const [leftCode, setLeftCode] = useState("");
  const [rightCode, setRightCode] = useState("");

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="w-full max-w-xs">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={leftCode}
            language={language}
            placeholder="Enter code here"
            onChange={(evn) => setLeftCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              height: "100%",
            }}
          />
        </div>
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={rightCode}
            language={language}
            placeholder="Enter code here"
            onChange={(evn) => setRightCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
