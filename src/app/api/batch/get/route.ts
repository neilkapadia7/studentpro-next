import { db } from "../../../../../lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    // detsrtucture todoTitle from the incoming request
    const { name, instituteId, userId, isActive } = await req.json(); 

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!instituteId) {
      return new NextResponse("instituteId is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    // Create and save todo on the database
    const todo = await db.batches.create({
      data: {
        name: name,
        instituteId: instituteId,
        userId: userId,
        isActive: true
      },
    });

    return NextResponse.json(todo, { status: 200 }); // Respond with the created todo
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}