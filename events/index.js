const fs = require("node:fs");
const path = require("node:path");

function loadEvents(client) {
  const eventsPath = path.join(__dirname);
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js") && file !== "index.js");

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

module.exports = { loadEvents };
