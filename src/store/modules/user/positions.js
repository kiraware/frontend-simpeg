import axios from "axios";

export default {
  state: {
    positions: [],
  },
  mutations: {
    SET_POSITIONS(state, positions) {
      state.positions = positions;
    },
  },
  actions: {
    async fetchPositions({ commit }) {
      try {
        const response = await axios.get("positions");
        commit("SET_POSITIONS", response.data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    },
    async createPositions(_, { no_sk, tanggal_sk, tmt, jenis_sk, gaji_pokok, file }) {
      try {
        const formData = new FormData();
        formData.append("no_sk", no_sk);
        formData.append("tanggal_sk", tanggal_sk);
        formData.append("tmt", tmt);
        formData.append("jenis_sk", jenis_sk);
        formData.append("gaji_pokok", gaji_pokok);
        formData.append("file", file);

        await axios.post("positions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating positions:", error);
        throw error;
      }
    },

    async updatePositions(_, { id, no_sk, tanggal_sk, tmt, jenis_sk, gaji_pokok, file }) {
      try {
        const formData = new FormData();
        formData.append("no_sk", no_sk);
        formData.append("tanggal_sk", tanggal_sk);
        formData.append("tmt", tmt);
        formData.append("jenis_sk", jenis_sk);
        formData.append("gaji_pokok", gaji_pokok);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`positions/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating positions:", error);
        throw error;
      }
    },
    async deletePositions(_, id) {
      try {
        await axios.delete(`positions/${id}`);
      } catch (error) {
        console.error("Error deleting positions:", error);
        throw error;
      }
    },
  },
};
