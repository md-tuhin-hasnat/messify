import { backendURL } from "@/lib/secret";

export default async function getMesses() {
  try {
    const response = await fetch(`${backendURL}/api/mess/getbyid`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    } else {
      // console.log("error");
      return {
        message: "error",
      };
    }
  } catch (error) {
    return {
      message: "error",
    };
  }
}
