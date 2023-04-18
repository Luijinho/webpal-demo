const webpal = require('webpal')
const express = require('express')
const cors = require('cors');

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});