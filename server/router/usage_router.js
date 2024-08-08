const usageController = require("../controller/usage");
const router = require('express').Router();

router.get('/clearlist', usageController.clearlist);

module.exports = router;