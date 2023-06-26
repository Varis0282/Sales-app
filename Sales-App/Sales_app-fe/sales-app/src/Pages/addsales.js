import "./login.css";
import Swal from "sweetalert2";
import axios from "axios";
import { BaseUrl } from "../config";
import { useState } from "react";

const Addsale = () => {
  const CONFIG_URL = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [saleId, setSaleId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleAmount, setSaleAmount] = useState("");

  const addsale = (event) => {
    event.preventDefault();
    if (saleId === "") {
      Swal.fire({
        icon: "error",
        title: "Please Enter Sale Id",
      });
    } else if (productName === "") {
      Swal.fire({
        icon: "error",
        title: "Please Enter Product Name",
      });
    } else if (quantity === "") {
      Swal.fire({
        icon: "error",
        title: "Please Enter Quantity",
      });
    } else if (saleAmount === "") {
      Swal.fire({
        icon: "error",
        title: "Please Enter Sale Amount",
      });
    } else {
      const requestData = { saleId, productName, quantity, saleAmount };
      axios
        .post(`${BaseUrl}/addsale`, requestData, CONFIG_URL)
        .then((result) => {
          if (result.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Added",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: result,
            });
          }
          setSaleId("");
          setProductName("");
          setQuantity("");
          setSaleAmount("");
        });
    }
  };
  return (
    <div className="Addsale">
      <div className="heading text-center mb-5 mt-5">
        <h1>ADD SALE ENTRY</h1>
      </div>
      <div className="form">
        <form
          onSubmit={(e) => {
            addsale(e);
          }}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              value={saleId}
              onChange={(ev) => {
                setSaleId(ev.target.value);
              }}
              className="form-control"
              id="floatingInput2"
              placeholder="Sales Id"
            />
            <label htmlFor="floatingInput2">Sales Id</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              value={productName}
              onChange={(ev) => {
                setProductName(ev.target.value);
              }}
              className="form-control"
              id="floatingInput2"
              placeholder="Product Name"
            />
            <label htmlFor="floatingInput2">Product Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              value={quantity}
              onChange={(ev) => {
                setQuantity(ev.target.value);
              }}
              className="form-control"
              id="floatingInput3"
              placeholder="Quantity"
            />
            <label htmlFor="floatingInput3">Quantity</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={saleAmount}
              onChange={(ev) => {
                setSaleAmount(ev.target.value);
              }}
              className="form-control"
              id="floatingInput4"
              placeholder="Amount"
            />
            <label htmlFor="floatingInput4">Amount</label>
          </div>
          <button type="submit" className="btn custom-btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsale;
