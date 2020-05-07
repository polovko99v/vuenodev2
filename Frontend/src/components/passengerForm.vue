<template>
    <form v-if="visible" @submit.prevent>
        <label> ПІБ <input type="text" v-model="passenger.name" required> </label> <br>
        <label> Місце призначення <input type="text" v-model="passenger.destination"> </label> <br>
        <label> Кількість багажу <input type="number" v-model="passenger.luggageCount" min="0"> </label> <br>
        <label> Вага багажу <input type="number" v-model.number="passenger.luggageWeight" min="0"> </label> <br>         
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
export default {
    name:"passengerForm",
    props:{
        value:Object,
        visible:Boolean
    },
    data(){
        return{
            passenger:this.value,
        }
    },
    components:{
    },
    methods:{
        save(){
            console.log(this.passenger)
            this.$emit('input', this.passenger);
        }
    }
}
</script>

<style scoped>
 form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>
