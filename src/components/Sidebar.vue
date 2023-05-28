<template>
    <div>
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
              <div class="button-container">
                <button @click.stop="editExercise(exercise.exerciseID)">
                  <i class="">Edit</i>
                </button>
                <button @click.stop="deleteExercise(exercise.exerciseID)">
                  <i class="">Del</i>
                </button>
                <button @click.stop="showExerciseDescription(exercise.description)"> <!-- new button -->
                  <i class="">Info</i>
                </button>
              </div>
          </li>

          <div v-show="showDescription" @click="showDescription = false" class="modal-overlay">
            <div class="modal-content" @click.stop>
              <p>{{ currentDescription }}</p>
            </div>
          </div>

        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SidebarComponent",
    data() {
      return {
        showSidebar: false,
        exercises: [],
        showDescription: false,
        currentDescription: '',
      };
    },
    methods: {
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
        document.querySelector(".sidebar").classList.toggle("open");
      },
      async updateExercise(exercise) {
        console.log(exercise)
        this.$emit("exercise-selected", exercise);
        this.toggleSidebar();
      },
      backofficeRedirect() {
        this.$router.push({ name: "Admin" });
      },
      async getAllExercises() {
        try {
          const response = await axios.get("https://webpalserver.fly.dev/getAllExercises");
          console.log(response.data)
          this.exercises = response.data.map(exercise => ({
            ...exercise,
            description: exercise.description
          }));
        } catch (error) {
          console.error(error);
        }
      },

      showExerciseDescription(description) {
        this.currentDescription = description;
        this.showDescription = true;
      },
      async deleteExercise(id) {
        try {
          const confirmed = confirm("Are you sure you want to delete this exercise?");
          if (!confirmed) {
            return;
          }
          await axios.post("https://webpalserver.fly.dev/deleteExercise", {
            id: id
          });
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      },
      editExercise(id) {
        // check if already on backoffice page
        if (this.$route.name !== 'Admin') {
          // navigate to backoffice page with exercise ID as query parameter
          this.$router.push({ name: "Admin", query: { id: id} });
        } else {
          // if already on backoffice page, fetch exercise details and populate text areas
          this.fetchExerciseDetails(id);
        }
      },
      async fetchExerciseDetails(id) {
        try {
          const response = await axios.post("https://webpalserver.fly.dev/getFullExercise", {
            id: id
          });
          this.$emit('exercise-details-received', response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.getAllExercises();
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

</style>
  