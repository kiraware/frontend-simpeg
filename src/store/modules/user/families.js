import axios from "axios";

export default {
  state: {
    families: [],
  },
  mutations: {
    SET_FAMILIES(state, families) {
      state.families = families;
    },
  },
  actions: {
    async fetchFamilies({ commit }) {
      try {
        const response = await axios.get("families");
        commit("SET_FAMILIES", response.data.families);
      } catch (error) {
        console.error("Error fetching families:", error);
      }
    },
    async createFamilies(_, {nik, nama, tempat, tanggal_lahir, jenis_kelamin, agama, hubungan_kel, file}) {
      try {
        const formData = new FormData();
        formData.append("nik", nik);
        formData.append("nama", nama);
        formData.append("tempat", tempat);
        formData.append("tanggal_lahir", tanggal_lahir);
        formData.append("jenis_kelamin", jenis_kelamin);
        formData.append("agama", agama);
        formData.append("hubungan_kel", hubungan_kel);
        formData.append("file", file);

        await axios.post("families", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating families:", error);
        throw error;
      }
    },
    async updateFamilies(_, { id, nik, nama, tempat, tanggal_lahir, jenis_kelamin, agama, hubungan_kel, file }) {
      try {
        const formData = new FormData();
        formData.append("nik", nik);
        formData.append("nama", nama);
        formData.append("tempat", tempat);
        formData.append("tanggal_lahir", tanggal_lahir);
        formData.append("jenis_kelamin", jenis_kelamin);
        formData.append("agama", agama);
        formData.append("hubungan_kel", hubungan_kel);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`families/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating families:", error);
        throw error;
      }
    },
    async deleteFamilies(_, id) {
      try {
        await axios.delete(`families/${id}`);
      } catch (error) {
        console.error("Error deleting families:", error);
        throw error;
      }
    },
  },
};
