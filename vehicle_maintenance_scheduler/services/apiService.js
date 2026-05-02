import axios from "axios";
import { BASE_URL, TOKEN } from "../config/config.js";
import { Log } from "../../logging_middleware/logger.js";

// Fetch Depots
export const fetchDepots = async () => {
  await Log("backend", "info", "service", "Fetching depots");

  try {
    const res = await axios.get(`${BASE_URL}/depots`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    // Check response safely
    if (!res.data || !res.data.depots) {
      await Log("backend", "warn", "service", "Depots data missing");
      return [];
    }

    await Log("backend", "info", "service", "Depots fetched");
    return res.data.depots;

  } catch (err) {
    await Log("backend", "error", "service", err.message);
    return []; // important: return empty array instead of undefined
  }
};


// Fetch Vehicles
export const fetchVehicles = async () => {
  await Log("backend", "info", "service", "Fetching vehicles");

  try {
    const res = await axios.get(`${BASE_URL}/vehicles`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    if (!res.data || !res.data.vehicles) {
      await Log("backend", "warn", "service", "Vehicles data missing");
      return [];
    }

    await Log("backend", "info", "service", "Vehicles fetched");
    return res.data.vehicles;

  } catch (err) {
    await Log("backend", "error", "service", err.message);
    return [];
  }
};
