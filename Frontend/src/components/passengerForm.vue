<template>
    <form v-if="visible" @submit.prevent>
        <label> ПІБ <input type="text" v-model="passenger.name" required> </label> <br>
        <label> Місце призначення <input type="text" v-model="passenger.destination"> </label> <br>
        <label> Кількість багажу <input type="number" v-model="passenger.luggageCount" min="0"> </label> <br>
        <label> Вага багажу <input type="number" v-model.number="passenger.luggageWeight" min="0"> </label> <br>         
        <input type="button" @click="save" value="Зберегти">   
        <input type="button" @click="hideForm" value="Відміна">   
    </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"passengerForm",
    data(){
        return{
           
        }
    },
    components:{
    },
    computed:{
        ...mapState({
            passenger:"formPassenger",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
     methods:{
        ...mapActions(["patchPassenger","postPassenger"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postPassenger(this.passenger);
            else
                await this.patchPassenger(this.passenger);    
            this.hideForm();         
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
