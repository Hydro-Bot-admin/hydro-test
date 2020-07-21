const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

router.get('/invite', CheckAuth, async(req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=734071891622494279&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&scope=bot')
    });

module.exports = router;