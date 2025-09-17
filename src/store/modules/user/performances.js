import axios from "axios";

export default {
  state: {
     performances: [],
  },
  mutations: {
    SET_PERFORMANCES(state,  performances) {
      state.performances =  performances;
    },
  },
  actions: {
    async fetchPerformances({ commit }) {
      try {
        const response = await axios.get("performances");
        commit("SET_PERFORMANCES", response.data.performances);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    },
    async createPerformances(_, { nilai_kerja, predikat, tahun, file }) {
      try {
        const formData = new FormData();
        formData.append("nilai_kerja", nilai_kerja);
        formData.append("predikat", predikat);
        formData.append("tahun", tahun);
        formData.append("file", file);

        await axios.post("performances", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating performances:", error);
        throw error;
      }
    },

    async updatePerformances(_, { id, nilai_kerja, predikat,tahun, file }) {
      try {
        const formData = new FormData();
        formData.append("nilai_kerja", nilai_kerja);
        formData.append("predikat", predikat);
        formData.append("tahun", tahun);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`performances/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating performances:", error);
        throw error;
      }
    },
    async deletePerformances(_, id) {
      try {
        await axios.delete(`performances/${id}`);
      } catch (error) {
        console.error("Error deleting performances:", error);
        throw error;
      }
    },
},
};
