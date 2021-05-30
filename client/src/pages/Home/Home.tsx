import { useAuthDataContext } from "../../contexts/AuthContext";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

interface User {
  avatar: string;
  email: string;
  username: string;
  id: number;
}
export const Home = () => {
  const { onLogout } = useAuthDataContext();

  const [user, setUser] = useState<User>();
  useEffect(() => {
    (async () => {
      await fetchUserDetails();
    })();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("/auth");
      setUser(res.data);
    } catch (e) {
      alert("It's like wrong");
    }
  };
  return (
    <div style={{ padding: 28 }}>
      <img
        src={user?.avatar}
        style={{ borderRadius: "50%", display: "block" }}
      />
      <p>Welcom back, {user?.username}</p>
      <p>Email: {user?.email}</p>
      <Button
        color="secondary"
        onClick={() => onLogout()}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </div>
  );
};
