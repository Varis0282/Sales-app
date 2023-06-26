import { BaseUrl } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

const Revenue = () => {
  const [totalrevenue, setTotalRevenue] = useState("");
  const CONFIG_URL = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const revenue = async () => {
    const response = await axios.get(`${BaseUrl}/revenue`, CONFIG_URL);
    setTotalRevenue(response.data);
  };
  useEffect(()=>{
    revenue();
  })
  return (
    <div className="Revenue text-center mb-5 mt-5">
      <h1>TODAY'S REVENUE IS {totalrevenue}</h1>
    </div>
  );
};

export default Revenue;
