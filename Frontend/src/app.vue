<template>
    <div id="app">
        <searchString v-model="searchText"></searchString>
        <queryForm v-model="queryObject"></queryForm>
        <input type="button" @click="showNewPassengerForm()" value=" Додати пасажира" />
        <passengerTable v-bind:passengerList="filtredPassengers" @remove="removePassenger" @update="showUpdatePassengerForm"></passengerTable>

    <passengerForm v-model="passenger" v-bind:visible="formVisible" @input="formInput"></passengerForm>

    </div>
</template>
    <script>
    import Vue from "vue";
    import passengerTable from "./components/passengerTable";
    import passengerForm from "./components/passengerForm";
    import searchString from "./components/searchString";
    import queryForm from "./components/queryForm";
    import axios from 'axios';

        export default {
        name:"app",
        data() {
        return{
            passengers:[
                {
                    _id: "5e80e35446ce860b8ca62027",
                    name:"Polovko",
                    destination:"USA",
                    luggageCount:5,
                    luggageWeight:10
                },
                {
                    _id: "5e80e35446ce860b8ca62028",
                    name:"Prodan",
                    destination:"Tokyo",
                    luggageCount:15,
                    luggageWeight:120
                },
                {
                    _id: "5e80e35446ce860b8ca62029",                    
                    name:"Saroz",
                    destination:"UK",
                    luggageCount:52,
                    luggageWeight:1033
                }

            ],
            passenger: {
            name: "",
            destination:"",
            luggageCount:0,
            luggageWeight:0
      },
        formVisible: false,
        selectedIndex: -1,
        searchText: "",
        queryObject:{
          destination:""
        }
    };
},
components: {
    passengerTable,
    passengerForm,
    searchString,
    queryForm
  },
  computed: {
    filtredPassengers() {
     
      let result =  this.passengers;
      if (this.searchText) 
        result = result.filter(passenger => passenger.name.toLowerCase().includes(this.searchText.toLowerCase()));
        console.log(result)
      if (this.queryObject.destination)
        result = result.filter(passenger=> passenger.destination==this.queryObject.destination);
        console.log(result)
        return result;
    }
  },
  created(){
    this.getPassengers().then(
      passengers=>{this.passengers=passengers;}
    );
  },
  methods: {
    async getPassengers(){
      try {
        let resp =await axios.get(`http://localhost:5000/passenger`)
        return resp.data;
      } catch (e) {
        console.log(e);
        
      }
    },
    async postPassenger(passenger){
        try {
          let resp = await axios.post(`http://localhost:5000/passenger`,passenger);
          return resp.data;
        } catch (e) {
          console.log(e);
        }
    },
    async deletePassenger(passenger){
        try {
          let resp = await axios.delete(`http://localhost:5000/passenger/${passenger._id}`);
          return resp.data;
        } catch (e) {
          console.log(e);
        }
    },
    async patchPassenger(passenger){
        try {
          let resp  = await axios.patch(`http://localhost:5000/passenger/${passenger._id}`,passenger);
          return resp.data;
        } catch (e) {
          console.log(e);
        }
    },
    showNewPassengerForm() {
      this.passenger = Object.assign(this.passenger, {
            name: "",
            destination:"",
            luggageCount:0,
            luggageWeight:0
      });
      this.formAction = this.addNewPassenger;
      this.formVisible = true;
    },
    addNewPassenger() {
     this.postPassenger(this.passenger)
     .then(passenger=>this.passengers.push(passenger));
    },
    removePassenger(index) {
     this.deletePassenger(this.filtredPassengers[index])
     .then(()=>{this.filtredPassengers.splice(index,1)});
    },
    showUpdatePassengerForm(index) {
      this.selectedIndex = index;
      Object.assign(this.passenger, this.filtredPassengers[index]);
      this.formAction = this.updatePassenger;
      this.formVisible = true;
    },
    updatePassenger() {
      let i = this.selectedIndex;
      this.patchPassenger(this.passenger)
      .then(passenger=>{Object.assign(this.filtredPassengers[i],passenger)});
      this.selectedIndex=-1;
    },
    formInput() {
      this.formAction();
      this.formVisible = false;
    },
    formAction: function() {}
  }
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>
