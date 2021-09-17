import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { COMING_LIST_MUTATION } from '@/store/type'
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    comingList: []
  },

  getters: {
    comingListGetters (state) {
      return state.comingList.filter((item,index) => item.grade != null && index <= 6)
    }
  },

  mutations: {
    [COMING_LIST_MUTATION] (state, data) {
      state.comingList = data
    }
  },

  actions: {
    getComingListAction (store) {
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4271989',
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
            'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        store.commit(COMING_LIST_MUTATION, res.data.data.films)
      })
    }
  },

  modules: {
  }
})
