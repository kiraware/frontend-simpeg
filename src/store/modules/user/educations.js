import axios from "axios";

export default {
  state: {
     educations: [],
  },
  mutations: {
    SET_POSITIONS(state,  educations) {
      state.educations =  educations;
    },
  },
  actions: {
    async fetchEducations({ commit }) {
      try {
        const response = await axios.get("educations");
        commit("SET_POSITIONS", response.data.educations);
      } catch (error) {
        console.error("Error fetching educations:", error);
      }
    },
    async createEducations(_, { jenjang, nama, jurusan, tahun_lulus, file }) {
      try {
        const formData = new FormData();
        formData.append("jenjang", jenjang);
        formData.append("nama", nama);
        formData.append("jurusan", jurusan);
        formData.append("tahun_lulus", tahun_lulus);
        formData.append("file", file);

        await axios.post("educations", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating educations:", error);
        throw error;
      }
    },

    async updateEducations(_, { id, nama, jenjang, jurusan, tahun_lulus, file }) {
      try {
        const formData = new FormData();
        formData.append("jenjang", jenjang);
        formData.append("nama", nama);
        formData.append("jurusan", jurusan);
        formData.append("tahun_lulus", tahun_lulus);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`educations/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating educations:", error);
        throw error;
      }
    },
    async deleteEducations(_, id) {
      try {
        await axios.delete(`educations/${id}`);
      } catch (error) {
        console.error("Error deleting educations:", error);
        throw error;
      }
    },
  },
};
