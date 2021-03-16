import axios from "axios";
import { applyAuthHeaderInterceptor } from "./interceptors";

const { REACT_APP_API_URI } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_API_URI,
});

applyAuthHeaderInterceptor(instance);

export default instance;
