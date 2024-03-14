exports.peopleEmbed = (people) => {
  const { id, avatar, globalName, username } = people.user;
  const { nickName, displayName, displayAvatarURL } = people;
  const icon_url =
    displayAvatarURL ||
    `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  const name = nickName || displayName || globalName || username;
  return {
    author: {
      name,
      icon_url,
    },
  };
};
