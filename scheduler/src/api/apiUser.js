import axios from "axios";

// const token = localStorage.getItem("asscessToken");

export const login = async (data) => {
  return await axios
    .post(`http://localhost:8000/login`, data)
    .then((response) => {
      console.log(response);

      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};
