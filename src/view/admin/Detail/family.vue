<template>
  <div class="pt-4 w-full">
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
                  class="px-14 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  NIK
                </th>
                <th scope="col"
                  class="px-14 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama Keluarga
                </th>
                <th class="px-12 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tempat, Tanggal Lahir
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jenis Kelamin
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Agama
                </th>
                <th scope="col"
                  class="px-6 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Status Keluarga
                </th>
                <th scope="col" class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th scope="col"
                  class="px-8 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Status
                </th>
                <th scope="col"
                  class="px-14 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th scope="col"
                  class="px-10 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="familyData.length > 0">
                <tr v-for="(item, index) in familyData" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">{{ index + 1 }}</td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.nik }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.nama }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.tempat }}, {{ item.tanggal_lahir }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ formatJenisKelamin(item.jenis_kelamin) }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.agama }}</p>
                  </td>
                  <td class="px-4 py-5 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.hubungan_kel }}</p>
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
                  <td colspan="11" class="text-center py-4 text-gray-500 font-semibold">Loading</td>
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
    <familyVerify v-if="addVerify" @close="addVerify = false" :visible="addVerify" :famData="selectedFam" :id="id" />
  </div>
</template>

<script>
import downloadButton from '../../../components/Buttons/downloadButton.vue';
import verifyButton from '../../../components/Buttons/verifyButton.vue';
import validationStatus from '../../../components/Card/validationStatus.vue';
import familyVerify from '../../../components/Form/Admin/Verify/familyVerify.vue'
import { ref, watch } from 'vue';

export default {
  components: {
    verifyButton,
    downloadButton,
    validationStatus,
    familyVerify
  },
  props: {
    familyData: {
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
    const selectedFam = ref({})

    const toogleVerify = (famData) => {
      addVerify.value = !addVerify.value;
      selectedFam.value = famData;
    }

    watch(() => props.familyData, (newValue) => {
      if (newValue) {
        loading.value = false;
      }
    }, { immediate: true });

    const formatJenisKelamin = (jenisKelamin) => {
      return jenisKelamin.replace(/_/g, '-');
    };

    return {
      loading, addVerify, selectedFam, toogleVerify, formatJenisKelamin
    };
  }
};
</script>

<style scoped>
/* Your component styles */
</style>