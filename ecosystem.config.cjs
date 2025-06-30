module.exports = {
  apps: [
    {
      name: "main",
      script: "./src/main.js",
      cron_restart: "*/10 * * * *",
    },
  ],
};
