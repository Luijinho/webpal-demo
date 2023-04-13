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
            <label for="htmlFile">HTML Filename:</label>
            <input id="htmlFile" v-model="htmlFile" type="text">
        </div>
        <div class="codeCSS">
            <label for="cssFile">CSS Filename:</label>
            <input id="cssFile" v-model="cssFile" type="text">
        </div>
        <div class="codeJS">
            <label for="jsFile">Javascript Filename:</label>
            <input id="jsFile" v-model="jsFile" type="text">
        </div>
    </div>
    <div class="codeEditors">
      <div class="codeHTML col">       
        <codemirror
          v-model="codeHTML"
          placeholder="HTML goes here..."
          :style="{ height: '200px', width: '500px', textAlign: 'left' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensionsHTML"
        />
      </div>
      <div class="divider"></div>
      <div class="codeCSS col">
        
        <codemirror
          v-model="codeCSS"
          placeholder="CSS goes here..."
          :style="{ height: '200px', width: '500px', textAlign: 'left' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="4"
          :extensions="extensionsCSS"
        />
      </div>
      <div class="divider"></div>
      <div class="codeJS col">
        <codemirror
          v-model="codeJS"
          placeholder="Javascript goes here..."
          :style="{ height: '200px', width: '500px', textAlign: 'left' }"
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
    <div class="frameTitles">
      <div>Student Frame</div>
      <div>Professor Frame</div>
    </div>
    <div class="frames">
      <iframe class="studentFrame" srcdoc="" frameborder="0"></iframe>
      <iframe class="professorFrame" :srcdoc="professorHTML" frameborder="0"></iframe>
    </div>
  </body>
</template>
  
<script>
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'

export default {
  name: 'PlaygroundView',
  components: {
    Codemirror,
  },

  setup() {
    const extensionsHTML = [html()]
    const extensionsCSS = [css()]
    const extensionsJS = [javascript()]
    const codeHTML = ''
    const codeCSS = ''
    const codeJS = ''
    const htmlFile = ''
    const cssFile = ''
    const jsFile = ''

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
        exercise: ''
    }
  },
  methods: {
    getExercise(){
    },
    generateHTMLCode() {
        let htmlCode = '';
        let cssCode = '';
        let jsCode = '';

        // Loop through the solutionFiles array and get the code for each file.
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

        // Combine the code into an HTML document.
        const html = `<html><head>${cssCode}</head><body>${htmlCode}${jsCode}<`+`/body><`+`/html>`;

        // Update the professorHTML variable with the generated HTML code.
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
    submitCode(){
    }
  },
  mounted(){
    this.generateHTMLCode()
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

.codeEditors {
  display: flex;
  justify-content: space-around;
  margin-left: 1%;
  margin-right: 1%;
}

.codeHTML {
  display: flex;
  justify-content: center;
  float: left;
  max-width: 33%;
}

.codeCSS {
  display: flex;
  justify-content: center;
  max-width: 33%;
}

.codeJS {
  display: flex;
  justify-content: center;
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
</style>