<template>
    <form @submit.prevent>
        Місце призначення  <input type="text" v-model="query.destination"> 
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
export default {
    props:{
        value:Object
    },
    data(){
        return{
            query:this.value
        }
    },
    methods:{
        reset(){
            this.query.destination = "";
            this.$emit("input",this.query);
            console.log(this.query)
        },
        search(){
            
            this.$emit("input",this.query);
            console.log(this.query)
        }
    }
}
</script>