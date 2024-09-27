import axios from "axios";

const instance = axios.create({

    baseURL: "https://be-nodejs-chi.vercel.app/api",
    // baseURL: " http://localhost:8080/api",
})
export default instance;
