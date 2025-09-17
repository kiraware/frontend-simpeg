<template>
  <div class="mt-16 pt-8 px-6  w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Pendidikan dan Pelatihan
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddTrain" />
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
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama Kegiatan
                </th>
                <th class="px-16 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Penyelenggara
                </th>
                <th class="px-4 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  JPL
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tahun Kegiatan
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
                <th
                  class="px-10 py-2 w-32 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="trainings.length > 0">
                <tr v-for="(training, index) in trainings" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ training.nama }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ training.penyelenggara }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ training.jpl }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ training.tahun_kegiatan }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="training.file_url" />
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditTrain(training)" />
                      <deleteButton @click="toggleDeleteTrain(training.id)" />
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="training.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ training.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
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
    <addTraining v-if="addTrain" @close="addTrain = false" :visible="addTrain" />
    <editTraining v-if="editTrain" @close="editTrain = false" :visible="editTrain" :trainingData="selectedTraining"
      :id="selectedTraining.id"/>
      <alertConfirmation v-if="deleteTrain" @close="deleteTrain = false" :visible="deleteTrain" @confirm="deleteTraining" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addTraining from '../../components/Form/User/Training/addTraining.vue';
import editTraining from '../../components/Form/User/Training/editTraining.vue';
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
    addTraining,
    editTraining,
    validationStatus,
    alertConfirmation,
  },
  setup() {
    const store = useStore();
    const trainings = computed(() => store.state.trainings.trainings);

    onMounted(() => {
      store.dispatch('fetchTrainings');
    });

    const addTrain = ref(false);
    const editTrain = ref(false);
    const deleteTrain = ref(false);
    const selectedTraining = ref({});

    const toggleAddTrain = () => {
      addTrain.value = !addTrain.value;
    };

    const toggleEditTrain = (trainingData) => {
      selectedTraining.value = trainingData;
      editTrain.value = !editTrain.value;
    };

    const toggleDeleteTrain = (id) => {
      selectedTraining.value = { id };
      deleteTrain.value = !deleteTrain.value;
    };

    const deleteTraining = async () => {
      try {
        await store.dispatch('deleteTrainings', selectedTraining.value.id);
        await store.dispatch('fetchTrainings');
        deleteTrain.value = false;
      } catch (error) {
        console.error("Error deleting training:", error);
      }
    };

    return { trainings, addTrain, editTrain, deleteTrain, selectedTraining, toggleAddTrain, toggleEditTrain, toggleDeleteTrain, deleteTraining }
  }
};
</script>
