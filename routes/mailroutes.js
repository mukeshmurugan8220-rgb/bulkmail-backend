const express = require("express");
const router = express.Router();

const { sendMail } = require("../controllers/mailController");

router.post("/mail/send", sendMail);

module.exports = router;