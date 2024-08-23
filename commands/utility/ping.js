const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies "Soft!"'),
	async execute(interaction) {
		await interaction.reply("Zapier for non-developer ass bitches. They got soft hands brother.");
	},
};