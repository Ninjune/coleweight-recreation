const config = require("../../config.json");
const { reqHypixelApi } = require("./api");
const { getColeweight } = require("./coleweightFunctions");

async function getColors(uuid)
{
    if(uuid == undefined)
        return [];
    const colors = ["6"];
    const cw = await getColeweight(uuid);
    if(cw.rank <= 50)
        setPush(colors, ["b"]);
    if(cw.rank <= 5)
        setPush(colors, ["4", "z"])
    
    if((await inMiningCult(uuid)))
        setPush(colors, ["1","3","7","8","9","a","c","e"]);
    if(cw.name.toLocaleLowerCase() == "ninjune")
        setPush(colors, ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","z"])
    
    return colors;
}


const guildMembers = [];
async function inMiningCult(uuid)
{
    if(guildMembers.length != 0)
        return guildMembers.includes(uuid);
    let guild = await reqHypixelApi(`/v2/guild?key=${config.api.hypixelAPIkey}&name=mining+cult`)
    if(!guild.success)
        return false;
    guild = guild.guild;
    guild.members.forEach(member => {
        guildMembers.push(member.uuid);
    })

    return guildMembers.includes(uuid);
}


/**
 * adds to array like a set (no dupes)
 * @param {Array} array 
 * @param {Array} values 
 */
function setPush(array, values)
{
    values.forEach(value => {
        if(!array.includes(value))
            array.push(value);
    });
}

module.exports = { getColors }