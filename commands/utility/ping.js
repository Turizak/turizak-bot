const { SlashCommandBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command to check if the bot is online."),
  async execute(interaction) {
    try {
      await interaction.reply("Response received! Bot is online and responding.");
    } catch (error) {
      logger.log({
        level: "error",
        message: `Error occurred while executing the ping command: ${error}`,
      });
    } finally {
      logger.log({
        level: "info",
        message: "Ping command executed successfully",
      });
    }
  },
};
