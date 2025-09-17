<template>
  <div class="mt-16 pt-8 px-6 lg:px-6 w-auto relative xl:px-6 text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Kepangkatan
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddPosition" />
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
                <th class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No. SK
                </th>
                <th class="px-12 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tanggal SK
                </th>
                <th class="px-12 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  TMT
                </th>
                <th class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Gaji Pokok
                </th>
                <th class="px-14 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jenis SK
                </th>
                <th class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th class="px-14 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Validasi
                </th>
                <th class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="positions.length > 0">
                <tr v-for="(position, index) in positions" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ position.no_sk }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ position.tanggal_sk }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ position.tmt }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ position.gaji_pokok }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ position.jenis_sk }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="position.file_url" />
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditPosition(position)" />
                      <deleteButton @click="toggleDeletePosition(position.id)" />
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="position.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ position.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="10" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addPosition v-if="addPos" @close="addPos = false" :visible="addPos" />
    <editPosition v-if="editPos" @close="editPos = false" :visible="editPos" :positionData="selectedPosition"
      :id="selectedPosition.id" />
    <alertConfirmation v-if="deletePos" @close="deletePos = false" :visible="deletePos" @confirm="deletePosition" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addPosition from '../../components/Form/User/Position/addPosition.vue';
import editPosition from '../../components/Form/User/Position/editPosition.vue';
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
    addPosition,
    editPosition,
    validationStatus,
    alertConfirmation,
    loading
  },
  setup() {
    const store = useStore();
    const positions = computed(() => store.state.positions.positions);

    onMounted(() => {
      store.dispatch('fetchPositions');
    });

    const addPos = ref(false);
    const editPos = ref(false);
    const deletePos = ref(false);
    const selectedPosition = ref({});

    const toggleAddPosition = () => {
      addPos.value = !addPos.value;
    };

    const toggleEditPosition = (positionData) => {
      selectedPosition.value = positionData;
      editPos.value = !editPos.value;
    };

    const toggleDeletePosition = (id) => {
      selectedPosition.value = { id };
      deletePos.value = !deletePos.value;
    };

    const deletePosition = async () => {
      try {
        await store.dispatch('deletePositions', selectedPosition.value.id);
        await store.dispatch('fetchPositions');
        deletePos.value = false;
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    };

    return { positions, addPos, editPos, deletePos, selectedPosition, toggleAddPosition, toggleEditPosition, toggleDeletePosition, deletePosition }
  }
};
</script>
