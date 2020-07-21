const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');
const CheckAdmin = require('../auth/CheckAdmin');

router.get('/', CheckAuth, async(req, res) => {
    res.render("admin.ejs", {
        status: (req.isAuthenticated() ? `${req.user.username}` : "Logout"),
        client: req.client.server.client.user,
        user: req.user,
        guilds: req.user.guilds,
        avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
    });
});

module.exports = router;