require("dotenv").config();
require("./firebase");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./commands");
const { loadEvents } = require("./events");
const initializeScheduledEvents = require("./scheduledEvents");
const token = process.env.TOKEN;
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.once("ready", () => {
  try {
    initializeScheduledEvents(client);
  } catch (error) {
    console.error(error);
  }
});

client.login(token);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
