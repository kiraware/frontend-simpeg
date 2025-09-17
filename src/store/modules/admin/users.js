import axios from 'axios';

const state = {
  users: [],
  page: 1,
  totalItems: 0,
  totalPages: 0,
  selectedUserId: null, 
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  SET_TOTAL_ITEMS(state, totalItems) {
    state.totalItems = totalItems;
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_SELECTED_USER_ID(state, userId) {
    state.selectedUserId = userId;
  },
};

const actions = {
  async fetchUsers({ commit }, page = 1) {
    try {
      const response = await axios.get(`users?page=${page}`);
      const { users, total_item, total_page } = response.data;
      commit('SET_USERS', users);
      commit('SET_TOTAL_ITEMS', total_item);
      commit('SET_TOTAL_PAGES', total_page);
      commit('SET_PAGE', page);
    } catch (error) {
      console.error('Error fetching users:', error);
      let errorMessage = 'Failed to fetch users. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },

  async fetchUserById({ commit }, userId) {
    try {
      const response = await axios.get(`users/${userId}`);
      const userData = response.data;
      // Assuming userData is an object containing user details
      // You can add additional mutations to update user details in the state if needed
      commit('SET_SELECTED_USER_ID', userId);
      return userData; // Return user data if needed in the component
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      let errorMessage = 'Failed to fetch user by id. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  
  async createUsers(_, userData) {
    try {
      await axios.post("register", userData);
    } catch (error) {
      console.error("Error creating users:", error);
      let errorMessage = 'Failed to create user. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  async updateUsers(_, { id, ...userData }) {
    try {
      await axios.patch(`users/${id}`, userData);
    } catch (error) {
      console.error("Error updating users:", error);
      let errorMessage = 'Failed to delete user. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  async deleteUsers(_, id) {
    try {
      await axios.delete(`users/${id}`);
    } catch (error) {
      console.error("Error deleting users:", error);
      let errorMessage = 'Failed to delete user. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  async searchUsers({ commit }, { searchQuery, page = 1 }) {
    try {
      const response = await axios.get(`users/search?query${searchQuery}&page=${page}&size=${size}`);
      const { users, total_item, total_page } = response.data;
  
      if (users.length === 0) {
        throw new Error('No users found for the given search query.'); // Throw error for no users found
      }
  
      commit('SET_USERS', users);
      commit('SET_TOTAL_ITEMS', total_item);
      commit('SET_TOTAL_PAGES', total_page);
      commit('SET_PAGE', page);
    } catch (error) {
      console.error('Error searching users:', error);
      let errorMessage = 'Failed to search users. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  
  
};

export default {
  state,
  mutations,
  actions
};
