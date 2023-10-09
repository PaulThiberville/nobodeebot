const { SlashCommandBuilder } = require("discord.js");
const { peopleEmbed } = require("../../embeds/people");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Rank users in your voice channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply("You should be in a voice channel");
    }

    const shuffledMembers = voiceChannel.members.sort(
      (a, b) => 0.5 - Math.random()
    );

    const embeds = shuffledMembers.map((people) => {
      return peopleEmbed(people);
    });

    await interaction.reply({
      embeds,
    });
  },
};
