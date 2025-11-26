import { dbConnect } from "@/lib/mongoose";
import Tool from "@/models/Tool";

export async function GET() {
  await dbConnect();
  const tools = await Tool.find();
  return Response.json(tools);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const tool = await Tool.create(body);
  return Response.json(tool);
}
