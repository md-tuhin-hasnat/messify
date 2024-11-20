import { backendURL } from "@/lib/secret";
export default async function getUserById({ userId }) {
  try {
    const response = await fetch(`${backendURL}/api/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return {
        success: false,
        message: "No User found",
      };
    } else {
      return {
        success: false,
        message: "Server Error",
      };
    }
  } catch (error) {
    return {
      message: "Error",
    };
  }
}
