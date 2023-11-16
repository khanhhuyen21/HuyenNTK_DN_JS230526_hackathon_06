import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./api/apiUser";
// import axios from "axios";
import { message } from "antd";
function Login() {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    passwordError: "",
  });

  const handleLogin = async () => {
    let hasError = false;

    if (!password) {
      setError({ ...error, passwordError: "Please enter your password" });
      hasError = true;
    } else {
      setError({ ...error, passwordError: "" });
    }

    if (hasError) {
      return;
    }
    const response = await login({ password, email });
    if (response.data.success === false) {
      message.error("username or password incorrect");
    }

    if (response) {
      if (response.data.data.status === 0) {
        message.error("Account was blocked");
      } else {
        localStorage.setItem("accessToken", response.accessToken);

        response.data.data.role === 1 ? navigate("/") : navigate("/scheduler");
      }
    }
  };
  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://i.pinimg.com/564x/3a/a5/37/3aa537a7dbd832319d960c7e66c0f373.jpg"
                alt="login"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Username
                  </p>
                  <input
                    placeholder="username"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Password
                  </p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative text-center">
                  <button
                    onClick={handleLogin}
                    className="w-[80%] h-15 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease cursor-pointer"
                  >
                    Log In
                  </button>
                </div>
                <p className="text-center">
                  Haven't an account?{" "}
                  <Link to="/register" className="text-blue-500">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
