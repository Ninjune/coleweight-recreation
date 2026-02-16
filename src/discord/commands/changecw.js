const { EmbedBuilder } = require("discord.js")
const fs = require("node:fs")
const { badResponse } = require("../../contracts/commandResponses")

module.exports = {
    name: "changecw",
    description: "(Requires permission) Changes one coleweight value to the new value (DESTRUCTIVE)",
    options: [
        {
            name: "valueName",
            description: "(case insensitive) type with spaces exact",
            type: 3,
            required: true
        },
        {
            name: "newValue",
            description: "number",
            type: 3,
            required: true
        }
    ],

    execute: async (interaction, client) => {
        const permUsersRows = fs.readFileSync("./csvs/cwinfo.csv", "utf8").split("\r\n")
        const valueName = interaction.options.getString("valueName").toLowerCase()
        const newCost = interaction.options.getString("newValue")

        if(permUsersRows.includes(interaction.user.id))
        {
            const cwinfo = JSON.parse(fs.readFileSync("./csvs/cwinfo.json", "utf8"))

            const entry = cwinfo.find((element) => element.nameStringed.toLowerCase() == valueName)
            entry.cost = newCost

            fs.writeFileSync("./csvs/cwinfo.json", JSON.stringify(cwinfo))

            const embed = new EmbedBuilder()
            .setColor(0x999900)
            .setTitle("Sucessfully updated value")
            .setDescription(`${valueName} updated from ${oldCost} to ${newCost}!`)
            .setFooter({ text: "Made by Ninjune"})

            interaction.followUp({ embeds: [embed] })
        }
        else
            badResponse(interaction, "No permission.")
    }
}

