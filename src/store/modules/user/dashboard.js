import axios from 'axios';

const state = {
  userData: {},
};

const mutations = {
  SET_USER_DATA(state, userData) {
    state.userData = userData;
  },
};

const actions = {
  async fetchUserData({ commit }) {
    try {
      const response = await axios.get('users/dashboard');
      const userData = response.data.data;
      commit('SET_USER_DATA', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
