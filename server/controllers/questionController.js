const asyncHandler = require("express-async-handler");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const generateQuestion = asyncHandler(async (req, res) => {
  const { query } = req.body;

  // Path to the Python script
  const pythonScriptPath = path.join(__dirname, "..", "ai", "model.py");

  // Spawn a child process to execute the Python script
  const pythonProcess = spawn("python", [pythonScriptPath, query]);

  let result = ""; // Variable to store the result

  // Handle output from the Python process
  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python script stdout: ${data}`);
    result += data.toString(); // Append data to the result
  });

  // Handle errors from the Python process
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error from Python script: ${data}`);
    // Handle errors if needed
  });

  // Handle Python process exit
  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    // Send the result after the Python process has finished
    res.json({ result });
  });
});

const fetchGeneratedQuestion = asyncHandler(async (req, res) => {
  const { questionType } = req.body;
  questionNumber = Math.floor(Math.random() * 10) + 1;

  let csvFilePath;
  // Path to CSV file
  if (questionType === "mcq") {
    csvFilePath = path.join(__dirname, "..", "ai", "mcqs.csv");
  } else if (questionType === "fitb") {
    csvFilePath = path.join(__dirname, "..", "ai", "fitb.csv");
  }

  // Array to store parsed CSV data
  let questionData = [];

  try {
    questionData = await new Promise((resolve, reject) => {
      const rows = [];
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          // Process each row of the CSV
          rows.push(row);
        })
        .on("end", () => {
          // CSV parsing is complete
          resolve(rows);
        })
        .on("error", (err) => {
          // Handle any error that occurs during parsing
          reject(err);
        });
    });
  } catch (err) {
    console.error("Error parsing CSV:", err);
  }

  console.log("THE RESULT:\t" + questionData[questionNumber - 1]);
  // Return the randomly selected question
  res.json({ questionData: questionData[questionNumber - 1] });
});

module.exports = {
  generateQuestion,
  fetchGeneratedQuestion,
};
