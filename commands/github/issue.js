const { SlashCommandBuilder } = require("discord.js");
const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_REPO = process.env.GITHUB_REPO;

async function createGitHubIssue(interaction) {
  try {
    const type = interaction.options.getString("type");
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const assignment = interaction.options.getString("assignment");
    const label = interaction.options.getString("label");

    // Create labels based on type and repo
    const labels = [type, label];

    // Create the issue
    const issueResponse = await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: GITHUB_ORG,
      repo: GITHUB_REPO,
      title: title,
      body: description,
      labels: labels,
      assignees: assignment ? [assignment] : [],
    });

    // Add the issue to the project

    await interaction.reply({
      content: `Issue created successfully! View it here: ${issueResponse.data.html_url}`,
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    await interaction.reply({
      content: "There was an error creating the GitHub issue.",
      ephemeral: true,
    });
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("issue")
    .setDescription("Creates GitHub issue for Unnamed Chat")
    .addStringOption((option) =>
      option
        .setName("label")
        .setDescription("Label")
        .setRequired(true)
        .addChoices(
          { name: "Bug", value: "bug" },
          { name: "Documentation", value: "documentation" },
          { name: "Enhancement", value: "enhancement" },
          { name: "Test", value: "test" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of issue")
        .setRequired(true)
        .addChoices(
          { name: "Bug", value: "bug" },
          { name: "Spike", value: "spike" },
          { name: "Task", value: "task" }
        )
    )
    .addStringOption((option) => option.setName("title").setDescription("Title of issue").setRequired(true))
    .addStringOption((option) =>
      option.setName("description").setDescription("Issue description").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("assignment")
        .setDescription("Assign to")
        .setRequired(false)
        .addChoices({ name: "Tom", value: "slandath" }, { name: "Rob", value: "rakazirut" })
    ),

  async execute(interaction) {
    await createGitHubIssue(interaction);
  },
};
