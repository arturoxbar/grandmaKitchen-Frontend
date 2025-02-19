import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://192.168.1.128:7338/api/v1",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserEndpoints = {
  create: "/users/signup",
  login: "/users/login",
};

const recipeEndpoints = {
  create: "/recipes/",
  getUserRecipes: "/recipes/user",
};


export { AxiosInstance, UserEndpoints, recipeEndpoints };
