const express = require ('express');
const router = express.Router();

const service = require("../service/saved.service");

router.post("/",service.saveCode);
router.post("/code",service.getCode);
router.delete("/code/:email/:id",service.deleteCode)

module.exports = router