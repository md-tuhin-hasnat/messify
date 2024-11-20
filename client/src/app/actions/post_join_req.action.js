import { backendURL } from "@/lib/secret";
import axios from "axios";

export default async function postJoinRequest({ messCode }) {
  try {
    const response = await axios.post(
      `${backendURL}/api/mess/join`,
      { messcode: messCode },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "join failed");
  }
}
