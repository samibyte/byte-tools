import { dbConnect } from "@/lib/mongoose";
import Tool from "@/models/Tool";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid Tool ID" }), {
      status: 400,
    });
  }

  const tool = await Tool.findById(id);
  if (!tool) {
    return new Response(JSON.stringify({ error: "Tool not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(tool), { status: 200 });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid Tool ID" }), {
      status: 400,
    });
  }

  const body = await req.json();
  const tool = await Tool.findByIdAndUpdate(id, body, { new: true });

  if (!tool) {
    return new Response(JSON.stringify({ error: "Tool not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(tool), { status: 200 });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid Tool ID" }), {
      status: 400,
    });
  }

  const deleted = await Tool.findByIdAndDelete(id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Tool not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
