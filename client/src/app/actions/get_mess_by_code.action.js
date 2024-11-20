import { backendURL } from "@/lib/secret";
export default async function getMessByCode({ mess_code }) {
  console.log(mess_code);
  try {
    const response = await fetch(
      `${backendURL}/api/mess/getbycode/${mess_code}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return {
        success: false,
        message: "No mess found",
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
