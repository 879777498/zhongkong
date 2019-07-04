import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userinfo:''
  },
  mutations: {
    // 用户信息
    userinfo(state,data){
      return state.userinfo = data
    }
  },
  actions: {

  }
})
