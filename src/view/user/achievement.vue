<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Prestasi / Penghargaan
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddAchieve" />
      </div>
      <div class="px-4 py-4 mx-4 sm:-mx-8 sm:px-8">
        <div class="max-w-screen overflow-x-auto justify-center rounded-lg shadow">
          <table class="leading-normal font-poppins">
            <thead>
              <tr>
                <th scope="col"
                  class="px-2 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No.
                </th>
                <th
                  class="px-12 py-2 w-52 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama Prestasi
                </th>
                <th
                  class="px-10 py-2 w-28 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tingkat
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tahun
                </th>
                <th
                  class="px-12 py-2 w-52 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Penyelenggara
                </th>
                <th class="px-12 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th class="px-16 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Validasi
                </th>
                <th
                  class="px-12 py-2 w-48 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="achievements.length > 0">
                <tr v-for="(achieve, index) in achievements" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ achieve.nama }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ achieve.tingkat }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ achieve.tahun }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ achieve.penyelenggara }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="achieve.file_url"/>
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditAchieve(achieve)"/>
                      <deleteButton @click="toggleDeleteAchieve(achieve.id)" />
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="achieve.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 w-48 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ achieve.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
  <!--             <template v-else-if="loading">
                <tr>
                  <td colspan="6" class="text-center py-4 text-gray-500 font-semibold">Loading ...</td>
                </tr>
              </template>  -->
              <template v-else>
                <tr>
                  <td colspan="9" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addAchievement v-if="addAchieve" @close="addAchieve = false" :visible="addAchieve" />
    <editAchievement v-if="editAchieve" @close="editAchieve = false" :visible="editAchieve" :achievementData="selectedAchieve"
      :id="selectedAchieve.id"/>
    <alertConfirmation v-if="deleteAchieve" @close="deleteAchieve = false" :visible="deleteAchieve" @confirm="deleteAchievement" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addAchievement from '../../components/Form/User/Achievement/addAchievement.vue';
import editAchievement from '../../components/Form/User/Achievement/editAchievement.vue';
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
    addAchievement,
    editAchievement,
    validationStatus,
    alertConfirmation,
    loading
  },
  setup() {
    const store = useStore();
    const achievements = computed(() => store.state.achievements.achievements);

    onMounted(() => {
      store.dispatch('fetchAchievements');
    });

    const addAchieve = ref(false);
    const editAchieve = ref(false);
    const deleteAchieve = ref(false);
    const selectedAchieve = ref({});

    const toggleAddAchieve = () => {
      addAchieve.value = !addAchieve.value;
    };

    const toggleEditAchieve = (achievementData) => {
      selectedAchieve.value = achievementData;
      editAchieve.value = !editAchieve.value;
    };

    const toggleDeleteAchieve = (id) => {
      selectedAchieve.value = { id };
      deleteAchieve.value = !deleteAchieve.value;
    };

    const deleteAchievement = async () => {
      try {
        await store.dispatch('deleteAchievements', selectedAchieve.value.id);
        await store.dispatch('fetchAchievements');
        deleteAchieve.value = false;
      } catch (error) {
        console.error("Error deleting achievements:", error);
      }
    };

    return { achievements, addAchieve, editAchieve, deleteAchieve, selectedAchieve, toggleAddAchieve, toggleEditAchieve, toggleDeleteAchieve, deleteAchievement }
  }
};
</script>