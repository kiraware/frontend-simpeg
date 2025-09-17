import axios from "axios";

const state = {
  selectedTab: "personalData", // Initial selected tab
  userId: "", // Placeholder for user ID
  userData: {},
  documentData: [],
  titleData: [],
  educationData: [],
  trainingData: [],
  positionData: [],
  familyData: [],
  achievementData: [],
  performanceData: [] // Placeholder for fetched training data
};

const mutations = {
  SET_SELECTED_TAB(state, tabValue) {
    state.selectedTab = tabValue;
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
  },
  SET_USER_DATA(state, data) {
    state.userData = data;
  },
  SET_DOCUMENT_DATA(state, data) {
    state.documentData = data;
  },
  SET_TITLE_DATA(state, data) {
    state.titleData = data;
  },
  SET_EDUCATION_DATA(state, data) {
    state.educationData = data;
  },
  SET_TRAINING_DATA(state, data) {
    state.trainingData = data;
  },
  SET_POSITION_DATA(state, data) {
    state.positionData = data;
  },
  SET_FAMILY_DATA(state, data) {
    state.familyData = data;
  },
  SET_ACHIEVEMENT_DATA(state, data) {
    state.achievementData = data;
  },
  SET_PERFORMANCE_DATA(state, data) {
    state.performanceData = data;
  },
};

const actions = {
  selectTab({ commit, state }, tabValue) {
    commit("SET_SELECTED_TAB", tabValue);
    const userId = state.userId;
    if (userId) {
      // Dispatch an action to fetch data based on selected tab and user ID
      this.dispatch("fetchData", tabValue);
    }
  },

  async fetchData({ commit, state }, tabValue) {
    try {
      let response;
      if (tabValue === "personalData") {
        response = await axios.get(`users/${state.userId}`);
        commit("SET_USER_DATA", response.data.user);
      } else if (tabValue === "personalDocument") {
        response = await axios.get(`documents/${state.userId}`);
        commit("SET_DOCUMENT_DATA", response.data.documents);
      }  else if (tabValue === "position") {
        response = await axios.get(`positions/${state.userId}`);
        commit("SET_POSITION_DATA", response.data.positions);
      } else if (tabValue === "education") {
        response = await axios.get(`educations/${state.userId}`);
        commit("SET_EDUCATION_DATA", response.data.educations);
      } else if (tabValue === "training") {
        response = await axios.get(`trainings/${state.userId}`);
        commit("SET_TRAINING_DATA", response.data.trainings);
      }  else if (tabValue === "title") {
        response = await axios.get(`titles/${state.userId}`);
        commit("SET_TITLE_DATA", response.data.titles);
      } else if (tabValue === "family") {
        response = await axios.get(`families/${state.userId}`);
        commit("SET_FAMILY_DATA", response.data.families);
      } else if (tabValue === "achievement") {
        response = await axios.get(`achievements/${state.userId}`);
        commit("SET_ACHIEVEMENT_DATA", response.data.achievements);
      } else if (tabValue === "performance") {
        response = await axios.get(`performances/${state.userId}`);
        commit("SET_PERFORMANCE_DATA", response.data.performances);
      }

      // Add more conditions for other tabs as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
