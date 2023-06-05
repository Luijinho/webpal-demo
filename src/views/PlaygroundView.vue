<template>
  <body :class="{ 'no-exercises': exercises.length === 0 }">
    <header>
      <Sidebar @exercise-selected="updateExercise" />

      <div class="no-exercises-popup" v-show="!exercises.length">
        <p>No exercises available</p>
      </div>


      <div class="executionBtns">
        <button :disabled="!this.exercise" class="btns" @click="executeAndSubmit">Execute</button>
        <div class="divider"></div>
        <button :disabled="!feedbackLog.length" @click="clearFeedbackLog" class="btns">Clear Log</button>
      </div>

      <div class="title">Webpal Playground</div>
    </header>
    <div class="codeEditors">
    <div class="codeHTML">
      <div class="codeEditorWrapper">
        <label for="htmlFile">HTML Filename:</label>
        <input id="htmlFile" v-model="htmlFile" type="text">
        <codemirror
          v-model="codeHTML"
          placeholder="HTML goes here..."
          :style="{ height: '200px', width: '100%', textAlign: 'left', backgroundColor: 'white' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensionsHTML"
        />
      </div>
    </div>
    <div class="divider"></div>
    <div class="codeCSS">
      <div class="codeEditorWrapper">
        <label for="cssFile">CSS Filename:</label>
        <input id="cssFile" v-model="cssFile" type="text">
        <codemirror
          v-model="codeCSS"
          placeholder="CSS goes here..."
          :style="{ height: '200px', width: '100%', textAlign: 'left', backgroundColor: 'white' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensionsCSS"
        />
      </div>
    </div>
    <div class="divider"></div>
    <div class="codeJS">
      <div class="codeEditorWrapper">
        <label for="jsFile">Javascript Filename:</label>
        <input id="jsFile" v-model="jsFile" type="text">
        <codemirror
          v-model="codeJS"
          placeholder="Javascript goes here..."
          :style="{ height: '200px', width: '100%', textAlign: 'left', backgroundColor: 'white' }"
          :options="{
            mode: 'javascript',
            extraKeys: {'Ctrl-Space': 'autocomplete'}
          }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensionsJS"
        />
      </div>
    </div>
  </div>
    <div class="frames-and-feedback">
      <div class="frame-container">
        <div class="frame-wrapper">
          <div class="frame-title">Attempt</div>
          <iframe class="studentFrame" srcdoc="" frameborder="0"></iframe>
        </div>
        <div class="frame-wrapper">
          <div class="frame-title">Reference</div>
          <iframe class="professorFrame" :srcdoc="professorHTML" frameborder="0"></iframe>
        </div>
      </div>
      <div class="feedback-log">
        <h3 class="feedback-title">Feedback Log:</h3>
        <p class="feedback-entry" v-for="(entry, index) in feedbackLog.slice().reverse()" :key="index">
          <span class="timestamp">{{ entry.timestamp }}</span>
          <span class="message">{{ entry.feedback }}</span>
        </p>
      </div>
    </div>
  </body>
</template>
  
