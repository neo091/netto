import Markdown from "react-markdown";
import HeaderBlur from "../components/ui/HeaderBlur";
import changelog from "../content/change-logs.md?raw";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-black mb-4">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-green-400 mt-10 mb-6 border-b border-gray-700 pb-3">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-white mt-8 mb-3">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-400 leading-relaxed mb-4">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed mb-6">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 text-gray-300 leading-relaxed mb-6">
      {children}
    </ol>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      className="text-green-400 underline underline-offset-4"
    >
      {children}
    </a>
  ),

  hr: () => (
    <hr className="border-gray-700 my-8" />
  ),
};

export default function ChangeLogs() {
  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 fade-in">
      <div className="max-w-3xl mx-auto">
        <HeaderBlur label="Novedades" />

        <article className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 sm:p-8 break-words">
          <Markdown components={markdownComponents}>
            {changelog}
          </Markdown>
        </article>
      </div>
    </main>
  );
}