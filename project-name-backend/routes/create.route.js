const express = require('express');
const router = express.Router();

const service = require("../service/create.service");

router.post("/",service.user);

module.exports = router;