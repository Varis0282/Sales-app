import axios from "axios";
import "./login.css";
import Swal from 'sweetalert2';
import { useState } from "react";
import { BaseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const Register = () => {
    
  const navigate= useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const register = (event) => {
    setLoading(true);
    event.preventDefault();
    const requestData = {firstName, lastName, email, password};
    axios.post(`${BaseUrl}/register`,requestData)
    .then((result)=>{
        if (result.status === 201){
            Swal.fire({
                icon: 'success',
                title: 'User successfully registered'
            });
            navigate("/login");
            setLoading(false);
                            
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    })
  };
  return (
    <div className="Register">
      <div className="heading text-center mb-5 mt-5">
        <h1>REGISTRATION FORM</h1>
      </div>
      <div className="form">
        <form
          onSubmit={(e) => {
            register(e);
          }}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              value={firstName}
              onChange={(ev) => {
                setFirstName(ev.target.value);
              }}
              className="form-control"
              id="floatingInput2"
              placeholder="First Name"
            />
            <label htmlFor="floatingInput2">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              value={lastName}
              onChange={(ev) => {
                setLastName(ev.target.value);
              }}
              className="form-control"
              id="floatingInput3"
              placeholder="Last Name"
            />
            <label htmlFor="floatingInput3">Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              className="form-control"
              id="floatingInput4"
              placeholder="Email"
            />
            <label htmlFor="floatingInput4">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
              className="form-control"
              id="floatingPassword2"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword2">Password</label>
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

export default Register;
