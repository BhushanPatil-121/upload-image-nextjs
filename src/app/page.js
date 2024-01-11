import prisma from "@/lib/prisma";
import Create from "./create/page";
import Profile from "./profile/page";

export async function User(){
  let user = await prisma.profile.findMany({
  })
  return user;
}
export default async function Home() {
  let retries=5;
  while(retries){
    try {
      var data = await User();
      return (
        <main>
          {data.length>0?<Profile/>:<Create/>}
        </main>
      );
    } catch (error) {
      console.log(error);
      retries -= 1 ;
      console.log("number of tries remain "+ retries);
      await new Promise(res=>setTimeout(res, 10000))
    }
  }
  // console.log(data.length>0);
  // if(data)
 
}
