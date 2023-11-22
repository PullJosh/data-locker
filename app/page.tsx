"use client";

import Link from "next/link";

export default function Index() {
  return (
    <div>
      <div className="prose prose-lg py-8">
        <h1 className="text-4xl">Save some data online in seconds.</h1>
        <p>
          You have a tiny project. Fewer than 100 people use it. You want to
          store a leaderboard, a small counter, some non-private user data, or a
          few blog posts.
        </p>
        <p>
          Setting up a full database is overkill. That's why Data Locker lets
          you store some JSON data online and access it from your code via API
          in seconds.
        </p>
        <div className="not-prose mt-8">
          <Link
            href="/json/create"
            className="rounded-lg bg-blue-600 px-6 py-4 text-lg text-white active:bg-blue-700"
          >
            Create JSON Document
          </Link>
        </div>
      </div>
    </div>
  );
}
