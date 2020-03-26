import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { ReqLogin } from '../api/login';

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {

    synchro(state) {
      return state.count
    }

  },
  mutations: {

    increment(state) {
      state.count++
    },
    inreduce(state) {
      state.count--
    },
    inchange(state, num) {
      state.count = num
    }

  },
  actions: {

    getDevice({ commit }) {
      return new Promise((resolve, reject) => {
        ReqLogin.getDeviceCount().then((res) => {
          console.log(res)
          commit('inchange', res.data.data);
          resolve(res.data.data);
        });
      });

    },

    change(context, num) {
      context.commit('inchange', num)
    }

  }
});