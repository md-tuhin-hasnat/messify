import { backendURL } from "@/lib/secret";
import axios from "axios";

export default async function ApproveJoinRequest({ userId, messCode }) {
  try {
    const response = await axios.post(
      `${backendURL}/api/mess/approve`,
      { userId: userId, messCode: messCode },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Approval Failed");
  }
}