<script>
import Sidebar from '@/components/Sidebar.vue'
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'PlaygroundView',
  components: {
    Codemirror,
    Sidebar
  },

  setup() {
    const extensionsHTML = [html()]
    const extensionsCSS = [css()]
    const extensionsJS = [javascript()]
    const codeHTML = `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
    <script type='text/javascript' src='main.js'><` + `/script>
    <title>Assignment</title>
  </head>
  <body>
    <!-- Your code goes here -->
  </body>
</html>`
    const codeCSS = ``
    const codeJS = `window.onload = function(){
  // Your code goes here
}`
    const htmlFile = `index.html`
    const cssFile = `style.css`
    const jsFile = `main.js`

    return {
        extensionsHTML,
        extensionsCSS,
        extensionsJS,
        codeHTML,
        codeCSS,
        codeJS,
        htmlFile,
        cssFile,
        jsFile
    }
  },
  data() {
    return {
        professorHTML: '',
        exercise: null,
        exerciseID: '',
        feedback: '',
        showModal: false,
        exercises: [],
        showSidebar: false,
        feedbackLog: []
    }
  },
  methods: {
    executeAndSubmit() {
      this.executeCode();
      this.submitCode();  
    },
    async updateExercise(exercise) {
      this.exercise = exercise
      
      await this.generateSolutionInterface();
      const startedExercises = JSON.parse(localStorage.getItem('startedExercises') || '{}');
      let logMessage = '';

      if (startedExercises[exercise.exerciseID]) {
        logMessage = 'Continue exercise "' + exercise.assignment + '"';
      } else {
        startedExercises[exercise.exerciseID] = true;
        localStorage.setItem('startedExercises', JSON.stringify(startedExercises));
        logMessage = 'Started exercise "' + exercise.assignment + '"';
      }

      const logData = {
        studentID: localStorage.getItem('userId'),
        exerciseID: exercise.exerciseID,
        exerciseName: exercise.assignment,
        timestamp: new Date().toISOString(),
        with_feedback: true,
        type: 'action',
        feedback: logMessage
      };
      this.updateLog(logData);
    },
    async evaluateExercise(id, attemptFiles, previousFeedback) {
      try {
        const response = await axios.post('http://13.49.130.58:3000/evaluateExercise', {
          id,
          attemptFiles,
          previousFeedback
        });
        this.feedback = response.data;
        const timestamp = new Date().toLocaleString();
        this.feedbackLog.push({ timestamp, feedback: this.feedback });
        const logData = {
          studentID: localStorage.getItem('userId'),
          exerciseID: this.exercise.exerciseID,
          exerciseName: this.exercise.assignment,
          timestamp: new Date().toISOString(),
          with_feedback: true,
          type: 'feedback',
          feedback: this.feedback
        };
        this.updateLog(logData);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllExercises() {
      try {
        const response = await axios.get('http://13.49.130.58:3000/getAllExercises');
        this.exercises = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    clearFeedbackLog() {
      this.feedbackLog = [];
    },
    generateSolutionInterface() {
      let htmlCode = '';
      let cssCode = '';
      let jsCode = '';

      for (let i = 0; i < this.exercise.data.data.length; i++) {
        const file = this.exercise.data.data[i];
        const fileExtension = file.filename.split('.').pop();

        if (fileExtension === 'html') {
          const matches = file.code.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          htmlCode = matches ? matches[1] : '';
        } else if (fileExtension === 'css') {
          cssCode += `<style>${file.code}</style>`;
        } else if (fileExtension === 'js') {
          jsCode += `<script>${file.code}<` + `/script>`;
        }
      }

      const html = `<html><head>${cssCode}</head><body>${htmlCode}${jsCode}<`+`/body><`+`/html>`;
      this.professorHTML = html;
    },

    updateLog(logData) {
      const userId = localStorage.getItem('userId');
      const logEndpoint = 'http://13.49.130.58:3000/log';

      const payload = {
        userId: userId,
        logContent: logData
      };

      axios
        .post(logEndpoint, payload)
        .then(() => {
          console.log('Log data sent successfully');
        })
        .catch((error) => {
          console.error('Failed to send log data:', error);
        });
    },

    executeCode() {
        var studentHTML = this.codeHTML;

        const jsFileName = this.jsFile.split('.')[0];
        const cssFileName = this.cssFile.split('.')[0];

        const scriptRegex = new RegExp(`<script[^>]*src=['"]${jsFileName}\\.js['"][^>]*><\\/script>`, 'i');
        const scriptMatch = studentHTML.match(scriptRegex);

        const styleRegex = new RegExp(`<link[^>]*href=['"]${cssFileName}\\.css['"][^>]*>`, 'i');
        const cssMatch = studentHTML.match(styleRegex);

        if (scriptMatch) {
            if (this.codeJS) {
                const scriptTag = `<script>${this.codeJS}<`+`/script>`;
                studentHTML = studentHTML.replace(/<\/body>\s*<\/html>/i, `${scriptTag}</body></html>`);
            }
        }

        if (cssMatch) {
          if (this.codeCSS) {
              const styleTag = `<style>${this.codeCSS}<`+`/style>`;
              studentHTML = studentHTML.replace(/<\/head>/i, `${styleTag}</head>`);
          }
        }

        document.querySelector('.studentFrame').setAttribute('srcdoc', studentHTML);
    },
    backofficeRedirect() {
      this.$router.push({ name: "Admin" });
    },
    createUserId() {
      if (!localStorage.getItem('userId')) {
        const userId = uuidv4();
        localStorage.setItem('userId', userId);
      }
    },
    async submitCode(){

      if (this.codeHTML.trim() === '') {
        alert('Please enter HTML code before submitting.');
        return;
      }

      const studentAttempt = []

      if (this.codeHTML.trim() !== '') {
        studentAttempt.push({
          filename: this.htmlFile,
          code: this.codeHTML
        });
      }

      if (this.codeCSS.trim() !== '') {
        studentAttempt.push({
          filename: this.cssFile,
          code: this.codeCSS
        });
      }

      if (this.codeJS.trim() !== '') {
        studentAttempt.push({
          filename: this.jsFile,
          code: this.codeJS
        });
      }

      await this.evaluateExercise(this.exercise.exerciseID, JSON.stringify(studentAttempt), [])
    }

  },
  mounted(){
    this.getAllExercises()
    this.createUserId()
  }
}

</script>

<style scoped>
.frame-container {
  display: flex;
  justify-content: space-around;
}

.frame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.frame-title {
  font-size: 18px;
  margin-bottom: 6px;
}

.frames-and-feedback {
  display: flex;
  justify-content: space-between;
}

header {
  display: flex;
  justify-content: space-around;
  margin: 20px;
  position: relative;
}

.title {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.executionBtns{
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.divider{
  width:5px;
  height:auto;
  display:inline-block;
}

.btns {
  min-width: 80px;
  max-height: 30px;
  font-size: 14px;
}

.codeEditors {
  display: flex;
  justify-content: space-around;
  margin-left: 1%;
  margin-right: 1%;
}

.codeEditorWrapper {
  width: 500px;
  overflow-x: auto;
}

.codeHTML {
  display: flex;
  float: left;
  max-width: 33%;
}

.codeCSS {
  display: flex;
  max-width: 33%;
}

.codeJS {
  display: flex;
  float: right;
  max-width: 33%;
}
.studentFrame,
.professorFrame {
  border: 1px;
  border-style: solid;
  border-color: black;
  background-color: white;
  margin-right: 20px;
  width: 35vw;
  height: 50vh;
  margin-bottom: 20px;
}

.studentFrame {
  margin-left: 10px;
}

.no-exercises-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.no-exercises-popup p {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.feedback-log {
  width: 26%;
  margin: auto;
  margin-right: 10px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-y: auto;
  height: 44vh;
}

.feedback-title{
  margin-top: 0px;
}

.feedback-entry {
  padding: 0px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.feedback-entry:last-child {
  border-bottom: none;
}

.feedback-entry .timestamp {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
  display: block;
}

.feedback-entry .message {
  font-size: 14px;
  color: #333;
}

</style>