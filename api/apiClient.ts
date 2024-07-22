import axios from "axios";
import { env } from "process";

const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_DEV_BASE_URL,
});

export default apiClient;
