const resultController = require("../controller/result");
const router = require('express').Router();

router.get('/result', resultController.result);

module.exports = router;