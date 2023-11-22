"use client";

import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { useEffect, useLayoutEffect, useRef } from "react";

import { keymap } from "@codemirror/view";
import { json5, json5ParseLinter } from "codemirror-json5";
import { linter, lintGutter } from "@codemirror/lint";

import { tags as t } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

interface CodeEditorProps {
  code: string;
  setCode?: (newCode: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({
  code,
  setCode,
  readOnly = !setCode,
}: CodeEditorProps) {
  const editor = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView>();

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode?.(v.state.doc.toString());
  });

  useLayoutEffect(() => {
    if (!editor.current) return;

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        onUpdate,
        EditorState.readOnly.of(readOnly),
        json5(),
        linter(json5ParseLinter(), {
          delay: 250,
        }),
        lintGutter(),
        githubLight,
      ],
    });

    editor.current.innerHTML = "";

    view.current = new EditorView({
      state: startState,
      parent: editor.current,
    });

    return () => {
      view.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!view.current) return;
    if (view.current.state.doc.toString() === code) return;

    view.current?.dispatch({
      changes: {
        from: 0,
        to: view.current.state.doc.length,
        insert: code,
      },
    });
  }, [code]);

  return (
    <div ref={editor}>
      {/* Simulate CodeMirror output for SSR (prevents layout shift) */}
      <div className="not-prose flex items-stretch font-mono leading-[1.4]">
        <div
          className="flex justify-start"
          style={{
            background: "#f5f5f5",
            borderRight: "1px solid #ddd",
            color: "#6c6c6c",
          }}
        >
          <div className="flex flex-col items-end py-[4px]">
            {new Array(code.split("\n").length).fill(null).map((_, i) => (
              <span
                key={i}
                className="mr-[30px] min-w-[20px] pl-[5px] pr-[3px] text-right"
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <pre className="py-[4px] pl-[6px] pr-[2px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

const githubThemeExtension = EditorView.theme(
  {
    "&": {
      backgroundColor: "#fff",
      color: "#24292e",
    },
    ".cm-gutters": {
      backgroundColor: "#fff",
      color: "#6e7781",
    },
    ".cm-activeLineGutter": {},
    "&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection":
      { background: "#BBDFFF !important" },
    "& .cm-selectionMatch": { backgroundColor: "#BBDFFF" },
  },
  { dark: false },
);

const githubHighlightStyle = HighlightStyle.define([
  { tag: [t.standard(t.tagName), t.tagName], color: "#116329" },
  { tag: [t.comment, t.bracket], color: "#6a737d" },
  { tag: [t.className, t.propertyName], color: "#6f42c1" },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: "#005cc5",
  },
  {
    tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
    color: "#d73a49",
  },
  { tag: [t.string, t.meta, t.regexp], color: "#032f62" },
  { tag: [t.name, t.quote], color: "#22863a" },
  { tag: [t.heading, t.strong], color: "#24292e", fontWeight: "bold" },
  { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
  { tag: [t.deleted], color: "#b31d28", backgroundColor: "ffeef0" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#e36209" },
  { tag: [t.url, t.escape, t.regexp, t.link], color: "#032f62" },
  { tag: t.link, textDecoration: "underline" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.invalid, color: "#cb2431" },
]);

const githubLight = [
  githubThemeExtension,
  syntaxHighlighting(githubHighlightStyle),
];
