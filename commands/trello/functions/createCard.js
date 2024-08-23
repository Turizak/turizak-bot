const { EmbedBuilder } = require("discord.js");
const { boardInfo } = require("../data/boardInfo");
const { trelloInfo } = require("../data/trelloInfo");
const { memberInfo } = require("../data/memberInfo");
const { colorInfo } = require("../data/colorInfo");
const { toTitleCase } = require("../../../utils/toTitleCase");

createCard = async (interaction, board) => {
  const fetch = (await import("node-fetch")).default;

  const type = interaction.options.getString("type");
  const title = interaction.options.getString("title");
  const description = interaction.options.getString("description");
  const repo = interaction.options.getString("repo")
    ? interaction.options.getString("repo")
    : null;
  const assignment = interaction.options.getString("assignment")
    ? interaction.options.getString("assignment")
    : null;

  let labels = [];
  if (type) {
    labels.push(boardInfo[board].labelID[type]);
  }
  if (repo) {
    labels.push(boardInfo[board].labelID[repo]);
  }

  let assignmentID = null;
  if (assignment) {
    assignmentID = memberInfo[assignment];
  }

  let url = `https://api.trello.com/1/cards?idList=${
    boardInfo[board].boardID
  }&key=${trelloInfo.key}&token=${
    trelloInfo.token
  }&name=${title}&desc=${description}&pos=bottom&idLabels=${labels.join()}`;

  if (assignmentID) {
    url += `&idMembers=${assignmentID}`;
  }

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.text();
    })
    .then(async (text) => {
      const data = JSON.parse(text);

      // Create an embed for the card creation confirmation
      const embed = new EmbedBuilder()
        .setColor(colorInfo[type])
        .setTitle(title)
        .setURL(data.shortUrl)
        .setDescription(description)
        .addFields(
          {
            name: "Project",
            value: toTitleCase(board),
          },
          {
            name: "Labels",
            value: `${type ? toTitleCase(type) : ""}, ${
              repo ? repo.toUpperCase() : ""
            }`,
          },
          {
            name: "Assigned To",
            value: `${toTitleCase(assignment)}` || "None",
          },
        )
        .setTimestamp()
        .setFooter({
          text: "Turizak",
          iconURL:
            "https://avatars.githubusercontent.com/u/179054437?s=400&u=aa1e59a6a9a9772d4516891481dd1d194af01142&v=4",
        });

      await interaction.reply({ embeds: [embed] });
    })
    .catch(async (err) => {
      console.error(err);
      await interaction.reply("An error occurred while fetching Trello info.");
    });
};

exports.createCard = createCard;
