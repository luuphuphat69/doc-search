const SearchController = require("../controller/search");
const router = require('express').Router();

router.get('/search', SearchController.search);

module.exports = router;