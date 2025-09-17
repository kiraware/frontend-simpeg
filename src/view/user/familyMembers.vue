<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Data Keluarga
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddFam" />
      </div>
      <div class="px-4 py-4 mx-4 sm:-mx-8 sm:px-8">
        <div class="max-w-screen overflow-x-auto justify-center rounded-lg shadow">
          <table class="max-w-auto leading-normal font-poppins">
            <thead>
              <tr>
                <th scope="col"
                  class="px-2 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  No.
                </th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  NIK
                </th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama
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
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Hubungan Keluarga
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Aksi
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Validasi
                </th>
                <th class="px-8 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody class=" bg-sky-50">
              <template v-if="families.length > 0">
                <tr v-for="(fam, index) in families" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ fam.nik }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ fam.nama }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ fam.tempat }}, {{ fam.tanggal_lahir }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ formatJenisKelamin(fam.jenis_kelamin) }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ fam.agama }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ fam.hubungan_kel }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="fam.file_url"/>
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditFam(fam)"/>
                      <deleteButton @click="toggleDeleteFam(fam.id)"/>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="fam.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ fam.alasan_ditolak || '-' }}
                    </p>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="12" class="text-center py-4 text-gray-500 font-semibold">Data tidak tersedia</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <addFamily v-if="addFam" @close="addFam= false" :visible="addFam" />
    <editFamily v-if="editFam" @close="editFam = false" :visible="editFam" :familyData="selectedFamily"
      :id="selectedFamily.id" />
      <alertConfirmation v-if="deleteFam" @close="deleteFam = false" :visible="deleteFam" @confirm="deleteFamily" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addFamily from '../../components/Form/User/FamilyMembers/addFamily.vue';
import editFamily from '../../components/Form/User/FamilyMembers/editFamily.vue';
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
    addFamily,
    editFamily,
    validationStatus,
    alertConfirmation,
    loading
  },
  setup() {
    const store = useStore();
    const families = computed(() => store.state.families.families);

    onMounted(() => {
      store.dispatch('fetchFamilies');
    });

    const addFam = ref(false);
    const editFam = ref(false);
    const deleteFam = ref(false);
    const selectedFamily = ref({});

    const toggleAddFam = () => {
      addFam.value = !addFam.value;
    };

    const toggleEditFam = (familyData) => {
      selectedFamily.value = familyData;
      editFam.value = !editFam.value;
    };

    const toggleDeleteFam = (id) => {
      selectedFamily.value = { id };
      deleteFam.value = !deleteFam.value;
    };

    const deleteFamily = async () => {
      try {
        await store.dispatch('deleteFamilies', selectedFamily.value.id);
        await store.dispatch('fetchFamilies');
        deleteFam.value = false;
      } catch (error) {
        console.error("Error deleting familiy:", error);
      }
    };

    const formatJenisKelamin = (jenisKelamin) => {
      return jenisKelamin.replace(/_/g, '-');
    };

    return { families, addFam, editFam, deleteFam, selectedFamily, toggleAddFam, toggleEditFam, toggleDeleteFam, deleteFamily, formatJenisKelamin }
  }
};
</script>
