const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

router.get('/', CheckAuth, async(req, res) => {
    res.render("guilds.ejs", {
        status: (req.isAuthenticated() ? `${req.user.username}` : "Logout"),
        client: req.client.server.client.user,
        user: req.user,
        guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
        avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
    });
});

module.exports = router;