import { fetchDepots, fetchVehicles } from "./services/apiService.js";
import { selectTasks } from "./utils/scheduler.js";
import { Log } from "../logging_middleware/logger.js";

async function main() {
  await Log("backend", "info", "controller", "App started");

  const depots = await fetchDepots();
  const vehicles = await fetchVehicles();

  // Safe check
  if (!depots || depots.length === 0) {
    console.log("Depots not available");
    await Log("backend", "error", "controller", "Depots not available");
    return;
  }

  if (!vehicles || vehicles.length === 0) {
    console.log("Vehicles not available");
    await Log("backend", "error", "controller", "Vehicles not available");
    return;
  }

  // Correct field name
  const maxHours = depots[0].MechanicHours || 8;

  await Log("backend", "info", "controller", "Starting scheduling");

  const result = await selectTasks(vehicles, maxHours);

  console.log("Max Impact:", result);

  await Log("backend", "info", "controller", "Execution finished");
  console.log("Vehicles:", vehicles);
  console.log("Depots:", depots);
}

main();
