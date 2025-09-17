<template>
  <div class="pt-4">
    <div class=" flex flex-col p-4 bg-white shadow rounded-lg mb-4 border-solid border-2">
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
                  class="px-12 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
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
                <th scope="col"
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th scope="col"
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Status
                </th>
                <th scope="col"
                  class="px-16 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th scope="col"
                  class="px-16 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="trainingData.length > 0">
                <tr v-for="(item, index) in trainingData" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">{{ index + 1 }}</td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.nama }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.penyelenggara }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.jpl }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.tahun_kegiatan }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <downloadButton v-if="item.file_url" :fileUrl="item.file_url" />
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="item.status_verifikasi" />
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <verifyButton @click="toogleVerify(item)" />
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">{{ item.alasan_ditolak || '-' }}</p>
                  </td>
                </tr>
              </template>
              <template v-else-if="loading">
                <tr>
                  <td colspan="9" class="text-center py-4 text-gray-500 font-semibold">Loading</td>
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
    <trainingVerify v-if="addVerify" @close="addVerify = false" :visible="addVerify" :trainData="selectedTrain"
      :id="id" />
  </div>
</template>

<script>
import downloadButton from '../../../components/Buttons/downloadButton.vue';
import verifyButton from '../../../components/Buttons/verifyButton.vue';
import validationStatus from '../../../components/Card/validationStatus.vue';
import trainingVerify from '../../../components/Form/Admin/Verify/trainingVerify.vue'
import { ref, watch } from 'vue';

export default {
  components: {
    verifyButton,
    downloadButton,
    validationStatus,
    trainingVerify
  },
  props: {
    trainingData: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(true);
    const addVerify = ref(false);
    const selectedTrain = ref({})

    const toogleVerify = (trainData) => {
      addVerify.value = !addVerify.value;
      selectedTrain.value = trainData;
    }

    watch(() => props.trainingData, (newValue) => {
      if (newValue) {
        loading.value = false;
      }
    }, { immediate: true });

    return {
      loading, addVerify, selectedTrain, toogleVerify
    };
  }
};
</script>

<style scoped>
/* Your component styles */
</style>