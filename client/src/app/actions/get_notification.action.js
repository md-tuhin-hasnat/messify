import { backendURL } from "@/lib/secret";

export default async function fetchNotificationByPage({ page }) {
  try {
    const response = await fetch(`${backendURL}/api/notification/get/${page}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error fetching notifications: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
