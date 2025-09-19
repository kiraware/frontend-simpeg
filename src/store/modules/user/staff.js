// src/store/modules/user/staff.js
import axios from 'axios';

export default {
  namespaced: true,
  state: { staff: [] },
  mutations: {
    setStaff(state, staff) {
      state.staff = staff;
    }
  },
  actions: {
    async fetchStaff({ commit }) {
      try {
        const res = await axios.get("staff");
        commit("setStaff", res.data.staff); // pastikan backend return { staff: [...] }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    },

    async addStaff(_, { nama, nipm, status_kepegawaian, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nipm", nipm);
        formData.append("status_kepegawaian", status_kepegawaian);
        if (file) {
          formData.append("file", file);
        }

        await axios.post("staff", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } catch (error) {
        console.error("Error adding staff:", error);
        throw error;
      }
    },

    async updateStaff(_, { id, nama, nipm, status_kepegawaian, file }) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nipm", nipm);
        formData.append("status_kepegawaian", status_kepegawaian);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`staff/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } catch (error) {
        console.error("Error updating staff:", error);
        throw error;
      }
    },

    async deleteStaff(_, id) {
      try {
        await axios.delete(`staff/${id}`);
      } catch (error) {
        console.error("Error deleting staff:", error);
        throw error;
      }
    }
  }
};
