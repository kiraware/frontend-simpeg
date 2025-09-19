// src/store/modules/user/staff.js
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    staff: [],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
  },
  mutations: {
    setStaff(state, payload) {
      state.staff = payload.data;
      state.pagination = {
        current_page: payload.current_page,
        last_page: payload.last_page,
        per_page: payload.per_page,
        total: payload.total,
      };
    },
  },
  actions: {
    async fetchStaff({ commit }, { page = 1, perPage = 10 } = {}) {
      try {
        const res = await axios.get(`staff?page=${page}&per_page=${perPage}`);
        // pastikan backend mengembalikan data dengan struktur:
        // {
        //   data: [...],
        //   current_page: 1,
        //   last_page: 5,
        //   per_page: 10,
        //   total: 50
        // }
        commit('setStaff', res.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    },

    async addStaff(_, { nama, nipm, status_kepegawaian, file }) {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('nipm', nipm);
        formData.append('status_kepegawaian', status_kepegawaian);
        if (file) {
          formData.append('file', file);
        }

        await axios.post('staff', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Error adding staff:', error);
        throw error;
      }
    },

    async updateStaff(_, { id, nama, nipm, status_kepegawaian, file }) {
      try {
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('nipm', nipm);
        formData.append('status_kepegawaian', status_kepegawaian);
        if (file) {
          formData.append('file', file);
        }

        await axios.patch(`staff/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Error updating staff:', error);
        throw error;
      }
    },

    async deleteStaff(_, id) {
      try {
        await axios.delete(`staff/${id}`);
      } catch (error) {
        console.error('Error deleting staff:', error);
        throw error;
      }
    },
  },
};
