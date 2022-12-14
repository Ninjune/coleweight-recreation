const { EmbedBuilder } = require("discord.js");
const maliciousMiners = require("../../contracts/MMinersFunctions")
const fs = require("node:fs")

module.exports = {
    name: 'removemm',
    description: 'Removes a MMiner (malicious miner) from the database.',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: true
        }
    ],
    
    execute: async (interaction, client) => {
        let username = interaction.options.getString("name"),
         permUsersRows = fs.readFileSync("./csvs/mminerUsers.csv", "utf8"),
         discordData = await interaction.guild.members.fetch(interaction.user),
         discordUser = discordData.user.username + "#" + discordData.user.discriminator

        if(permUsersRows.indexOf(discordUser) != -1)
        {
            result = maliciousMiners.removeMM(username)
            if(result == 0)
            {
                const embed = new EmbedBuilder()
                .setColor(0x999900)
                .setTitle("Malicious Miner")
                .setDescription(`${username} removed from the database.`)
                .setFooter({ text: `Made by Ninjune#0670`})
                interaction.followUp({ embeds: [embed] })
            }
            else
            {
                const embed = new EmbedBuilder()
                .setColor(0x990000)
                .setTitle("Malicious Miner")
                .setDescription(`${username} was not on the database!`)
                .setFooter({ text: `Made by Ninjune#0670`})
                interaction.followUp({ embeds: [embed] })
            }
        }
            
        else
        {
            const embed = new EmbedBuilder()
            .setColor(0x990000)
            .setTitle(`Error`)
            .setDescription("Only people on a certain list have permission to use this command.")
            .setFooter({ text: `Made by Ninjune#0670`})
            interaction.followUp({ embeds: [embed] })
        }
        
        
    },
};
