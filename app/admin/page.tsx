import Link from "next/link";
import prisma from "../../db";
import { revalidatePath } from "next/cache";

async function getJSONDocuments() {
  return await prisma.jSONDocument.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminPage() {
  const documents = await getJSONDocuments();

  async function deleteDocument(id: string) {
    "use server";

    const document = await prisma.jSONDocument.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath(`/json/${id}`);

    return document;
  }

  return (
    <div className="max-w-3xl mx-auto px-16 py-16 prose">
      <h1>Admin</h1>
      <h2>JSON Documents</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Password</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>
                <Link href={`/json/${document.id}`} title={document.id}>
                  {document.id.slice(-6)}
                </Link>
              </td>
              <td>{document.createdAt.toLocaleDateString("en-US")}</td>
              <td>{document.updatedAt.toLocaleString("en-US")}</td>
              <td>{document.password}</td>
              <td>
                <form action={deleteDocument.bind(null, document.id)}>
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
