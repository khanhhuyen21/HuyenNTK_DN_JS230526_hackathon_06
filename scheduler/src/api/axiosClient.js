import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:8000/`,
});
const cancelTokenSource = axios.CancelToken.source();

instance.interceptors.request.use(
  function (config) {
    config.cancelToken = cancelTokenSource.token;
    let localData = window.localStorage.getItem("asscessToken");
    if (localData && typeof localData === "string") {
      const accessToken = JSON.parse(localData)?.token || {};
      config.headers = { authorization: "Bearer " + accessToken };
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Kiểm tra điều kiện trước khi hủy
    if (response.data.shouldCancelRequest) {
      cancelTokenSource.cancel("Request cancelled based on condition");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error.response?.data);
  }
);

export default instance;
