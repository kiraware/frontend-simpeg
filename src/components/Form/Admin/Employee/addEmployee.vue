<template v-if="visible">
    <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
      <div class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
          <loading class="" />
        </div>
        <h1 class="font-bold text-2xl text-center">
          Tambah Pegawai
        </h1>
        <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
        <div class="pt-5 max-h-[86vh] overflow-y-auto">
          <form @submit.prevent="handleSubmit">
            <div class="divide-y divide-white space-y-4 px-4">
              <div class="relative">
                <input type="text" id="nama" v-model="nama" required
                       class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " />
                <label for="nama"
                       class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nama</label>
              </div>
              <div class="relative w-[40rem] flex ">
                <input type="text" id="nipm" v-model="nipm" required pattern="[0-9]{18}"
                       class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " />
                <label for="nipm"
                       class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nomor
                  Induk Pegawai Muhammadiyah</label>
                </div>
                <span class="text-gray-500 text-xs italic mt-1 ml-1">NIPM harus terdiri dari 18 angka</span>
                <span v-if="nipm && !validNipm" class="text-red-500 text-sm mt-1">NIPM harus terdiri dari 18 angka</span>
              <div class="relative">
                <select v-model="unit_kerja_id" required
                        class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                  <option value="" selected disabled hidden></option>
                  <option v-for="school in schools" :key="school.id" :value="school.id">{{ school.nama }}</option>
                </select>
                <label for="unit_kerja"
                       class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                       :class="{ 'floating-label': unit_kerja_id !== '' }"> Pilih Unit Kerja
                </label>
              </div>
  
              <div class="relative w-[22rem] flex-col">
                <select v-model="status_kepegawaian" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                  <option value="" selected disabled hidden></option>
                  <option value="Tetap">Pegawai Tetap</option>
                  <option value="Kontrak">Pegawai Kontrak</option>
                  <option value="Tidak_Tetap">Pegawai Tidak Tetap</option>
                </select>
                <label for="select"
                       class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                       :class="{ 'floating-label': status_kepegawaian !== '' }"> Pilih Status Pegawai
                </label>
              </div>
              <div class="relative">
                <input type="text" id="password" v-model="password" required
                       class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " />
                <label for="password"
                       class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
              </div>
              <div class="relative flex justify-end pt-4 space-x-6">
                <saveButton type="submit" class="w-20" />
                <cancelButton @click="closeModal" class="w-20" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import saveButton from '../../../Buttons/saveButton.vue';
  import cancelButton from '../../../Buttons/cancelButton.vue';
  import loading from '../../../Alert/loading.vue';
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import axios from 'axios';
  
  export default {
    components: {
      'font-awesome-icon': FontAwesomeIcon,
      saveButton,
      cancelButton,
      loading
    },
    props: {
      visible: Boolean,
    },
    setup(_, { emit }) {
      const store = useStore();
      const nama = ref('');
      const nipm = ref('');
      const unit_kerja_id = ref('');
      const status_kepegawaian = ref('');
      const password = ref('');
      const schools = ref([]);
      const loading = ref(false);
      const errorMessage = ref('');
  
      const validNipm = ref(true);
  
      onMounted(async () => {
        try {
          const response = await axios.get('schools');
          schools.value = response.data.schools;
        } catch (error) {
          console.error('Error fetching schools:', error);
          errorMessage.value = error.message;
        }
      });
  
      const closeModal = () => {
        emit('close');
      };
  
      const handleSubmit = async () => {
        try {
          loading.value = true;
          // Validate NIPM format
          if (!/^\d{18}$/.test(nipm.value)) {
            validNipm.value = false;
            return;
          } else {
            validNipm.value = true;
          }
  
          const response = await store.dispatch('createUsers', {
            nama: nama.value,
            nipm: nipm.value,
            unit_kerja_id: unit_kerja_id.value,
            status_kepegawaian: status_kepegawaian.value,
            password: password.value,
          });
  
          // Assuming a standard structure for the response
          if (response && response.error) {
            errorMessage.value = response.message || 'An error occurred while creating the user.';
          } else {
            closeModal();
            window.location.reload();
          }
        } catch (error) {
          // Log the error to console for debugging
          console.error('Error:', error);
  
          // Provide a user-friendly error message
          errorMessage.value = 'An unexpected error occurred. Please try again.';
        } finally {
          loading.value = false;
        }
      };
  
      return { nama, nipm, unit_kerja_id, status_kepegawaian, password, schools, loading, errorMessage, handleSubmit, closeModal, validNipm };
    },
  };
  </script>
  
  <style scoped>
  .floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
  }
  </style>
  