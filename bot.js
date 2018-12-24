const Discord = require('discord.js')
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');

const fileName = "cletox_lastname.txt";


// --- IDS ---
const SERVER_CLETOX_ID = "390418625124761603";
const CLETOX_ID = "379970699747393536";
const AIR_ID = "302842908581560320";
const ZAKEBO_ID = "143088242982387713";


const TARGET = CLETOX_ID;

client.on('ready', () => {
    console.log("Connecté en tant que " + client.user.tag);
    client.user.setActivity("Cletox se masturber", { type: "WATCHING" });

    //On regarde si il a changé de pseudo pdt la déco du bot

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        oldmember = data;

        let newmember = client.guilds.get(SERVER_CLETOX_ID).members.get(TARGET);
        if (newmember.displayName != oldmember) {
            ChangeNames(oldmember, newmember);
        }

    });
});

client.on('guildMemberUpdate', (oldmember, newmember) => {

    if ((oldmember.user.id === TARGET) && (oldmember.guild.id === SERVER_CLETOX_ID) && (oldmember.displayName != newmember.displayName)) {

        ChangeNames(oldmember.displayName, newmember);

    }
});


function ChangeNames(oldmember, newmember) {
    client.guilds.get(SERVER_CLETOX_ID).members.forEach((member) => {
        if (member.manageable) {
            member.setNickname(newmember.displayName);
            console.log(member.user.username + " a bien été rename");
        }
        else {
            console.log(member.user.username + " ne peut pas être rename");
        }
    });

    client.fetchUser(AIR_ID).then(user => {
        user.send("LE CUCK CLETOX A CHANGE DE PSEUDO : \"" + oldmember + "\" en \"" + newmember.displayName + "\"")
    });

    client.fetchUser(ZAKEBO_ID).then(user => {
        user.send("LE CUCK CLETOX A CHANGE DE PSEUDO : \"" + oldmember + "\" en \"" + newmember.displayName + "\"")
    });

    saveName(newmember.displayName);
}


function saveName(newmember) {
    fs.writeFile(fileName, newmember, (err) => {
        if (err) console.log(err); else console.log("Le nouveau pseudo de Cletox a bien été sauvegardé");
    });

}

client.login(config.token);
