// app/api/notes/[id]/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });
    if (!note) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: note }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch note" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("notes").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to delete note" }, { status: 500 });
  }
}
