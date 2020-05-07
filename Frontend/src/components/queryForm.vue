<template>
    <form @submit.prevent>
         Вага вантажу від <input type="number" v-model.number="query.minWeight"> до <input type="number" v-model.number="query.maxWeight">        
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            query: {
                minWeight:null,
                maxWeight:null
            }
        }
    },
    methods:{
       ...mapActions(["getPassengersByQuery"]),
        reset(){
            this.query.minWeight=this.query.maxWeight=null;
            this.getPassengersByQuery(this.query);
        },
        search(){            
            this.getPassengersByQuery(this.query);
        }
    }
}
</script>