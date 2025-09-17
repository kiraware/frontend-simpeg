import axios from "axios";

export default {
  state: {
    titles: [],
  },
  mutations: {
    SET_TITLES(state, titles) {
      state.titles = titles;
    },
  },
  actions: {
    async fetchTitles({ commit }) {
      try {
        const response = await axios.get("titles");
        commit("SET_TITLES", response.data.titles);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    },
    async createTitles(_, { jabatan, unit_kerja, tmt, tanggal_berakhir, no_sk, tanggal_sk, file }) {
      try {
        const formData = new FormData();
        formData.append("jabatan", jabatan);
        formData.append("unit_kerja",unit_kerja);
        formData.append("tmt", tmt);
        formData.append("tanggal_berakhir", tanggal_berakhir);
        formData.append("no_sk", no_sk);
        formData.append("tanggal_sk", tanggal_sk);
        formData.append("file", file);

        await axios.post("titles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating titles:", error);
        throw error;
      }
    },

    async updateTitles(_, { id, jabatan, unit_kerja, tmt, tanggal_berakhir, no_sk, tanggal_sk, file }) {
      try {
        const formData = new FormData();
        formData.append("jabatan", jabatan);
        formData.append("unit_kerja",unit_kerja);
        formData.append("tmt", tmt);
        formData.append("tanggal_berakhir", tanggal_berakhir);
        formData.append("no_sk", no_sk);
        formData.append("tanggal_sk", tanggal_sk);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`titles/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating titles:", error);
        throw error;
      }
    },
    async deleteTitles(_, id) {
      try {
        await axios.delete(`titles/${id}`);
      } catch (error) {
        console.error("Error deleting titles:", error);
        throw error;
      }
    },
  },
};
