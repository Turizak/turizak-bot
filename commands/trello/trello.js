const { SlashCommandBuilder } = require("discord.js");
const { getBoardInfo } = require("./functions/getBoardInfo");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trello")
    .setDescription("Replies with Trello info"),
  async execute(interaction) {
    await getBoardInfo(interaction);
  },
};
