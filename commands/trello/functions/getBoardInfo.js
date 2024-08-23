getBoardInfo = async (interaction) => {
  const fetch = (await import("node-fetch")).default;
  await fetch(
    `https://api.trello.com/1/members/me/boards?key=${process.env.TRELLO_APIKEY}&token=${process.env.TRELLO_TOKEN}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      return response.text();
    })
    .then(async (text) => {
      const data = JSON.parse(text);
      // Collect all board names into an array
      const boards = data.map((board) => board.name);
      const replyMessage = boards.length
        ? `Your boards:\n${boards.join("\n")}`
        : "No boards found.";
      await interaction.reply(replyMessage);
    })
    .catch(async (err) => {
      console.error(err);
      await interaction.reply("An error occurred while fetching Trello info.");
    });
};

exports.getBoardInfo = getBoardInfo;
