import axios from "axios";

export default {
  state: {
    documents: [],
  },
  mutations: {
    SET_DOCUMENTS(state, documents) {
      state.documents = documents;
    },
  },
  actions: {
    async fetchDocuments({ commit }) {
      try {
        const response = await axios.get("documents");
        commit("SET_DOCUMENTS", response.data.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    async createDocument(_, { jenisDokumen, noDokumen, file }) {
      try {
        const formData = new FormData();
        formData.append("jenis_dokumen", jenisDokumen);
        formData.append("no_dokumen", noDokumen);
        formData.append("file", file);

        await axios.post("documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error creating document:", error);
        throw error;
      }
    },
    async updateDocument(_, { id, jenisDokumen, noDokumen, file }) {
      try {
        const formData = new FormData();
        formData.append("jenis_dokumen", jenisDokumen);
        formData.append("no_dokumen", noDokumen);
        if (file) {
          formData.append("file", file);
        }

        await axios.patch(`documents/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating document:", error);
        throw error;
      }
    },
    async deleteDocument(_, id) {
      try {
        await axios.delete(`documents/${id}`);
      } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
      }
    },
  },
};
