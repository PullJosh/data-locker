import Link from "next/link";
import { CodeEditor } from "../../../components/CodeEditor";
import prisma from "../../../db";
import { notFound } from "next/navigation";

import { CodeExample } from "../../../components/CodeExample";
import dedent from "dedent";
import { CodeHighlight } from "../../../components/CodeHighlight";

export const metadata = {
  title: "JSON Document | Data Locker",
};

async function getDocument(id: string) {
  return await prisma.jSONDocument.findUnique({
    where: { id },
  });
}

export default async function JSONPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const document = await getDocument(id);
  if (!document) return notFound();

  return (
    <div className="prose py-8">
      <h1 className="mb-0">JSON Document</h1>
      <div className="mb-8">{document.id}</div>
      <div>
        <div className="flex justify-end">
          <Link href={`/json/${document.id}/api`}>View Raw ↗</Link>
        </div>
        <div className="not-prose overflow-hidden rounded-lg border text-sm">
          <CodeEditor code={JSON.stringify(document.json, null, 2)} />
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <div>
            Created{" "}
            <time
              dateTime={document.createdAt.toISOString()}
              title={document.createdAt.toLocaleString("en-US")}
            >
              {document.createdAt.toLocaleDateString("en-US")}
            </time>
          </div>
          <div>
            Updated{" "}
            <time
              dateTime={document.updatedAt.toISOString()}
              title={document.updatedAt.toLocaleString("en-US")}
            >
              {document.updatedAt.toLocaleString("en-US")}
            </time>
          </div>
        </div>
      </div>
      <h2>Code Examples</h2>
      <h3>GET &mdash; Read JSON</h3>
      <p>With a GET request you can read the stored JSON value.</p>
      <div className="not-prose">
        <CodeExample
          examples={[
            {
              name: "CURL",
              code: (
                <CodeHighlight
                  language="bash"
                  code={dedent`
                    curl ${codeExampleURL(`/json/${document.id}/api`)}
                      -H "Accept: application/json"
                  `}
                />
              ),
              output: (
                <pre>
                  <code>
                    {innerEllipses(JSON.stringify(document.json), 50)}
                  </code>
                </pre>
              ),
            },
            {
              name: "JavaScript",
              code: (
                <CodeHighlight
                  language="javascript"
                  code={dedent`
                    const url = "${codeExampleURL(`/json/${document.id}/api`)}";
                    
                    const data = await fetch(url, { method: "GET" })
                      .then(res => res.json());
                  `}
                />
              ),
              output: (
                <pre>
                  <code>
                    {innerEllipses(JSON.stringify(document.json), 50)}
                  </code>
                </pre>
              ),
            },
            {
              name: "Python",
              code: (
                <CodeHighlight
                  language="python"
                  code={dedent`
                    url = "${codeExampleURL(`/json/${document.id}/api`)}"
                    
                    with urllib.request.urlopen(url) as url:
                      data = json.load()
                  `}
                />
              ),
              output: (
                <pre>
                  <code>
                    {innerEllipses(JSON.stringify(document.json), 50)}
                  </code>
                </pre>
              ),
            },
          ]}
        />
      </div>
      <h3>PUT &mdash; Replace JSON</h3>
      <p>
        The PUT method is the simplest way to update the JSON document. With
        PUT, you send an entirely new JSON document that completely replaces the
        old version. (But be careful! It's easy to accidentally overwrite
        someone else's changes.)
      </p>
      <div className="not-prose">
        <CodeExample
          examples={[
            {
              name: "JavaScript",
              code: (
                <CodeHighlight
                  language="javascript"
                  code={dedent`
                    const url = "http://localhost:3000/json/48529d4b-77be-4bc3-bad5-7c3214d0d0fd/api";
                    const newJSON = { my: ["new", "data"] }; // New JSON document

                    const data = await fetch(url, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YOUR_EDIT_PASSWORD_HERE" // Fill this in with the edit password
                      },
                      body: JSON.stringify(newJSON),
                    })
                      .then(res => res.json());
                    
                    console.log(data);
                  `}
                />
              ),
              output: (
                <pre>
                  <code>{`> { my: ["new", "data"] }`}</code>
                </pre>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function codeExampleURL(path = "") {
  const scheme = process.env.DEPLOYMENT_URL?.startsWith("localhost")
    ? "http"
    : "https";

  return `${scheme}://${process.env.DEPLOYMENT_URL}${path}`;
}

function innerEllipses(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;

  const frontHalf = Math.ceil(maxLength / 2);
  const backHalf = Math.floor(maxLength / 2);
  return `${str.slice(0, frontHalf)}...${str.slice(-backHalf)}`;
}
