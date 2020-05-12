import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const vue = Vue.prototype;

export default new Vuex.Store({
  state: {
    count: 0,
    obj: [{ a: "1" }, { b: "2" }],


    userList: []
  },


  mutations: {

    getUserList(state, data) {
      state.userList = data;
    },
  },

  actions: {

    getUserList({ commit }) {
      return new Promise((resolve, reject) => {
        vue.$ReqUser.getUserList({ admin: false }).then((res) => {
          commit('getUserList', res.data.rows);
          resolve(res.data.rows);
        });
      });

    },

    change(context, num) {
      context.commit('inchange', num)
    }

  },



  getters: {

    synchro(state) {
      return state.count
    }

  },

});