<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{passenger.name}} </td>
        <td> {{passenger.destination}} </td>
        <td> {{passenger.luggageCount}} </td>
        <td> {{passenger.luggageWeight}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
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
        remove(index){
            this.$emit("remove", index);
        },
  
        update(index){
            this.$emit("update",index);
        }
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>