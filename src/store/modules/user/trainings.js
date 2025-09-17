import axios from "axios";

export default {
  state: {
     trainings: [],
  },
  mutations: {
    SET_TRAININGS(state, trainings) {
      state.trainings = trainings;
    },
  },
  actions: {
    async fetchTrainings({ commit }) {
      try {
        const response = await axios.get("trainings");
        commit("SET_TRAININGS", response.data.trainings);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    },
    async createTrainings(_, {  nama, penyelenggara, jpl, tahun_kegiatan, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("penyelenggara", penyelenggara);
        formData.append("jpl", jpl);
        formData.append("tahun_kegiatan", tahun_kegiatan);
        formData.append("file", file);

        await axios.post("trainings", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating trainings:", error);
        throw error;
      }
    },

    async updateTraining(_, { id, nama, penyelenggara, jpl, tahun_kegiatan, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("penyelenggara", penyelenggara);
        formData.append("jpl", jpl);
        formData.append("tahun_kegiatan", tahun_kegiatan);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`trainings/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating trainings:", error);
        throw error;
      }
    },
    async deleteTrainings(_, id) {
      try {
        await axios.delete(`trainings/${id}`);
      } catch (error) {
        console.error("Error deleting trainings:", error);
        throw error;
      }
    },
  },
};
