const webpal = require('webpal')
const express = require('express')
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8085;

app.use(express.json());
app.use(cors());

app.post('/createExercise', (req, res) => {
    const solutionData = req.body;
    console.log(solutionData)
    const id = webpal.createExercise(solutionData.code, solutionData.tests, solutionData.assignment);
    res.send(id);
});

app.post('/deleteExercise', (req, res) => {
    const id = req.body.id;
    webpal.deleteExercise(id);
    res.status(200).send("Deleted");
});

app.post('/getFullExercise', (req, res) => {
    const id = req.body.id;
    const exercise = webpal.getFullExercise(id)
    res.status(200).send(exercise);
});

app.get('/getAllExercises', (req, res) => {
    res.json(webpal.getAllExercises());
});

app.post('/evaluateExercise', async (req, res) => {
    const attemptData = req.body;
    const feedback = await webpal.evaluateAttempt(attemptData.id, attemptData.attemptFiles, attemptData.port, attemptData.previousFeedback);
    res.json(feedback);
});

app.post('/log', (req, res) => {
    const logData = req.body;
    const userId = logData.userId;
    const logContent = logData.logContent;
  
    // Define the folder path and log file name
    const logsFolder = 'logsWebpal';
    const logFileName = `${userId}.json`;
    const logFilePath = path.join(__dirname, logsFolder, logFileName);
  
    // Check if the logs folder exists, create it if not
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }
  
    let logs = [];
    if (fs.existsSync(logFilePath)) {
      // Read the existing log file
      const logsData = fs.readFileSync(logFilePath, 'utf8');
      logs = JSON.parse(logsData);
    }
  
    // Push the new log entry to the logs array
    logs.push(logContent);
  
    // Write the updated log data to the log file
    fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write log data' });
      } else {
        res.sendStatus(200);
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});