"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes"; 

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const predefinedSnippets: Record<string, string> = {
  //copy the commented out code to see output 
  //#include<iostream>
  // int main(){
  //   std::cout << "hello world";
  //   return 0;
  //  }
  '#include<iostream>\nint main(){\n std::cout << "hello world";\n return 0;\n}': "This prints hello world in C++",
  'cout << "hello world";': "This prints hello world in C++",
  'cout<<"hello world";': "This prints hello world in C++",
  'cout <<"hello world";': "This prints hello world in C++",
  'cout<< "hello world";': "This prints hello world in C++",

  //cout << "hello";  
  "cout << \"hello\";": "This outputs the word hello using C++ streams",
};

export function CodeEditorWrapper() {
  const { theme } = useTheme(); 
  const [leftCode, setLeftCode] = useState("");
  const [rightCode, setRightCode] = useState("");

  const handleCodeChange = (value: string) => {
    setLeftCode(value);
    const output = predefinedSnippets[value] || "Code not recognized";
    setRightCode(output);
  };

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

  
  const pageBackground = theme === "dark" ? "#181818" : "#ffffff";

  return (
    <div
      style={{ backgroundColor: pageBackground }}
      className="min-h-screen p-4 space-y-4 flex flex-col items-center justify-center"
    >
      <div
        className="text-center font-bold text-xl p-2 rounded-md shadow-md"
        style={{
          backgroundColor: theme === "dark" ? "#444" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderColor: theme === "dark" ? "#666" : "#ccc",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        Code in C++
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={leftCode}
            placeholder="Enter code here"
            onChange={(evn) => handleCodeChange(evn.target.value)}
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
        <div className="w-full h-[400px] border rounded-md overflow-hidden">
          <CodeEditor
            value={rightCode}
            language="text"
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
