<template>
  <div class="mt-16 pt-8 px-6  w-auto relative  text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Riwayat Jabatan
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddTitle" />
      </div>
      <div class="px-4 py-4 mx-4 sm:-mx-8 sm:px-8">
        <div class="max-w-screen overflow-x-auto justify-center rounded-lg shadow">
          <table class="max-w-full leading-normal font-poppins">
            <thead>
              <tr>
                <th scope="col"
                  class="px-2 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No.
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jabatan
                </th>
                <th class="px-16 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Unit Kerja
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  TMT
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tanggal Berakhir
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No. SK
                </th>
                <th class="px-4 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tanggal SK
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th class="px-16 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Validasi
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="titles.length > 0">
                <tr v-for="(title, index) in titles" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ title.jabatan }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ title.unit_kerja }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ title.tmt }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ title.tanggal_berakhir }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ title.no_sk }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ title.tanggal_sk }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="title.file_url" />
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditTitle(title)" />
                      <deleteButton @click="toggleDeleteTitle(title.id)"/>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="title.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ title.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="11" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addTitle v-if="addTitle" @close="addTitle = false" :visible="addTitle" />
    <editTitle v-if="editTitle" @close="editTitle = false" :visible="editTitle" :titleData="selectedTitle"
      :id="selectedTitle.id" />
    <alertConfirmation v-if="deleteTitle" @close="deleteTitle = false" :visible="deleteTitle" @confirm="deleteTitles" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addTitle from '../../components/Form/User/Title/addTitle.vue';
import editTitle from '../../components/Form/User/Title/editTitle.vue';
import validationStatus from '../../components/Card/validationStatus.vue';
import alertConfirmation from '../../components/Alert/alertConfirmation.vue';
import loading from '../../components/Alert/loading.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    addButton,
    downloadButton,
    editButton,
    deleteButton,
    addTitle,
    editTitle,
    validationStatus,
    alertConfirmation,
    loading
  },
  setup() {
    const store = useStore();
    const titles = computed(() => store.state.titles.titles);

    onMounted(() => {
      store.dispatch('fetchTitles');
    });

    const addTitle = ref(false);
    const editTitle = ref(false);
    const deleteTitle = ref(false);
    const selectedTitle = ref({});

    const toggleAddTitle = () => {
      addTitle.value = !addTitle.value;
    };

    const toggleEditTitle = (titleData) => {
      selectedTitle.value = titleData;
      editTitle.value = !editTitle.value;
    };

    const toggleDeleteTitle = (id) => {
      selectedTitle.value = { id };
      deleteTitle.value = !deleteTitle.value;
    };

    const deleteTitles = async () => {
      try {
        await store.dispatch('deleteTitles', selectedTitle.value.id);
        await store.dispatch('fetchTitles');
        deleteTitle.value = false;
      } catch (error) {
        console.error("Error deleting title:", error);
      }
    };

    return { titles, addTitle, editTitle, deleteTitle, selectedTitle, toggleAddTitle, toggleEditTitle, toggleDeleteTitle, deleteTitles }
  }
};
</script>