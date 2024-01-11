import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,con) {
   
    try {
      let userId=Number(con.params.id);
      const user = await prisma.profile.findUnique({
          where: {
              id: userId,
            },
      });
      return NextResponse.json({ result:user,success:true});
    } catch (error) {
      return NextResponse.json({ result:"Error",success:false});
      
    }
  }

  export async function DELETE(req,con) {
   
    try {
      console.log(con);
      let userId=Number(con.params.id);
      const user = await prisma.profile.delete({
          where: {
              id: userId,
            },
      });
      return NextResponse.json({ result:user,success:true});
    } catch (error) {
      return NextResponse.json({ result:"Error",success:false});
      
    }
  }