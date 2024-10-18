const { SlashCommandBuilder } = require("discord.js");
const { db } = require("../../firebase");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unsubscribe-news")
    .setDescription("Se désabonner de l'alerte quotidienne"),
  async execute(interaction) {
    try {
      const user = interaction.user;
      const usersRes = await db
        .collection("daily_news_subscribers")
        .where("userId", "==", interaction.user.id)
        .get();
      if (usersRes.docs.length === 0) {
        await interaction.reply(
          `<@${user.id}>, vous n'êtes pas abonné à l'alerte quotidienne`
        );
      } else {
        await db
          .collection("daily_news_subscribers")
          .doc(usersRes.docs[0].id)
          .delete();
        await interaction.reply(
          `<@${user.id}>, vous êtes désormais désabonné de l'alerte quotidienne`
        );
      }
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `Une erreur est survenue lors de la désabonnement à l'alerte quotidienne`
      );
    }
  },
};
