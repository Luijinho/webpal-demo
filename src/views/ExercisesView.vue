<template>
    <div class="exercises">
        <div class="titleExercises"><b>Select an exercise:</b></div><br>
        <div 
            v-for="(item, index) in dataAsArray"
            :key="index"
            @click="goToPlayground(item[1])"
        >
            {{ item[0] }}
        </div>
        <!-- <div v-for="item in $options.exercises" :key="item.id" class="btnGroup">
            <p @click="goToPlayground(item.id)">{{item.name}}</p><br>
        </div> -->
    </div>
</template>

<script>
import exercisesJSON from '../exercises.json'

export default {
    name: 'ExercisesView',
    components: {
    },
    computed: {
        dataAsArray() {
        return Object.entries(exercisesJSON);
        },
    },
    data() {
        return {
        }
    },
    methods: {
        goToPlayground(jsonContent) {
            this.$router.push({
                name: 'Playground',
                params: { exerciseData: JSON.stringify(jsonContent) },
            });
        },
    },
}
</script>

<style scoped>
.exercises {
    margin: 50px
}

p {
    cursor: pointer;
    display: inline;
}

p:hover {
    text-decoration: underline;
}

</style>