import axios from "axios";

const instance = axios.create({
    baseURL: "https://be-nodejs-chi.vercel.app/api",
})
export default instance;
