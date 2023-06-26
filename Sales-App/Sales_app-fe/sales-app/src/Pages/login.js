import "./login.css";
import "./addsales";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (event) => {
    setLoading(true);
    event.preventDefault();
    const requestData = { email, password };
    axios
      .post(`${BaseUrl}/login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("User", JSON.stringify(result.data.user));
          dispatch({ type: "successLogin", payload: result.data.user });
          setLoading(false);
          navigate("/addsale");
        }
        Swal.fire({
          icon: "success",
          text: result.data.message,
        });
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: "warning",
          text: err.response.data.message,
        });
      });
  };
  return (
    <div className="Login">
      <div className="heading text-center mb-5 mt-5">
        <h1>LOGIN FORM</h1>
      </div>
      <div className="form">
        <form
          onSubmit={(e) => {
            login(e);
          }}
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="form-control"
              id="floatingInput1"
              placeholder="Email address"
            />
            <label htmlFor="floatingInput1">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="form-control"
              id="floatingPassword1"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword1">Password</label>
          </div>
          {loading ? (
            <div className="col-md-12 mt-3 text-center">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button type="submit" className="btn custom-btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
