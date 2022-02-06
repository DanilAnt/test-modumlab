import { createStore } from 'vuex'
import { baseUrl, fetchCooldownTime } from '../configs'
// console.log(baseUrl, fetchCooldownTime);

// const request_retry = async ({ url, options, isCooledDown, n }) => {
//   try {
//     if(isCooledDown){
//       return await fetch(url, options);
//     }else{

//     } 
//   } catch (e) {
//     if (n <= 1) throw e;
//     await sleep(1000);
//     return await request_retry({ url, options, n: n - 1 });
//   }
// }
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default createStore({
  state: {
    tags: [

    ],
    cards: [

    ],
    page: 1,
    existNextPage: false,
    isCooledDown: true,
  },

  actions: {
    GET_TAGS: async ({ commit, dispatch, state }) => {
      if (state.isCooledDown) {

        let response = await fetch(baseUrl + '/book/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Host': 'webdev.modumlab.com'
          }
        });
        if (response.ok) {
          let json = await response.json();
          // console.log('tags', json);
          commit('setTags', [...json.data.list]);
        } else {
          alert("Ошибка HTTP: " + response.status);
        }


        commit('setIsCooledDown', false);
        setTimeout(() => {
          commit('setIsCooledDown', true);
        }, fetchCooldownTime)
      } else {
        await sleep(50);
        dispatch('GET_TAGS')
      }


    },

    GET_CARDS: async ({ commit, dispatch, state }, data) => {
      if (state.isCooledDown) {

        let response = await fetch(baseUrl + '/book/list',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Host': 'webdev.modumlab.com'
            },
            body: JSON.stringify(data)
          });
        if (response.ok) {
          let json = await response.json();
          // console.log('cards', json);
          commit('setCards', [...json.data.list]);
          commit('setPage', json.data.page);
          commit('setExistNextPage', json.data.next);
        } else {
          // console.log(); ("Ошибка HTTP: " + response.status);
          commit('setCards', []);
          commit('setPage', 1);
          commit('setExistNextPage', false);
        }

        commit('setIsCooledDown', false);
        setTimeout(() => {
          commit('setIsCooledDown', true);
        }, fetchCooldownTime)
      } else {
        await sleep(50);
        dispatch('GET_CARDS', data)
      }
    },
    LOAD_MORE_CARDS: async ({ commit, dispatch, state }, payload) => {
      // console.log(1);
      if (state.isCooledDown) {

        if (state.existNextPage) {
          let data = payload;
          data.page = state.page + 1;
          let response = await fetch(baseUrl + '/book/list',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Host': 'webdev.modumlab.com'
              },
              body: JSON.stringify(data)
            });
          if (response.ok) {
            let json = await response.json();
            // console.log('cards', json);
            // console.log(state.page, json.data.page);
            if(state.page !== json.data.page){
              commit('addCards', [...json.data.list]);
              commit('setPage', json.data.page);
              commit('setExistNextPage', json.data.next);
            }
          
          } else {
            console.log("Ошибка HTTP: " + response.status);
            commit('setCards', []);
            commit('setPage', 1);
            commit('setExistNextPage', false);
          }
        }

        commit('setIsCooledDown', false);
        setTimeout(() => {
          commit('setIsCooledDown', true);
        }, fetchCooldownTime)
      } else {
        await sleep(50);
        dispatch('LOAD_MORE_CARDS', payload)
      }

    }
  },
  mutations: {
    setTags(state, payload) {
      state.tags = [...payload];
    },
    setCards(state, payload) {
      state.cards = [...payload];
    },
    addCards(state, payload) {
      state.cards = [...state.cards, ...payload];
      // console.log(123, state.cards);
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setExistNextPage(state, payload) {
      state.existNextPage = payload;
    },
    setIsCooledDown(state, payload) {
      state.isCooledDown = payload;
    },
  },
  getters: {
    TAGS: state => state.tags,
    CARDS: state => state.cards,
    GET_EXIST_NEXT_PAGE: state => state.existNextPage
  },
  modules: {
  }
})
