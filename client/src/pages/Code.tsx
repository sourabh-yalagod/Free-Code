import { useState } from "react";
import MonacoDiffEditor from "@monaco-editor/react";
import Split from "react-split";
import CodeNavBar from "../components/CodeNavBar";
import axios from "axios";
const Code = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState<string>("10");
  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: Number(fontSize),
  };
  console.log(code);
  const executeCode = async () => {
    if (!code) {
      console.log("no code");

      return;
    }
    try {
      const { data } = await axios.post("http://localhost:3000/code", {
        language: language || "",
        code: code.trim(),
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <CodeNavBar
        executeCode={executeCode}
        setLanguage={setLanguage}
        setTheme={setTheme}
      />
      <Split
        className="flex h-full"
        sizes={[70, 30]}
        minSize={10}
        gutterSize={0}
        direction="horizontal"
      >
        <MonacoDiffEditor
          value={code}
          height="100vh"
          options={editorOptions}
          language={language}
          theme={theme}
          onChange={(val) => {
            setCode(val || "");
          }}
        />
        <div className="bg-black text-green-400 w-[40%]">
          <h2>Output:</h2>
          <pre className="text-green-400">Output</pre>
          <h4>Completed in ms</h4>
        </div>
      </Split>
    </div>
  );
};

export default Code;
