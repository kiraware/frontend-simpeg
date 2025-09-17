import axios from "axios";

export default {
  state: {
     achievements: [],
  },
  mutations: {
    SET_ACHIEVEMENTS(state,  achievements) {
      state.achievements =  achievements;
    },
  },
  actions: {
    async fetchAchievements({ commit }) {
      try {
        const response = await axios.get("achievements");
        commit("SET_ACHIEVEMENTS", response.data.achievements);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    },
    async createAchievements(_, { nama, tingkat, tahun, penyelenggara, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("tingkat", tingkat);
        formData.append("tahun", tahun);
        formData.append("penyelenggara", penyelenggara);
        formData.append("file", file);

        await axios.post("achievements", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating achievements:", error);
        throw error;
      }
    },

    async updateAchievements(_, { id, nama, tingkat, tahun, penyelenggara, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("tingkat", tingkat);
        formData.append("tahun", tahun);
        formData.append("penyelenggara", penyelenggara);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`achievements/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating achievements:", error);
        throw error;
      }
    },
    async deleteAchievements(_, id) {
      try {
        await axios.delete(`achievements/${id}`);
      } catch (error) {
        console.error("Error deleting achievements:", error);
        throw error;
      }
    },
  },
};
