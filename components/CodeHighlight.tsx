import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";

interface CodeHighlightProps {
  language: string;
  code: string;
}

export async function CodeHighlight({ language, code }: CodeHighlightProps) {
  const highlighted = hljs.highlight(code, { language }).value;
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}
