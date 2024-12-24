import { backendURL } from "@/lib/secret";

export default async function getUserRole({ messCode }) {
  try {
    if (messCode != "NUN") {
      const response = await fetch(
        `${backendURL}/api/mess/getrole/${messCode}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        // console.log("error");
        return {
          success: false,
        };
      }
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
}
