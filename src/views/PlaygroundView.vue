<template>
  <body>
    <header>
      <div class="executionBtns">
        <button class="btns" @click="executeCode">Execute</button>
        <div class="divider"></div>
        <button class="btns" @click="submitCode">Submit</button>
      </div>
      <div class="title">Code Playground</div>
      <div class="backBtn">
        <button class="btns" @click="goToExercises">Back</button>
      </div>
    </header>
    <div class="codeEditors">
  <div class="codeHTML">
    <div class="codeEditorWrapper">
      <label for="htmlFile">HTML Filename:</label>
      <input id="htmlFile" v-model="htmlFile" type="text">
      <codemirror
        v-model="codeHTML"
        placeholder="HTML goes here..."
        :style="{ height: '200px', width: '100%', textAlign: 'left' }"
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
        :style="{ height: '200px', width: '100%', textAlign: 'left' }"
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
        :style="{ height: '200px', width: '100%', textAlign: 'left' }"
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
    const htmlFile = ``
    const cssFile = ``
    const jsFile = ``

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
        solutionFiles: JSON.parse(this.$route.params.exerciseData),
        professorHTML: '',
        exercise: '',
        exerciseID: '',
        feedback: '',
        showModal: false
    }
  },
  methods: {
    async createExerciseWebpal(code, tests, assignment) {
      try {
        const response = await axios.post('http://localhost:8085/createExercise', {
          code,
          tests,
          assignment
        });
        console.log("ID: " + response.data)
        this.exerciseID = response.data;
      } catch (error) {
        console.error(error);
      }
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
        console.log(this.feedback)
        this.showModal = true;
      } catch (error) {
        console.error(error);
      }
    },
    generateSolutionInterface() {
        let htmlCode = '';
        let cssCode = '';
        let jsCode = '';

        for (let i = 0; i < this.solutionFiles.length; i++) {
            const file = this.solutionFiles[i];
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
    goToExercises(){
      this.$router.push({name: 'Exercises'}) 
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

      await this.evaluateExercise(this.exerciseID, JSON.stringify(studentAttempt), 8090, [])
    }
  },
  mounted(){
    this.generateSolutionInterface()
    this.createExerciseWebpal(JSON.stringify(this.solutionFiles), null, "test")
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

.title{
  font-size: 40px;
}

.executionBtns{
  display: flex;
  position: absolute;
  left: 0;
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
  min-height: 40px;
  font-size: 16px;
}

/* .codeEditors {
  display: flex;
  justify-content: space-around;
  margin-left: 1%;
  margin-right: 1%;
} */

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

</style>