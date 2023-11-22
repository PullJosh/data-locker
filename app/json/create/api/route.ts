import prisma from "../../../../db";

export async function POST(request: Request) {
  const { json, password } = await request.json();

  const document = await prisma.jSONDocument.create({
    data: { json, password },
  });

  return Response.json({
    id: document.id,
    json: document.json,
  });
}
