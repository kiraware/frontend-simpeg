<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Penilaian Kinerja
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddPerf" />
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
                  class="px-10 py-2 w-72 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nilai Prestasi Kerja
                </th>
                <th
                  class="px-10 py-2 w-56 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Predikat
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tahun
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
                  class="px-10 py-2 w-72 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="performances.length > 0">
                <tr v-for="(perf, index) in performances" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ perf.nilai_kerja }} / 100
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ perf.predikat }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ perf.tahun }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="perf.file_url"/>
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditPerf(perf)"/>
                      <deleteButton @click="toggleDeletePerf(perf.id)"/>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="perf.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 w-48 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ perf.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="8" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addPerformance v-if="addPerf" @close="addPerf = false" :visible="addPerf" />
    <editPerformance v-if="editPerf" @close="editPerf = false" :visible="editPerf" :performanceData="selectedPerformance"
      :id="selectedPerformance.id"/>
      <alertConfirmation v-if="deletePerf" @close="deletePerf = false" :visible="deletePerf" @confirm="deletePerformance" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addPerformance from '../../components/Form/User/PerformanceAssessment/addPerformance.vue';
import editPerformance from '../../components/Form/User/PerformanceAssessment/editPerformance.vue';
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
    addPerformance,
    editPerformance,
    validationStatus,
    alertConfirmation,
  },
  setup() {
    const store = useStore();
    const performances = computed(() => store.state.performances.performances);

    onMounted(() => {
      store.dispatch('fetchPerformances');
    });

    const addPerf = ref(false);
    const editPerf = ref(false);
    const deletePerf = ref(false);
    const selectedPerformance = ref({});

    const toggleAddPerf = () => {
      addPerf.value = !addPerf.value;
    };

    const toggleEditPerf = (performanceData) => {
      selectedPerformance.value = performanceData;
      editPerf.value = !editPerf.value;
    };

    const toggleDeletePerf = (id) => {
      selectedPerformance.value = { id };
      deletePerf.value = !deletePerf.value;
    };

    const deletePerformance = async () => {
      try {
        await store.dispatch('deletePerformances', selectedPerformance.value.id);
        await store.dispatch('fetchPerformances');
        deletePerf.value = false;
      } catch (error) {
        console.error("Error deleting performances:", error);
      }
    };

    return { performances, addPerf, editPerf, deletePerf, selectedPerformance, toggleAddPerf, toggleEditPerf, toggleDeletePerf, deletePerformance }
  }
};
</script>
