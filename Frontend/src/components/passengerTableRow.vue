<template>
    <tr>        
        <td> {{index+1}} </td>
        <td> {{passenger.name}} </td>
        <td> {{passenger.destination}} </td>
        <td> {{passenger.luggageCount}} </td>
        <td> {{passenger.luggageWeight}} </td>
        <td>
            <input type="button" value="Вилучити" @click="deletePassenger(passenger)">
            <input type="button" value="Редагувати" @click="showUpdateForm(passenger)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"passengerTableRow",
    props:{
        index:Number,
        passenger:Object        
    },
    data(){   
        return{

        }
    },
    methods:{        
       ...mapActions(["deletePassenger", "showUpdateForm"]),
        updated(){
        console.log(this.passenger);
        }    
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>