import { createStore } from 'vuex'
import  * as mutations from './mutations';
import  * as state from './state';
import * as getters from './getters';
import * as actions from './actions';

export default createStore({
  state,
  getters,
  mutations,
  actions
})
