const express = require('express');
const router = express.Router();

const testIndex = function(req, res, next) {
	res.status(200);
	res.json({"test":"hello"});
};

router.get('/', testIndex);


module.exports = router;
