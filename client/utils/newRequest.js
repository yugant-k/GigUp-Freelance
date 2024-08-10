import axios from "axios";
import { BASE_URL } from "../constants";

const newRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default newRequest;