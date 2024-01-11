import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const users = await prisma.profile.findMany({});
  const user = users[0];
  return NextResponse.json({ result: user , success:true });
 } catch (error) {
  return NextResponse.json({ result: "Error", success:false });
  
 }
}


export async function PUT(req, res) {
  const newData =await req.json();
  try {
    const userExist = await prisma.profile.findFirst({ where: { id:1 } })
    if (userExist == null) {
      const createUser = await prisma.profile.create({
        data:{
          id:1,
          name:newData.name,
          city:newData.city,
          heading:newData.heading,
          avatar:newData.avatar,
        }
      });
      return NextResponse.json({ result: createUser, success: true });
    } else {
      const updateUser = await prisma.profile.update({
        where: {
          id: 1,
        },
        data:{
          name:newData.name,
          city:newData.city,
          heading:newData.heading,
          avatar:newData.avatar,
        }
      });
      return NextResponse.json({ result: updateUser, success: true });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json({ result: "error", success: false });
  }
}

