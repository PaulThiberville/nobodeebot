const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  try {
    const scheduledEventsPath = path.join(__dirname);
    const scheduledEventFiles = fs
      .readdirSync(scheduledEventsPath)
      .filter((file) => file.endsWith(".js") && file !== "index.js");

    for (const file of scheduledEventFiles) {
      const filePath = path.join(scheduledEventsPath, file);
      const scheduledEvent = require(filePath);
      scheduledEvent(client);
    }
  } catch (error) {
    console.error(error);
  }
};
