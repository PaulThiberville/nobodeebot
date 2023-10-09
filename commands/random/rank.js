const { SlashCommandBuilder } = require("discord.js");
const { peopleEmbed } = require("../../embeds/people");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Rank users in your voice channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply("You should be in a voice channel");
    }

    const shuffledMembers = shuffleArray(voiceChannel.members);

    const embeds = shuffledMembers.map((people) => {
      return peopleEmbed(people);
    });

    await interaction.reply({
      embeds,
    });
  },
};
