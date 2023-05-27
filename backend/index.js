const webpal = require('webpal')
const express = require('express')
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const port = 8085;

app.use(express.json());
app.use(cors());

const exercisesFilePath = path.join(__dirname, 'exercises.json');

async function loadExercisesFromFile() {
  if (fs.existsSync(exercisesFilePath)) {
    const exercisesData = JSON.parse(fs.readFileSync(exercisesFilePath, 'utf8'));
    const exerciseIDsFromFile = exercisesData.map(exercise => exercise.exerciseID);
    const allExercises = await webpal.getAllExercises();
    for (const exercise of exercisesData) {
      const matchingExercise = allExercises.find(ex => ex.exerciseID === exercise.exerciseID);
      if (!matchingExercise) {        
        const newExerciseID = await webpal.createExercise(exercise.code, exercise.tests, exercise.assignment);
        exercise.exerciseID = newExerciseID;
        fs.writeFileSync(exercisesFilePath, JSON.stringify(exercisesData, null, 2), 'utf8');
      }
    }
  }
}

loadExercisesFromFile();

app.post('/createExercise', async (req, res) => {
  const solutionData = req.body;
  const exerciseID = await webpal.createExercise(solutionData.code, solutionData.tests, solutionData.assignment);
  
  // Also write the exercise data to the file
  const exercisesData = fs.existsSync(exercisesFilePath) ? JSON.parse(fs.readFileSync(exercisesFilePath, 'utf8')) : [];
  exercisesData.push({exerciseID, ...solutionData});
  fs.writeFileSync(exercisesFilePath, JSON.stringify(exercisesData, null, 2), 'utf8');

  res.send(exerciseID);
});

app.post('/deleteExercise', async (req, res) => {
  const id = req.body.id;
  await webpal.deleteExercise(id);
  
  // Also delete the exercise data from the file
  if (fs.existsSync(exercisesFilePath)) {
    let exercisesData = JSON.parse(fs.readFileSync(exercisesFilePath, 'utf8'));
    exercisesData = exercisesData.filter(exercise => exercise.exerciseID !== id);
    fs.writeFileSync(exercisesFilePath, JSON.stringify(exercisesData, null, 2), 'utf8');
  }

  res.status(200).send("Deleted");
});

app.post('/getFullExercise', async (req, res) => {
  const id = req.body.id;
  const exercise = await webpal.getFullExercise(id);
  
  const matchingExercise = global.exercisesData.find(ex => ex.exerciseID === id);

  console.log(matchingExercise)
  
  res.status(200).send({ ...exercise, description: matchingExercise.description });
});


app.get('/getAllExercises', async (req, res) => {
  const exercises = await webpal.getAllExercises();
  
  const exercisesData = JSON.parse(fs.readFileSync(exercisesFilePath, 'utf8'));
  const descriptions = exercisesData.reduce((acc, exercise) => {
    acc[exercise.exerciseID] = exercise.description;
    return acc;
  }, {});

  const exercisesWithDescriptions = exercises.map(exercise => ({
    ...exercise,
    description: descriptions[exercise.exerciseID] || ''
  }));

  res.json(exercisesWithDescriptions);
});

app.post('/evaluateExercise', async (req, res) => {
    const attemptData = req.body;
    const feedback = await webpal.evaluateAttempt(attemptData.id, attemptData.attemptFiles, attemptData.port, attemptData.previousFeedback);
    res.json(feedback);
});

app.post('/evaluateExerciseWithoutStatic', async (req, res) => {
    const attemptData = req.body;
    const feedback = await webpal.evaluateAttemptWithoutStatic(attemptData.id, attemptData.attemptFiles, attemptData.port, attemptData.previousFeedback);
    res.json(feedback);
});

app.get('/downloadLogs', function(req, res) {
    // create a file to stream archive data to.
    let output = fs.createWriteStream('logsWebpal.zip');
    let archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append files from a directory
    archive.directory('logsWebpal/', false);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');

        //send the .zip
        res.download(__dirname + '/logsWebpal.zip');
    });

    archive.on('error', function(err){
        throw err;
    });
});

app.post('/log', (req, res) => {
  const logData = req.body;
  const userId = logData.userId;
  const logContent = logData.logContent;

  // Define the folder path and log file name
  const logsFolder = 'logsWebpal';
  const logFileName = `${userId}.tsv`;
  const logFilePath = path.join(__dirname, logsFolder, logFileName);

  // Check if the logs folder exists, create it if not
  if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
  }

  // Convert logContent to TSV format
  const logEntry = Object.values(logContent).join('\t');

  // Create the header
  const header = 'studentID\texerciseID\ttimestamp\twithFeedback\tfeedback';

  // Check if the log file already exists
  if (fs.existsSync(logFilePath)) {
    // Append the log entry to the existing log file
    fs.appendFile(logFilePath, logEntry + '\n', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to append log data' });
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    // Create a new file with the header and log entry
    fs.writeFile(logFilePath, header + '\n' + logEntry + '\n', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write log data' });
      } else {
        res.sendStatus(200);
      }
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});