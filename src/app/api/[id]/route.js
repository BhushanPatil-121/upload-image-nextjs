import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,con) {
    let userId=Number(con.params.id);
    const user = await prisma.profile.findUnique({
        where: {
            id: userId,
          },
    });
    return NextResponse.json({ result:user});
  }
  