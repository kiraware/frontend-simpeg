import axios from "axios";

export default {
  state: {
    data: {},
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    async verifyDocument({ commit }, { id, itemId, ...docData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `documents/${id}/${itemId}`,
          docData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update document verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying document:", error);
        throw error;
      }
    },
    async verifyPosition({ commit }, { id, itemId, ...posData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `positions/${id}/${itemId}`,
          posData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update position verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying position:", error);
        throw error;
      }
    },
    async verifyEducation({ commit }, { id, itemId, ...eduData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `educations/${id}/${itemId}`,
          eduData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update education verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying education:", error);
        throw error;
      }
    },
    async verifyTraining({ commit }, { id, itemId, ...trainData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `trainings/${id}/${itemId}`,
          trainData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update training verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying training:", error);
        throw error;
      }
    },
    async verifyTitle({ commit }, { id, itemId, ...titleData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `titles/${id}/${itemId}`,
          titleData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update title verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying title:", error);
        throw error;
      }
    },
    async verifyFamily({ commit }, { id, itemId, ...famData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `families/${id}/${itemId}`,
          famData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update family verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying family:", error);
        throw error;
      }
    },
    async verifyAchievement({ commit }, { id, itemId, ...achieveData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `achievements/${id}/${itemId}`,
          achieveData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update achievement verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying achievement:", error);
        throw error;
      }
    },
    async verifyPerformance({ commit }, { id, itemId, ...perfData }) {
      try {
        // Update the document verification status directly
        const response = await axios.patch(
          `performances/${id}/${itemId}`,
          perfData
        );
        const responseData = response.data;

        if (!responseData) {
          throw new Error("Failed to update performance verification status");
        }
        // Commit mutation only if response data exists
        commit("SET_DATA", responseData);
        return responseData; // Return the response data
      } catch (error) {
        console.error("Error verifying performance:", error);
        throw error;
      }
    },
  },
};
