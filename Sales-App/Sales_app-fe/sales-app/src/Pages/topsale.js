import { useEffect, useState } from "react";
import "./topsale.css";
import axios from "axios";
import { BaseUrl } from "../config";
import Swal from "sweetalert2";

const Topsale = () => {

  useEffect(() => {
    getTopSales();
  });
  const [topSales, setTopSale] = useState([]);
  const CONFIG_URL = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const getTopSales = async () => {
    const response = await axios.get(`${BaseUrl}/topsale`, CONFIG_URL);
    if (response.status === 200) {
      setTopSale(response.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  return (
    <div className="topSale">
      <div className="heading text-center mb-5 mt-5">
        <h1>TOP 5 SALES</h1>
      </div>
      <div className="list">
        <b>
          <div className="row">
            <div className="col-md-1 col-1">
              <b>#</b>
            </div>
            <div className="col-md-2 col-2">Sales Id:</div>
            <div className="col-md-3 col-3">Product Name</div>
            <div className="col-md-3 col-3">Quantity</div>
            <div className="col-md-3 col-3">Sale Amount</div>
          </div>
          <hr className="bold-hr" />
        </b>
        {topSales.map((data,index) => {
            let indexOfSales =index +1;
          return (
            <div key={data._id}>
              <div className="row">
                <div className="col-md-1 col-1">
                  <b>{indexOfSales}</b>
                </div>
                <div className="col-md-2 col-2">{data.saleId}</div>
                <div className="col-md-3 col-3">{data.productName}</div>
                <div className="col-md-3 col-3">{data.quantity}</div>
                <div className="col-md-3 col-3">{data.saleAmount}</div>
              </div>
              <hr className="text-muted" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topsale;
