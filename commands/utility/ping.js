const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command to check if the bot is online."),
  async execute(interaction) {
    await interaction.reply(
      "Response received! Bot is online and responding."
    );
  },
};
