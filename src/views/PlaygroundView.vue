<template>
  <body :class="{ 'no-exercises': exercises.length === 0 }">
    <header>
      <div class="hamburger" @click="toggleSidebar">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <div class="sidebar" v-show="showSidebar">
        <button class="close-btn" @click="toggleSidebar">Close</button>
        <button class="backoffice-btn" @click="backofficeRedirect">Backoffice</button>
        <h2>Exercises</h2>
        <ul>
          <li v-for="(exercise, index) in exercises" :key="index" @click="updateExercise(exercise)">
            {{ exercise.assignment }}
          </li>
        </ul>
      </div>

      <div class="no-exercises-popup" v-show="!exercises.length">
        <p>No exercises available</p>
      </div>


      <div class="executionBtns">
        <button class="btns" @click="executeCode">Execute</button>
        <div class="divider"></div>
        <button v-if="!exercises.length" disabled class="btns" @click="submitCode">Submit</button>
        <button v-else class="btns" @click="submitCode">Submit</button>
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
      <div>Professor Frame</div>
    </div>
    <div class="frames">
      <iframe class="studentFrame" srcdoc="" frameborder="0"></iframe>
      <iframe class="professorFrame" :srcdoc="professorHTML" frameborder="0"></iframe>
    </div>
    <div class="modal" v-show="showModal">
      <div class="modal-content">
        <div class="feedback">
          <p>{{ feedback }}</p>
        </div>
        <div class="modal-buttons">
          <button class="btns" @click="showModal = false">Close</button>
        </div>
      </div>
    </div>



  </body>
</template>
  
<script>
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import axios from 'axios';

export default {
  name: 'PlaygroundView',
  components: {
    Codemirror,
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
        exercise: '',
        exerciseID: '',
        feedback: '',
        showModal: false,
        exercises: [],
        showSidebar: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
      document.querySelector(".sidebar").classList.toggle("open");
    },

    async updateExercise(exercise) {
      // Update the page with the new exercise data
      this.exercise = exercise
      
      await this.generateSolutionInterface();
      this.toggleSidebar();
    },

    async evaluateExercise(id, attemptFiles, port, previousFeedback) {
      try {
        const response = await axios.post('http://localhost:8085/evaluateExercise', {
          id,
          attemptFiles,
          port,
          previousFeedback
        });
        this.feedback = response.data;
        this.showModal = true;
      } catch (error) {
        console.error(error);
      }
    },
    async getAllExercises() {
      try {
        const response = await axios.get('http://localhost:8085/getAllExercises');
        this.exercises = response.data;
        console.log(this.exercises)
      } catch (error) {
        console.error(error);
      }
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
    async submitCode(){
      const studentAttempt = [
        {
          filename: this.htmlFile,
          code: this.codeHTML
        },
        {
          filename: this.cssFile,
          code: this.codeCSS
        },
        {
          filename: this.jsFile,
          code: this.codeJS
        }
      ]

      await this.evaluateExercise(this.exercise.exerciseID, JSON.stringify(studentAttempt), 8090, [])
    }
  },
  mounted(){
    this.getAllExercises()
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

.hamburger {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.sidebar.open {
  left: 0;
}

.close-btn {
  position: absolute;
  right: 10px;
  font-size: 16px;
  background-color: transparent;
  text-decoration: underline;
  border: none;
  cursor: pointer;
}
.backoffice-btn {
  top: 10px;
  right: 10px;
  font-size: 16px;
  background-color: transparent;
  text-decoration: underline;
  border: none;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #5a5858;
  margin: 3px 0;
  transition: 0.4s;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  padding: 15px;
  z-index: 1000;
  transition: left 0.3s ease;
}

.sidebar h2 {
  padding-left: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 8px 16px;
  text-decoration: none;
  font-size: 18px;
  color: black;
  display: block;
  transition: 0.3s;
  cursor: pointer;
}

.sidebar li:hover {
  color: white;
  background-color: #555;
}


.title{
  font-size: 22px;
  font-weight: bold;
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

.feedback {
  margin: 20px;
  text-align: center;
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
</style>