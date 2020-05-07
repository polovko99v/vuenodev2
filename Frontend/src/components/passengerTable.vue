<template>
    <div>
        <p v-if="passengers.length==0" class="alert">
            Пасажири відсутні
        </p>
        
        <table v-if="passengers.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('name')">  ПІБ </th>
                <th v-on:click="sort('destination')">  Місце прибуття </th>
                <th v-on:click="sort('luggageCount')"> Кількість багажу </th>
                <th v-on:click="sort('luggageWeight')"> Вага багажу </th>
                <th></th>
            </tr>
            <passengerTableRow v-for="(passenger, index) in passengers" 
                v-bind:key="passenger._id" 
                v-bind="{passenger, index}" 
            >             
            </passengerTableRow>
        </table>
    </div> 
</template>

<script>
import passengerTableRow from "./passengerTableRow";
import { mapGetters, mapMutations} from 'vuex';

export default {
    name:"passengerTable",
    data(){
        return{
           
        }
    },
    components:{
        passengerTableRow
    },
    computed:{
            ...mapGetters({
           passengers:"filtredPassengers"
       }) 
    },
    methods:{
        ...mapMutations({
            sort:"sortPassengers"
        })
    }
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>