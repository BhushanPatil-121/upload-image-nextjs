"use client";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";

import Link from "next/link";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteOutline } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function Edit({ searchParams }) {
  useEffect(() => {
    const fetchData = async () => {
      let userData = await getData(id);

      let data = userData.result;
      setNewName(data.name);
      setNewCity(data.city);
      setNewHeading(data.heading);
      setPreview(data.avatar);
    };
    fetchData();
  }, []);

  let id = searchParams.id;
  // console.log(searchParams);
  const getData = async (id) => {
    let data = await fetch(`/api/${id}`, { caches: "no-store" });
    data = await data.json();
    if (data.success) {
      console.log("true");
    } else {
      router.push("/");
    }
    return data;
  };
  let router = useRouter();
  const updateData = async (newData) => {
    let data = await fetch(
      "/api",
      {
        method: "PUT",
        body: JSON.stringify(newData),
      },
      { caches: "no-store" }
    );
    data = await data.json();
    if (data.success) {
      alert("Profile Updated Successfuly.");
      router.push("/profile");
    } else {
      alert("Error! please try after few minutes.");
    }
  };

  const [newImage, setNewImage] = useState();
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [preview, setPreview] = useState("");
  const imageChange = (e) => {
    const file = e.target.files[0];
    // const fileType = file["type"];
    // const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    // if (!validImageTypes.includes(fileType)) {
    setPreview(URL.createObjectURL(file));
    // }
    const reader = new FileReader();
    reader.onloadend = () => {
      //   console.log(reader.result);
      setNewImage(reader.result);
    };
    let i = reader.readAsDataURL(file);
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
  const handleClick= async()=>{
    let text = "Press OK to Delete";
    if (confirm(text) == true) {
      // const deleteData = async (id) => {
        let data = await fetch(`/api/${id}`, { 
          method:"Delete",
          body:JSON.stringify({id})
         });
        data = await data.json();
        if (data.success) {
          alert("Profile Deleted!");
          router.push("/")
        } else {
          alert("Error !");
        }
      
    } else {
      alert("You canceled!");
    }
  }
  return (
    <div>
      <div className={style.cardContainer}>
      <div className={style.buttons}>
          <button className={style.primary} onClick={handleClick}>
          <DeleteOutline sx={{color: red[500]}} fontSize="small" /> 
            </button>
        </div>
        {preview ? (
          <Image
            className={style.round}
            width={150}
            height={150}
            src={preview}
            alt="user"
          />
        ) : (
          <Image
            className={style.round}
            width={150}
            height={150}
            src="/loading.png"
            alt="user"
            priority
          />
        )}
        <br />
        <div className={style.inputImg}>
          {/* <form onSubmit={update} method="Put" > */}
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
            UPDATE
          </button>
          <Link href={"/profile"}>
            <button className={style.primary2}>BACK</button>
          </Link>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
