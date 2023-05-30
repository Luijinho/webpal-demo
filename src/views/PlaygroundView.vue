<template>
  <body :class="{ 'no-exercises': exercises.length === 0 }">
    <header>
      <Sidebar @exercise-selected="updateExercise" />

      <div class="no-exercises-popup" v-show="!exercises.length">
        <p>No exercises available</p>
      </div>


      <div class="executionBtns">
        <button :disabled="!this.exercise" class="btns" @click="executeCode">Execute</button>
        <div class="divider"></div>
        <button :disabled="!this.exercise" class="btns" @click="submitCode">Submit</button>

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

    <div class="frameTitles">
      <div>Student Frame</div>
      <div>Teacher Frame</div>
    </div>
    <div class="frames">
      <iframe class="studentFrame" srcdoc="" frameborder="0"></iframe>
      <iframe class="professorFrame" :srcdoc="professorHTML" frameborder="0"></iframe>
    </div>
    

    <div class="feedback-log">
      <h3>Feedback Log:</h3>
      <button @click="clearFeedbackLog" class="clear-log-btn">Clear Log</button>
      <p class="feedback-entry" v-for="(entry, index) in feedbackLog.slice().reverse()" :key="index">
        <span class="timestamp">{{ entry.timestamp }}</span>
        <span class="message">{{ entry.feedback }}</span>
      </p>
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
    const codeHTML = ``
    const codeCSS = ``
    const codeJS = ``
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
    async updateExercise(exercise) {
      // Update the page with the new exercise data
      this.exercise = exercise
      
      await this.generateSolutionInterface();

      const logData = {
        studentID: localStorage.getItem('userId'),
        exerciseID: exercise.exerciseID,
        timestamp: new Date().toISOString(),
        with_feedback: true,
        feedback: 'Started exercise "' + exercise.assignment + '"'
      };
      this.updateLog(logData);
    },
    async evaluateExercise(id, attemptFiles, previousFeedback) {
      try {
        const response = await axios.post('http://localhost:3000/evaluateExercise', {
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
          timestamp: new Date().toISOString(),
          with_feedback: true,
          feedback: this.feedback
        };
        this.updateLog(logData);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllExercises() {
      try {
        const response = await axios.get('http://localhost:3000/getAllExercises');
        this.exercises = response.data;
        console.log(this.exercises)
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
      const logEndpoint = 'http://localhost:3000/log';

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
      console.log(localStorage.getItem('userId'))
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

.backBtn {
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

.frames {
  display: flex;
  justify-content: space-around;
}
.studentFrame {
  border: 1px;
  border-style: solid;
  border-color: black;
  background-color: white;

  width: 40vw;
  height: 50vh;
}
.professorFrame {
  border: 1px;
  border-style: solid;
  border-color: black;
  background-color: white;

  width: 40vw;
  height: 50vh;
}

.frameTitles {
  display: flex;
  justify-content: space-around;

  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal p {
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
  text-align: center;
}

.modal button {
  font-size: 16px;
  margin-top: 20px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60%;
  background-color: white;
  border-radius: 5px;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 300px;
  overflow-y: auto;
  max-height: 300px;
}

.feedback-entry {
  padding: 10px;
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

.clear-log-btn {
  background-color: #545352;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 4px;
}

</style>