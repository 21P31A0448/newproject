import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import "../styles/RegiserStyles.css";


const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("User Data:", res.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="home-page">
        <h1>HomePage</h1>
      </div>
    </Layout>
  );
};

export default HomePage;


