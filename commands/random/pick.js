const { SlashCommandBuilder } = require("discord.js");
const { peopleEmbed } = require("../../embeds/people");
const { db } = require("../../firebase");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a user in your voice channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply("You should be in a voice channel");
    }
    const lastPickRes = await db.collection("last_pick").doc("current").get();
    let selectedMemberIndex = null;
    while (!selectedMemberIndex) {
      let randomMemberIndex = Math.floor(
        Math.random() * voiceChannel.members.size
      );
      if (!lastPickRes.exists) {
        selectedMemberIndex = randomMemberIndex;
      }
      const lastPick = lastPickRes.data();
      if (lastPick.memberId !== voiceChannel.members[randomMemberIndex].id) {
        console.log("lastPick", lastPick);
        console.log("randomMemberIndex", randomMemberIndex);
        console.log("voiceChannel.members", voiceChannel.members);
        console.log(
          "voiceChannel.members[randomMemberIndex]",
          voiceChannel.members[randomMemberIndex]
        );
        await db.collection("last_pick").doc("current").set({
          memberId: voiceChannel.members[randomMemberIndex].id,
          date: Date.now(),
        });
        selectedMemberIndex = randomMemberIndex;
      }
    }

    const randomMember = [...voiceChannel.members][randomMemberIndex];

    await interaction.reply({
      embeds: [peopleEmbed(randomMember[1])],
    });
  },
};
