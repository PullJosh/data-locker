"use client";

import { CodeEditor } from "../../../components/CodeEditor";

import { useState } from "react";
import { useRouter } from "next/navigation";

import JSON5 from "json5";

const defaultJSON = JSON.stringify(
  {
    scores: [
      { name: "Alice", score: 50 },
      { name: "Bob", score: 40 },
      { name: "Carol", score: 60 },
    ],
  },
  null,
  2,
);

export default function CreateJSON() {
  const [json, setJSON] = useState<string>(defaultJSON);
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/json/create/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ json: JSON5.parse(json), password }),
    })
      .then((res) => res.json())
      .then((res) => {
        router.push(`/json/${res.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="prose py-8">
      <h1>Create JSON Document</h1>
      <p>
        Enter your data in JSON format. Data Locker will provide an API so you
        can view and change it with code later.
      </p>

      <form onSubmit={onSubmit} className="mb-16">
        <div className="not-prose overflow-hidden rounded-lg border text-sm">
          <CodeEditor code={json} setCode={setJSON} />
        </div>
        <div className="mt-2 flex items-start justify-between">
          <div>
            <label className="block">
              <span>
                <span className="text-lg">🔒</span> Password to edit:{" "}
              </span>
              <input
                type="text"
                placeholder="None"
                className="rounded-lg border p-2 shadow-inner focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600/40"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required={true}
              />
            </label>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white focus:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-600/40">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
