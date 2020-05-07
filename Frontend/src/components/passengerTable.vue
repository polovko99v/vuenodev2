<template>
    <div>
        <p v-if="passengerList.length==0" class="alert">
            Пасажири відсутні
        </p>
        
        <table v-if="passengerList.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('name')">  ПІБ </th>
                <th v-on:click="sort('destination')">  Місце прибуття </th>
                <th v-on:click="sort('luggageCount')"> Кількість багажу </th>
                <th v-on:click="sort('luggageWeight')"> Вага багажу </th>
                <th></th>
            </tr>
            <passengerTableRow v-for="(passenger,index) in passengerList" 
                v-bind:key="passenger._id" 
                v-bind="{passenger,index}"
                @remove="remove"
                @update="update" 
            >             
            </passengerTableRow>
        </table>
    </div> 
</template>

<script>
import passengerTableRow from "./passengerTableRow";

export default {
    name:"passengerTable",
    props:{
        passengerList:Array,
    },
    data(){
        return{
           passengers: this.passengerList
        }
    },
    components:{
        passengerTableRow
    },
    methods:{
        sort(field){
           this.passengerList.sort((b1,b2)=> b1[field]>=b2[field]?1:-1);
        },
        sortAuthor(){
            this.passengerList.sort((b1,b2)=>b1.name.join(",")>=b2.name.join(",")?1:-1);
        }, 
        remove(index){
            this.$emit("remove",index);
        },  
        update(index){
            this.$emit("update",index);
        }
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
    }
</style>