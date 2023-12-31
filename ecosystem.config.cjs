module.exports = {
  apps: [
    {
      name: "main",
      script: "./src/main.js",
      env: {
        DEBUG: "Spotify",
      },
      cron_restart: "*/10 * * * *",
    },
  ],
};
