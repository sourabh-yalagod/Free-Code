import { Save, Play, Code2 } from "lucide-react";

const languages = ["JavaScript", "Python", "C++", "Java", "Go"];

const CodeNavBar = ({ setLanguage, language, executeCode }: any) => {
  return (
    <nav className="flex pb-5 flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900 text-white px-6 py-3 shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Code2 className="text-blue-400" />
        <h1 className="text-lg font-semibold">Code Editor</h1>
      </div>

      {/* Center Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <button className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded hover:bg-zinc-700 transition">
          <Save size={18} />
          <span className="text-sm">Save</span>
        </button>
        <button
          onClick={executeCode}
          className="flex items-center gap-2 bg-green-600 px-3 py-1.5 rounded hover:bg-green-500 transition"
        >
          <Play size={18} />
          <span className="text-sm">Run</span>
        </button>
        <button className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded hover:bg-zinc-700 transition">
          <Code2 size={18} />
          <span className="text-sm">Format</span>
        </button>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-zinc-800 text-sm text-white px-3 py-1.5 rounded hover:bg-zinc-700 transition cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default CodeNavBar;
