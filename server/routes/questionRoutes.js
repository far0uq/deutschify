const express = require("express");
const router = express.Router();
const {
  generateQuestion,
  fetchGeneratedQuestion,
} = require("../controllers/questionController");

router.post("/question-generate", generateQuestion);
router.post("/question-fetch", fetchGeneratedQuestion);

module.exports = router;
