import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    backendData:'x'
  },
  mutations: {
    set_backdata(state, data) {
      state.backendData = data
    }
  },
  actions:{
    get_backdata({ commit }, value) {
      commit('set_backdata', value);
      // commit('SET_TOKEN', value2)
    }
  },
  getters: { //数据处理or计算
    bkdata(state){
      return state.backendData;
    }
  }
})
export default store;
