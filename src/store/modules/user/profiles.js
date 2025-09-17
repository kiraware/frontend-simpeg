import axios from "axios";

export default {
  state: {
    profiles: {},
    selectedUserId: null, 
  },
  mutations: {
    SET_PROFILES(state,  profiles) {
      state. profiles =  profiles;
    },
    SET_SELECTED_USER_ID(state, userId) {
      state.selectedUserId = userId;
    },
  },
  actions: {
    async fetchProfile({ commit }) {
      try {
        const response = await axios.get('profiles');
        commit("SET_PROFILES", response.data.profile);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    },
    async fetchProfileById({ commit }, userId) {
      try {
        const response = await axios.get(`users/profile/${userId}`);
        const userData = response.data;
        // Assuming userData is an object containing user details
        // You can add additional mutations to update user details in the state if needed
        commit('SET_SELECTED_USER_ID', userId);
        return userData; // Return user data if needed in the component
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; // Rethrow the error to handle it in the component
      }
    },
    async updateProfile(_, personalData) {
      try {
        await axios.patch("profiles", personalData);
      } catch (error) {
        console.error("Error updating profiles:", error);
        throw error;
      }
    },
    async updateProfileEmail(_, { email, img }) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        if (img) {
          formData.append("img", img); // Use the file name, not the URL
        }
    
        await axios.patch("users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    },
    
  },
};
