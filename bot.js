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
const ZORTOP_ID = "204333691114225665";
const NEWEMBER_ID = "224208535691460618";


var list_person_dm = [ZAKEBO_ID,AIR_ID,ZORTOP_ID,NEWEMBER_ID];

const TARGET = CLETOX_ID;

client.login(config.token);


client.on('ready', () => {
    console.log("Connecté en tant que " + client.user.tag);
    client.user.setActivity("Cletox se masturber", { type: "WATCHING" });

    //On regarde si il a changé de pseudo pdt la déco du bot

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        oldmember = data;

        let newmember = client.guilds.get(SERVER_CLETOX_ID).members.get(TARGET);
        if (newmember.displayName != oldmember) {
            console.log("****LE CUCK A BIEN CHANGE DE PSEUDO****");
            ChangeNames(oldmember, newmember);
        }
        else {
            console.log("****LE CUCK EST RESTE SAGE ET N'A PAS CHANGE D'IDENTITE****");
        }

    });


});


client.on('message', (message) => {
    if (message.content.startsWith(config.prefix) && message.user != client) {
        detectCommand(message);
    }
});



client.on('guildMemberUpdate', (oldmember, newmember) => {

    if ((oldmember.user.id === TARGET) && (oldmember.guild.id === SERVER_CLETOX_ID) && (oldmember.displayName != newmember.displayName)) {

        ChangeNames(oldmember.displayName, newmember);

    }
});



function detectCommand(message) {
    switch (message.content.substring(1)) {
        case "kdo":
            message.channel.send({
                files: ['https://risibank.fr/cache/stickers/d36/3605-full.png']
            })
            break;
    }
}
function ChangeNames(oldmember, newmember) {
    console.log("****OPERATION CUCK EN COURS****");
    //Change everyone's name 
    console.log("---CHANGEMENT DES PSEUDOS---");
    client.guilds.get(SERVER_CLETOX_ID).members.forEach((member) => {
        if (member.manageable) {
            member.setNickname(newmember.displayName);
            console.log(member.user.username + " a bien été rename");
        }
        else {
            console.log(member.user.username + " ne peut pas être rename");
        }
    });


    //Change bot's name
    console.log("---RENAME DU BOT---");
    client.guilds.get(SERVER_CLETOX_ID).member(client.user).setNickname(newmember.displayName);
    console.log("Nouvelle identité du bot en place.")
    //MP les gens pour prévenir

    let message = "-----------------";
    message += "\n";
    message += "LE CUCK " + newmember.user.username + " A CHANGE DE PSEUDO \n";
    message += "AVANT : \n";
    message += oldmember;
    message += "\n";
    message += "APRES : \n"
    message += newmember.displayName;

    console.log("---ENVOIE DES MP---");
    list_person_dm.forEach((id) => {
        client.fetchUser(id).then(user => {
            //Envoie du message
            user.send(message);
            console.log("MP à " + user.username + " bien envoyé");
        });
    });

    saveName(newmember.displayName);
}


//Save target's new name
function saveName(newmember) {
    fs.writeFile(fileName, newmember, (err) => {
        if (err) console.log(err); else console.log("Le nouveau pseudo de Cletox a bien été sauvegardé");
    });

}


