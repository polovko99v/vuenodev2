import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        passengers: [],
        searchString: "",
        formVisible: false,
        formPassenger: {},
        formNewMode: true
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredPassengers(state) {
            let result = state.passengers;
            if (state.searchString)
                result = result.filter(passenger =>
                    passenger.name.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setPassengers(state, passengers) {
            state.passengers = passengers;
        },
        addPassenger(state, passenger) {
            state.passengers.push(passenger);
        },
        removePassenger(state, passenger) {
            const index = state.passengers.indexOf(passenger);
            state.passengers.splice(index, 1);
        },
        updatePassenger(state, passenger) {
            const index = state.passengers.findIndex(b => b._id == passenger._id);
            Vue.set(state.passengers, index, passenger);
        },
        sortPassengers(state, field) {
            state.passengers.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormPassenger(state) {
            Object.assign(state.formPassenger, {
                name: "",
                destination:"",
                luggageCount: 0,
                luggageWeight:0
            });
        },
        setFormPassenger(state, passenger) {
            state.formPassenger = passenger;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getPassengers(context) {
            try {
                let resp = await axios.get("http://localhost:5000/passenger");
                context.commit("setPassengers", resp.data);
                await context.dispatch("showMessageForTime", { message: "Пасажирів завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getPassengerById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/passenger/${id}`);
                await context.dispatch("showMessageForTime", { message: "Пасажирів завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getPassengersByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/passenger", { params: query });
                context.commit("setPassengers", resp.data);
                await context.dispatch("showMessageForTime", { message: "Пасажирів завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postPassenger(context, passenger) {
            try {
                let resp = await axios.post("http://localhost:5000/passenger", passenger);
                context.commit("addPassenger", resp.data);
                await context.dispatch("showMessageForTime", { message: "Пасажирів додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deletePassenger(context, passenger) {
            try {
                let resp = await axios.delete(`http://localhost:5000/passenger/${passenger._id}`);
                context.commit("removePassenger", resp.data);
                await context.dispatch("showMessageForTime", { message: "Пасажирів вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchPassenger(context, passenger) {
            try {
                let resp = await axios.patch(`http://localhost:5000/passenger/${passenger._id}`, passenger);
                context.commit("updatePassenger", resp.data);
                await context.dispatch("showMessageForTime", { message: "Пасажира оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, passenger) {
            passenger = await context.dispatch("getPassengerById", passenger._id);
            context.commit("setFormPassenger", passenger);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormPassenger");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
