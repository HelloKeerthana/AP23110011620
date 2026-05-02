import axios from "axios";
import { BASE_URL, TOKEN } from "../vehicle_maintenance_scheduler/config/config.js"; 

export const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
  } catch (err) {
    console.error("Log failed:", err.message);
  }
};