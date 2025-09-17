<template>
  <div class="mt-16 pt-8 px-6  w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Riwayat Pendidikan
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddEdu" />
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
                  Jenjang
                </th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Nama Instansi
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Jurusan
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Tahun Lulus
                </th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                  Berkas
                </th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">
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
              <template v-if="educations.length > 0">
                <tr v-for="(edu, index) in educations" :key="index" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ edu.jenjang }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ edu.nama }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ edu.jurusan }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ edu.tahun_lulus }}
                    </p>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <downloadButton :fileUrl="edu.file_url"/>
                  </td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditEdu(edu)"/>
                      <deleteButton @click="toggleDeleteEdu(edu.id)"/>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <validationStatus :status="edu.status_verifikasi" />
                  </td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">
                    <p class="text-gray-900">
                      {{ edu.alasan_ditolak || '-' }}
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
    <addEducation v-if="addEdu" @close="addEdu = false" :visible="addEdu" />
    <editEducation v-if="editEdu" @close="editEdu = false" :visible="editEdu" :educationData="selectedEducation"
      :id="selectedEducation.id"/>
      <alertConfirmation v-if="deleteEdu" @close="deleteEdu = false" :visible="deleteEdu" @confirm="deleteEducation" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import downloadButton from '../../components/Buttons/downloadButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addEducation from '../../components/Form/User/EducationHistory/addEducation.vue';
import editEducation from '../../components/Form/User/EducationHistory/editEducation.vue';
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
    addEducation,
    editEducation,
    validationStatus,
    alertConfirmation,
  },
  setup() {
    const store = useStore();
    const educations = computed(() => store.state.educations.educations);

    onMounted(() => {
      store.dispatch('fetchEducations');
    });

    const addEdu = ref(false);
    const editEdu = ref(false);
    const deleteEdu = ref(false);
    const selectedEducation = ref({});

    const toggleAddEdu = () => {
      addEdu.value = !addEdu.value;
    };

    const toggleEditEdu = (educationData) => {
      selectedEducation.value = educationData;
      editEdu.value = !editEdu.value;
    };

    const toggleDeleteEdu = (id) => {
      selectedEducation.value = { id };
      deleteEdu.value = !deleteEdu.value;
    };

    const deleteEducation = async () => {
      try {
        await store.dispatch('deleteEducations', selectedEducation.value.id);
        await store.dispatch('fetchEducations');
        deleteEdu.value = false;
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    };

    return { educations, addEdu, editEdu, deleteEdu, selectedEducation, toggleAddEdu, toggleEditEdu, toggleDeleteEdu, deleteEducation }
  }
};
</script>
