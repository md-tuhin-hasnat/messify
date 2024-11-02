"use server";
import { backendURL } from "@/lib/secret";
import axios from "axios";

export default async function regSubmit(data) {
  try {
    const { name, email, password } = data;
    const response = await axios.post(
      `${backendURL}/api/auth/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}
