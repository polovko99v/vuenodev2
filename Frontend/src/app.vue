<template>
    <div id="app">
        <messageSystem></messageSystem>
        <searchString></searchString>
        <hr>
        <queryForm></queryForm>
        <hr>
        <input type="button" @click="showAddForm" value=" Додати пасажира" />
        <passengerTable></passengerTable>
        <passengerForm></passengerForm>
    </div>
</template>

    <script>
    import Vue from "vue";
    import passengerTable from "./components/passengerTable";
    import passengerForm from "./components/passengerForm";
    import searchString from "./components/searchString";
    import queryForm from "./components/queryForm";
    import axios from 'axios';
    import messageSystem from './components/messageSystem'
    import { mapActions } from 'vuex';

        export default {
        name:"app",
        data() {
        return{
        };
      },
    components: {
    passengerTable,
    passengerForm,
    searchString,
    queryForm,
    messageSystem
  },
  created(){
    this.getPassengers();
    
  },
  methods: {
    ...mapActions(["showMessageForTime", "getPassengers", "showAddForm"]),
},
        };
</script>


<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>
