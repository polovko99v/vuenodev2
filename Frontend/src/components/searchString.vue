<template>
    <form @submit.prevent>
        ПІБ <input type="text" v-model="searchString">
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити пошук" @click="clear()">
    </form>
</template>
<script>
export default {
    props:{
        value:String,
    },
    data(){
        return{
           searchString:this.value     
        }
    },
    methods:{
        search(){            
            this.$emit("input", this.searchString);
        },
        clear(){
            this.searchString ="";
            this.$emit("input", this.searchString);
        }
    }
}
</script>
<style scoped>

</style>