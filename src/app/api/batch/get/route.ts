import { db } from "../../../../../lib/db";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, instituteId, userId } = await req.json(); 

    
    let checkBatchExists = await db.batches.findFirst({
      where: {
        name: name,
        instituteId: instituteId
      }
    });

    if(checkBatchExists) {
      console.log("NEW CREATED CHECKS ->", checkBatchExists);
      return NextResponse.json({message: "Batch Already Exists"},  { status: 400, }); // Respond with the created todo
    } else {
      console.log("NOT FOUND ->", checkBatchExists);
    }
    


    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!instituteId) {
      return new NextResponse("instituteId is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    // Create and save batch on the database
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

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const instituteId: any = searchParams.get("instituteId")


        if (!instituteId) {
          return new NextResponse("instituteId is required", { status: 400 });
        }
        
        // Create and save todo on the database
        const batches = await db.batches.findMany({
          where: {
            instituteId: instituteId
          },
        });
    
        return NextResponse.json(batches, { status: 200 }); // Respond with the created todo
      } catch (error) {
        console.log("[GET BATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
      }
}