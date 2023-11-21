import { type NextRequest } from "next/server";
import prisma from "../../../../db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const document = await prisma.jSONDocument.findUnique({
    where: { id: params.id },
    select: { json: true, password: true },
  });

  if (!document) {
    return cors(new Response("Not found", { status: 404 }));
  }

  return cors(Response.json(document.json));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log("PUT", params.id, request.headers.get("password"));

  let json;
  try {
    json = await request.json();
  } catch (err) {
    return cors(new Response("Bad request", { status: 400 }));
  }

  const auth = request.headers.get("Authorization");

  if (!auth) {
    return cors(new Response("Unauthorized", { status: 401 }));
  }

  const oldDocument = await prisma.jSONDocument.findUnique({
    where: { id: params.id },
    select: { password: true },
  });

  if (!oldDocument) {
    return cors(new Response("Not found", { status: 404 }));
  }

  if (!auth.startsWith("Basic ") || oldDocument.password !== auth.slice(6)) {
    return cors(new Response("Unauthorized", { status: 401 }));
  }

  const newDocument = await prisma.jSONDocument.update({
    where: { id: params.id },
    data: { json },
  });

  return cors(Response.json(newDocument.json));
}

export async function OPTIONS(request: Request) {
  return cors(new Response(null, { status: 204 }));
}

function cors(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type",
  );
  return res;
}
