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
      alert("Done !");
      router.push("/profile");
    } else {
      alert("Error! please try after few minutes.");
    }
  };

  const [newImage, setNewImage] = useState();
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [preview, setPreview] = useState(
    "data:image/jpeg;base64,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"
  );
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
