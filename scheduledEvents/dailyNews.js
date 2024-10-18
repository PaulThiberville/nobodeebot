const cron = require("node-cron");
const { sendDailyNewsInChannel } = require("../utils/dailyNews");

module.exports = (client) => {
  cron.schedule(
    "25 10 * * *",
    async () => {
      const setChannelCommand = client.commands.get("set-news-channel");
      const targetChannelName = setChannelCommand.getTargetChannelName();
      const channel = client.channels.cache.find(
        (ch) => ch.name === targetChannelName
      );

      if (!channel) {
        return console.log(
          `Le canal '${targetChannelName}' n'a pas été trouvé.`
        );
      }
      await sendDailyNewsInChannel(channel);
    },
    {
      timezone: "Europe/Paris",
    }
  );
};
