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
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jenjang
                </th>
                <th class="px-20 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama Instansi
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jurusan
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tahun Lulus
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
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th scope="col"
                  class="px-16 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="educationData.length > 0">
                <tr v-for="(item, index) in educationData" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">{{ index + 1 }}</td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.jenjang }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.nama }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.jurusan }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.tahun_lulus }}</p>
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
    <educationVerify v-if="addVerify" @close="addVerify = false" :visible="addVerify" :eduData="selectedEdu" :id="id" />
  </div>
</template>

<script>
import downloadButton from '../../../components/Buttons/downloadButton.vue';
import verifyButton from '../../../components/Buttons/verifyButton.vue';
import validationStatus from '../../../components/Card/validationStatus.vue';
import educationVerify from '../../../components/Form/Admin/Verify/educationVerify.vue'
import { ref, watch } from 'vue';

export default {
  components: {
    verifyButton,
    downloadButton,
    validationStatus,
    educationVerify
  },
  props: {
    educationData: {
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
    const selectedEdu = ref({})

    const toogleVerify = (eduData) => {
      addVerify.value = !addVerify.value;
      selectedEdu.value = eduData;
    }

    watch(() => props.educationData, (newValue) => {
      if (newValue) {
        loading.value = false;
      }
    }, { immediate: true });

    return {
      loading, addVerify, selectedEdu, toogleVerify
    };
  }
};
</script>

<style scoped>
/* Your component styles */
</style>