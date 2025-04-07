const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { logger } = require("./utils/logger");
require("dotenv").config();

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
      logger.log({
        level: "info",
        message: `Loaded command: ${command.data.name}`,
      });
    } else {
      logger.log({
        level: "warn",
        message: `The command at ${filePath} is missing a required "data" or "execute" property`,
      });
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy commands
(async () => {
  try {
    logger.log({
      level: "info",
      message: `Started refreshing ${commands.length} application (/) commands.`,
    });

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENTID,
        process.env.DISCORD_GUILDID
      ),
      { body: commands }
    );

    logger.log({
      level: "info",
      message: `Successfully reloaded ${data.length} application (/) commands`,
    });
  } catch (error) {
    logger.log({
      level: "error",
      message: `${error}`,
    });
  }
})();
