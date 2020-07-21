const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');
var JSAlert = require("js-alert");

router.get("/:guildID", CheckAuth, async (req, res) => { 
    let serv = req.client.server.client.guilds.get(req.params.guildID);
    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${req.client.server.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.guildID}`);
    if(!req.client.server.client.guilds.get(req.params.guildID).members.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/dashboard");
      res.render("guild.ejs", {
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Login"),
        client: req.client.server.client.user,
        user: req.user,
        avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        guild: serv,
      });
})
    .post("/:guildID", CheckAuth, async function(req, res) { 
        if(!req.body.prefix || req.body.prefix.length === 0) return;
        await res.redirect(`/servers/${req.params.guildID}`);
    });

module.exports = router;
