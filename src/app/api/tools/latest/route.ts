import { dbConnect } from "@/lib/mongoose";
import Tool from "@/models/Tool";

export async function GET() {
  await dbConnect();
  const tools = await Tool.find().sort({ createdAt: -1 }).limit(6);
  return new Response(JSON.stringify(tools), {
    headers: { "Content-Type": "application/json" },
  });
}
