"use client";

import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { useRouter } from "next/navigation";

import JSON5 from "json5";

const defaultJSON = `{
  "scores": [
    { "name": "Alice", "score": 50 },
    { "name": "Bob", "score": 40 },
    { "name": "Carol", "score": 60 }
  ]
}`;

export default function Index() {
  const [json, setJSON] = useState<string>(defaultJSON);
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/json/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ json: JSON5.parse(json), password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(`/json/${res.id}`);
        router.push(`/json/${res.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-16 py-16 prose">
      <h1>Teensy Tiny Database</h1>
      <p>
        This is the world's simplest database. Enter your data in JSON format,
        and we'll provide an API so you can read and edit it later.
      </p>

      <form onSubmit={onSubmit} className="mb-16">
        <div className="not-prose text-sm rounded-lg border overflow-hidden">
          <CodeEditor code={json} setCode={setJSON} />
        </div>
        <div className="mt-2 flex justify-between items-start">
          <div>
            <label className="block">
              <span>
                <span className="text-lg">🔒</span> Password to edit:{" "}
              </span>
              <input
                type="text"
                placeholder="None"
                className="border p-2 rounded-lg shadow-inner focus:ring focus:ring-blue-600/40 focus:border-blue-600 focus:outline-none"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required={true}
              />
            </label>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:ring focus:ring-blue-600/40 focus:bg-blue-700 focus:outline-none">
            Save
          </button>
        </div>
      </form>

      <h1>FAQ</h1>
      <h2>What can I use this for?</h2>
      <p>
        If you need to store a small amount of data online, this may be the tool
        for you. For example, you could:
      </p>
      <ul>
        <li>Store a leaderboard of high scores for a game</li>
        <li>Store your blog posts as markdown</li>
        <li>Count the number of people who have visited your website</li>
      </ul>
      <p>
        You can view or edit your data by hand, but you can also access the data
        from your code.
      </p>

      <h2>Is this secure?</h2>
      <p>
        No! All your data will be publicly viewable by anyone. And anyone who
        has the password will be able to edit, delete, or replace all your data
        at any time.
      </p>
      <p>
        As a general rule of thumb, only use this for small projects that will
        be used by people you trust. If you're making something big or
        important, you almost certainly want to use a real database instead.
      </p>
    </div>
  );
}
