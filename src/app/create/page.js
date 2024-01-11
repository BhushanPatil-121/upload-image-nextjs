"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create({ searchParams }) {
  let router = useRouter();
  const updateData = async (newData) => {
    let data = await fetch("/api", {
      method: "PUT",
      body: JSON.stringify(newData),
    });
    data = await data.json();
    if (data.success) {
      alert("User Added !");
      router.push("/profile");
    } else {
      alert("Error! please choose your profile or try again later.");
    }
  };

  const [newImage, setNewImage] = useState();
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [preview, setPreview] = useState("/user.jpeg");
  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setPreview(URL.createObjectURL(file));

    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const update = () => {
    let newData = {
      name: newName,
      city: newCity,
      heading: newHeading,
      avatar: newImage,
    };
    console.log(newData);
    updateData(newData);
  };
  return (
    <div>
      <div className={style.cardContainer}>
        <Image
          className={style.round}
          width={150}
          height={150}
          src={preview}
          alt="user"
        />
        <br />
        <div className={style.inputImg}>
          <input
            accept="image/*"
            type="file"
            name="image"
            id="image"
            onChange={imageChange}
          />
          <br />
          <br />
          <label className={style.label}>
            <input
              className={style.inputField}
              type="text"
              name="name"
              id="name"
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Your Name"
            />
          </label>
          <br />
          <label className={style.label}>
            <input
              className={style.inputField}
              type="text"
              name="city"
              id="city"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Your City"
            ></input>
          </label>
          <br />
          <label className={style.label}>
            <textarea
              className={style.inputField}
              value={newHeading}
              name="heading"
              id="heading"
              onChange={(e) => setNewHeading(e.target.value)}
              placeholder="Your Heading"
            />
          </label>
          <br />
          <button className={style.primary1} onClick={update}>
            SAVE
          </button>
          <Link href={"/"}>
            <button className={style.primary2}>BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
