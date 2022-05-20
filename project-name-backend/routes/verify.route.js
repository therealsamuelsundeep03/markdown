const express= require('express');
const router = express.Router();

const service = require("../service/verify.service");

router.post("/",service.verifyUser);

module.exports = router;