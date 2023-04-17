<template>
    <div class="exercise-creator">
      <header>
        <div class="title">Backoffice - Create Exercise</div>
        <button @click="playgroundRedirect">Back to Playground</button>
      </header>
  
      <div class="form-container">
        <div class="form-group">
          <label for="assignment">Assignment Name/Description:</label>
          <input id="assignment" placeholder="Insert exercise name..." v-model="assignment" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="json-data">JSON Data:</label>
          <textarea id="json-data" :placeholder="JSONDataPlaceholder" v-model="jsonData" required></textarea>
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

  export default {
    data() {
      return {
        assignment: "",
        jsonData: "",
        jsTests: "",
        exercises: [],
        showSidebar: false,
      };
    },
    computed: {
        JSONDataPlaceholder() {
            return `EXAMPLE:\n[\n  {\n    "filename": "example.html",\n     "data": "<html>...</html>"\n  },\n  {\n    "filename": "style.css",\n     "data": "div {...}"\n  },\n  {\n    "filename": "script.js",\n     "data": "console.log('Hello World!');"\n  }\n]`;
        },
        TestsPlaceholder() {
            return `EXAMPLE:\nconst assert = chai.assert;\n\ndescribe('Example Test', function() {\nconst sum = document.getElementById('sum');\n\n  it('should return true', function(done) {\n    assert.equal(true, sum.innerHTML);\n    done() \n  });\n});`;
        },
    },
    methods: {
        async submitExercise() {
            const jsonData = this.jsonData
            const jsTests = this.jsTests
            const assignment = this.assignment

            console.log(JSON.parse(jsonData))
            try {
                const response = await axios.post('http://localhost:8085/createExercise', {
                code: jsonData,
                tests: jsTests,
                assignment: assignment
                });
                console.log("ID: " + response.data)
                this.exerciseID = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        playgroundRedirect() {
            this.$router.push({ name: "Playground" });
        },
    },
  };
</script>
  
<style scoped>
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
  