import { backendURL } from "@/lib/secret";

export default async function readNotification({ notificationId }) {
  try {
    const response = await fetch(`${backendURL}/api/${notificationId}/read`, {
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
