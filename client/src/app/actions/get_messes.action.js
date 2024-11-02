import { backendURL } from "@/lib/secret";

export default async function getMesses() {
  try {
    const response = await fetch(`${backendURL}/api/mess/get`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log("error");
      return {
        message: "error",
      };
    }
  } catch (error) {
    // throw new Error(error.message || "Error to get mess data");
    return {
      message: "error",
    };
  }
}
