<template>
    <div v-if="submitSuccess" class="submit-success">Exercise created successfully!</div>
    <div class="exercise-creator">
      <header>
        <Sidebar @exercise-details-received="handleExerciseDetailsReceived" />
        <div class="title">Backoffice - Create Exercise</div>
        <button @click="playgroundRedirect">Back to Playground</button>
      </header>
  
      <div class="form-container">
        <div class="form-group">
          <label for="assignment">Assignment Name/Description:</label>
          <input id="assignment" placeholder="Insert exercise name..." v-model="assignment" type="text" required />
        </div>
        <div class="form-group">
          <label for="description">Exercise Description:</label>
          <input id="description" placeholder="Insert exercise description..." v-model="description" type="text" required />
        </div>
  
        <div class="form-group">
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
        </div>
  
        <div class="form-group">
          <label for="js-tests">JS Mocha Tests:</label>
          <textarea id="js-tests" :placeholder="TestsPlaceholder" v-model="jsTests" required></textarea>
        </div>
  
        <button @click="submitExercise">Submit Exercise</button>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import Sidebar from '@/components/Sidebar.vue'
  import { Codemirror } from 'vue-codemirror'
  import { html } from '@codemirror/lang-html'
  import { css } from '@codemirror/lang-css'
  import { javascript } from '@codemirror/lang-javascript'

  export default {
    name: 'AdminView',
    components: {
      Sidebar,
      Codemirror
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
        assignment: "",
        description: "",
        jsTests: "",
        exercises: [],
        showSidebar: false,
        submitSuccess: false,
      };
    },
    computed: {
        TestsPlaceholder() {
            return `EXAMPLE:\nconst assert = chai.assert;\n\ndescribe('Example Test', function() {\nconst sum = document.getElementById('sum');\n\n  it('should return true', function(done) {\n    assert.equal(true, sum.innerHTML);\n    done() \n  });\n});`;
        },
    },
    methods: {
      generateJSON() {
        const files = [
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
        ];

        return JSON.stringify(files, null, 2);
      },

      async submitExercise() {
        const jsonData = this.generateJSON()
        const jsTests = this.jsTests
        const assignment = this.assignment
        const description = this.description 

        console.log(JSON.parse(jsonData))
        try {
            const response = await axios.post('https://webpalserver.fly.dev/createExercise', {
            code: jsonData,
            tests: jsTests,
            assignment: assignment,
            description: description
            });
            console.log("ID: " + response.data)
            this.exerciseID = response.data;
            this.submitSuccess = true;
            this.assignment = ``
            this.jsonData = ``
            this.jsTests = ``
            this.description = ``
        } catch (error) {
            console.error(error);
        }
      },

      handleExerciseDetailsReceived(data) {
        this.assignment = data.assignment
        data.data.data.forEach(item => {
          if(item.filename.endsWith(".html")) {
            this.htmlFile = item.filename
            this.codeHTML = item.code
          } else if(item.filename.endsWith(".css")) {
            this.cssFile = item.filename
            this.codeCSS = item.code
          } else if(item.filename.endsWith(".js")) {
            this.jsFile = item.filename
            this.codeJS = item.code
          }
        })
        this.jsTests = data.testData
      },
      playgroundRedirect() {
          this.$router.push({ name: "Playground" });
      },
    },
  };
</script>
  
<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}


.submit-success {
    background-color: #dff0d8;
    border-color: #d0e9c6;
    color: #3c763d;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
  }

.exercise-creator {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
}

textarea {
  width: 100%;
  min-height: 200px;
  resize: vertical;
}

header {
  display: flex;
  justify-content: space-around;
  margin: 20px;
  position: relative;
}

.title{
  font-size: 22px;
  font-weight: bold;
}
  </style>
  