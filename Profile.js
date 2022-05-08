import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  let { username } = useParams();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8000/profile/${username}`, {
        headers: { Authorization: localStorage.getItem("ourToken") },
      })
      .then((res) => {
        setName(res.data.firstname);
        setPhoto(res.data.photo);
      })
      .catch((err) => console.log(err));
  };

  fetchUser();

  return (
    <>
      <img src={photo} alt="img" className="img"></img>
      <p>
        Profile {name}
        <button
          onClick={() => {
            navigate("/about");
          }}
        >
          Change to about page
        </button>
      </p>
    </>
  );
};
