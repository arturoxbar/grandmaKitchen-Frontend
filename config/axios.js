import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://grandmakitchen-backend-production.up.railway.app/api/v1",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserEndpoints = {
  create: "/users/signup",
  login: "/users/login",
  get: "/users/user",
  update: "/users/user",
};

const recipeEndpoints = {
  baseUrl: "/recipes/",
  getUserRecipes: "/recipes/user",
};

const categoryEndpoints = {
  baseUrl: "/categories/",
};

export { AxiosInstance, UserEndpoints, recipeEndpoints, categoryEndpoints };
