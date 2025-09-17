<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Dokumen Pribadi
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddDoc" />
      </div>
      <div class="px-4 py-4 mx-4 sm:-mx-8 sm:px-8">
        <div class="max-w-full justify-center overflow-x-auto rounded-lg shadow">
          <table class="max-w-full leading-normal font-poppins">
            <thead>
              <tr>
                <th scope="col"
                  class="px-2 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No.
                </th>
                <th scope="col"
                  class="px-[5rem] py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jenis Dokumen
                </th>
                <th scope="col"
                  class="px-[6rem] py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  ID / Nomor
                </th>
                <th scope="col"
                  class="px-16 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th scope="col"
                  class="px-16 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th scope="col"
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Validasi
                </th>
                <th scope="col"
                  class="px-[6rem] py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="documents.length > 0">
                <tr v-for="(doc, index) in documents" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">{{ doc.jenis_dokumen }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ doc.no_dokumen }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="doc.file_url" />
                  </td>
                  <td class="px-4 py-5 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row items-center">
                      <editButton @click="toggleEditDoc(doc)" />
                      <deleteButton  @click="toggleDeleteDoc(doc.id)" />
                    </div>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="doc.status_verifikasi" />
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">{{ doc.alasan_ditolak || '-' }}</p>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addDocument v-if="addDoc" @close="addDoc = false" :visible="addDoc" />
    <editDocument v-if="editDoc" @close="editDoc = false" :visible="editDoc" :documentData="selectedDocument"
      :id="selectedDocument.id" />
      <alertConfirmation v-if="deleteDoc" @close="deleteDoc = false" :visible="deleteDoc" @confirm="deleteDocument"/>
  </div>
</template>


<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addDocument from '../../components/Form/User/PersonalDocument/addDocument.vue';
import editDocument from '../../components/Form/User/PersonalDocument/editDocument.vue';
import validationStatus from '../../components/Card/validationStatus.vue';
import alertConfirmation from '../../components/Alert/alertConfirmation.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    addButton,
    downloadButton,
    editButton,
    deleteButton,
    addDocument,
    editDocument,
    validationStatus,
    alertConfirmation
  },
  setup() {
    const store = useStore();

    const documents = computed(() => store.state.documents.documents);

    onMounted(() => {
      store.dispatch('fetchDocuments');
    });

    const addDoc = ref(false);
    const editDoc = ref(false);
    const deleteDoc = ref(false);
    const selectedDocument = ref({});
  
    // Function to toggle modal visibility
    const toggleAddDoc = () => {
      addDoc.value = !addDoc.value;
    };
    const toggleEditDoc = (documentData) => {
      selectedDocument.value = documentData; // Set the selected document data
      editDoc.value = !editDoc.value;
    };

    const toggleDeleteDoc = (id) => {
      selectedDocument.value = {id};
      deleteDoc.value = !deleteDoc.value;
    };

    const deleteDocument = async () => {
      try {
        await store.dispatch('deleteDocument', selectedDocument.value.id);
        await store.dispatch('fetchDocuments');
        deleteDoc.value = false;
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    };

    return { documents, addDoc, editDoc, deleteDoc, toggleAddDoc, toggleEditDoc, toggleDeleteDoc, selectedDocument, deleteDocument, };
  },
};
</script>
