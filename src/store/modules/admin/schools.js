import axios from 'axios';

const state = {
  schools: [],
  schoolData: null,
  page: 1,
  totalItems: 0,
  totalPages: 0,
  selectedSchoolId: null
};

const mutations = {
  SET_SCHOOLS(state, schools) {
    state.schools = schools;
  },
    SET_SCHOOL_DATA(state, schoolData) {
      state.schoolData = schoolData; // Corrected typo here
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
  SET_SELECTED_SCHOOL_ID(state, schoolId) {
    state.selectedSchoolId = schoolId;
  },
};

const actions = {
  async fetchSchools({ commit }, page = 1 ) {
    try {
      const response = await axios.get(`schools?page=${page}`);
      const { schools, total_item, total_page } = response.data;
      commit('SET_SCHOOLS', schools);
      commit('SET_TOTAL_ITEMS', total_item);
      commit('SET_TOTAL_PAGES', total_page);
      commit('SET_PAGE', page);
    } catch (error) {
      console.error('Error fetching schools:', error);
      let errorMessage = 'Failed to fetch schools. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },

  async fetchSchoolById({ commit }, schoolId) {
    try {
      const response = await axios.get(`schools/${schoolId}`);
      const schoolData = response.data.data;
      commit('SET_SELECTED_SCHOOL_ID', schoolId);
      commit('SET_SCHOOL_DATA', schoolData); // Add this mutation to set the fetched school data
    } catch (error) {
      console.error('Error fetching school by ID:', error);
      let errorMessage = 'Failed to fetch school by id. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  
  async createSchools(_, schoolData) {
    try {
      await axios.post("schools", schoolData);
    } catch (error) {
      console.error("Error creating school:", error);
      let errorMessage = 'Failed to create users. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  async updateSchools(_, { id, ...schoolData }) {
    try {
      await axios.patch(`schools/${id}`, schoolData);
    } catch (error) {
      console.error("Error updating school:", error);
      let errorMessage = 'Failed to update users. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  },
  async deleteSchools(_, id) {
    try {
      await axios.delete(`schools/${id}`);
    } catch (error) {
      console.error("Error deleting school:", error);
      throw error;
    }
  },
  async searchSchools({ commit }, { searchQuery}) {
    try {
      const response = await axios.get(`schools/search?query=${searchQuery}`);
      const { schools, total_item, total_page } = response.data;
      commit('SET_SCHOOLS', schools);
      commit('SET_TOTAL_ITEMS', total_item);
      commit('SET_TOTAL_PAGES', total_page);
      commit('SET_PAGE', page);
    } catch (error) {
      console.error('Error searching schools:', error);
    }
  },
};

export default {
  state,
  mutations,
  actions
};
