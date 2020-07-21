const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

router.get('/support', CheckAuth, async(req, res) => {
	res.redirect("")
});

module.exports = router;