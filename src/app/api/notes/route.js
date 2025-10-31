import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const notes = await db.collection("notes").find({}).toArray();
    return NextResponse.json({ success: true, data: notes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content } = body;
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("notes").insertOne({
      title,
      content,
      createdAt: new Date(),
    });
    const note = await db.collection("notes").findOne({ _id: result.insertedId });
    return NextResponse.json({ success: true, data: note });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to create" }, { status: 500 });
  }
}
