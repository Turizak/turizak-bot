const { SlashCommandBuilder } = require("discord.js");
const { createCard } = require("./functions/createCard");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trellocard")
    .setDescription("Creates Trello card in selected board")
    .addStringOption((option) =>
      option
        .setName("board")
        .setDescription("Select project board")
        .setRequired(true)
        .addChoices(
          { name: "DnD", value: "dnd" },
          { name: "Hivemind", value: "hivemind" },
          { name: "MTG", value: "mtg" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of card")
        .setRequired(true)
        .addChoices(
          { name: "Bug", value: "bug" },
          { name: "Spike", value: "spike" },
          { name: "Task", value: "task" }
        )
    )
    .addStringOption((option) => option.setName("title").setDescription("Title of card").setRequired(true))
    .addStringOption((option) =>
      option.setName("description").setDescription("Inner card content").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("For frontend or backend")
        .setRequired(false)
        .addChoices({ name: "FE", value: "fe" }, { name: "BE", value: "be" })
    )
    .addStringOption((option) =>
      option
        .setName("assignment")
        .setDescription("Assign to")
        .setRequired(false)
        .addChoices({ name: "Tom", value: "tom" }, { name: "Rob", value: "rob" })
    ),

  async execute(interaction) {
    await createCard(interaction);
  },
};
