require("dotenv").config();
const { Octokit } = require("@octokit/rest");
const { logger } = require("./utils/logger");

// Initialize Octokit with your GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Mock Discord interaction object
const mockInteraction = {
  options: {
    getString: (name) => {
      const testData = {
        type: "bug",
        title: "Test Issue from CLI",
        description: "This is a test issue created from the command line",
        repo: "fe",
        assignment: "slandath",
      };
      return testData[name];
    },
  },
  reply: async ({ content, ephemeral }) => {
    logger.log({
      level: "info",
      message: `Bot would reply: ${content} (ephemeral: ${ephemeral})`,
    });
  },
};

// Test function to create GitHub issue
async function testCreateIssue() {
  try {
    // Get mock data from interaction
    const type = mockInteraction.options.getString("type");
    const title = mockInteraction.options.getString("title");
    const description = mockInteraction.options.getString("description");
    const repo = mockInteraction.options.getString("repo");
    const assignment = mockInteraction.options.getString("assignment");

    // Create labels based on type and repo
    const labels = [type];
    if (repo) labels.push(repo.toUpperCase());

    logger.log({
      level: "info",
      message: "Creating issue with the following data:",
      metadata: {
        title,
        description,
        labels,
        assignee: assignment,
      },
    });

    // Create the issue
    const response = await octokit.issues.create({
      owner: process.env.GITHUB_ORG,
      repo: process.env.GITHUB_REPO,
      title: title,
      body: description,
      labels: labels,
      assignees: assignment ? [assignment] : [],
    });

    logger.log({
      level: "info",
      message: `Issue created successfully!`,
      metadata: {
        url: response.data.html_url,
        number: response.data.number,
      },
    });

    // Mock Discord reply
    await mockInteraction.reply({
      content: `Issue created successfully! View it here: ${response.data.html_url}`,
      ephemeral: true,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: "Error creating GitHub issue:",
      metadata: {
        error: error.message,
      },
    });
  }
}

// Run the test
console.log("Starting test...");
testCreateIssue()
  .then(() => {
    console.log("Test completed!");
  })
  .catch((error) => {
    console.error("Test failed:", error);
  });
