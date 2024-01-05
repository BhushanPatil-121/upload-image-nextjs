import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import style from "./../page.module.css";
import prisma from "@/lib/prisma";

export async function users() {
  const users = await prisma.profile.findMany({});
  return users;
}
export default async function Profile() {
  let data = await users();
  let user = data[0];
  // console.log(user.avatar);
  let im=user.avatar;
  // console.log(user);
  const imageSrc= im;
  // console.log(imageSrc);
  return (
    <main>
      <div className={style.cardContainer}>
        <div className={style.buttons}>
          <Link
            href={{
              pathname: "/profile/edit",
              query: {
                name: user.name,
                city: user.city,
                heading: user.heading,
                avatar:imageSrc
              },
            }}
          >
            <button className={style.primary}>
              <EditIcon fontSize="small" />
            </button>
          </Link>
        </div>
        <Image
          className={style.round}
          width={150}
          height={150}
          src={imageSrc}
          alt="user"
        />
        <h3 className={style.h3}>{user.name}</h3>
        <h6 className={style.h6}>{user.city}</h6>
        <p className={style.p}>{user.heading}</p>
      </div>
    </main>
  );
}
