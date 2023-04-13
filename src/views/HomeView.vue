<template>
    <div class="home"></div>
      <div class="login">
        <div class="title">Code Playground</div>
        <div class="inputs">
          <input class="userInput" disabled v-model="username" placeholder="Username" />
          <button class="enterBtn"  @click="goToExercises">Enter</button><br>
        </div>
      </div>
  </template>
  
  <script>
  
  export default {
    name: 'HomeView',
    components: {
    },
    data() {
      return {
        username: ""
      }
    },
    methods: {
      login() {
        if(this.username == "")
          alert("Enter an username!")
      },
      goToExercises(){
        this.$router.push({name: 'Exercises'}) 
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    background: url("../assets/backgroundLogin.jpg") no-repeat center center
      fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    filter: blur(5px);
    -webkit-filter: blur(5px);
  
    height: 100vh;
  }
  
  .login{
    border: 4px;
    border-radius: 10px;
    border-style: solid;
    border-color: grey;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4);
  
    width: 800px;
    height: 500px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    
    margin: auto;
  }
  
  .title{
    font-size: 40px;
    margin-top: 16px;
    color: white;
    text-align: center;
  }
  
  .inputs {
    text-align: center;
  }
  
  .userInput{
    margin-top: 30px;
    font-size: 26px;
  }
  
  .enterBtn{
    font-size: 26px;
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>