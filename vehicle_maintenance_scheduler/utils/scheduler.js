import { Log } from "../../logging_middleware/logger.js";

export const selectTasks = async (tasks, maxHours) => {
  await Log("backend", "info", "service", "Starting scheduler");

  let n = tasks.length;

  let dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    let duration = tasks[i - 1].Duration;
    let impact = tasks[i - 1].Impact;

    for (let w = 0; w <= maxHours; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  await Log("backend", "info", "service", "Scheduler completed");

  return dp[n][maxHours];
};
