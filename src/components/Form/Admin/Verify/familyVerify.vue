<template v-if="visible">
  <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
      <div
          class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
              <loading class="" />
          </div>
          <h1 class="font-bold text-2xl text-center">
              Verifikasi
          </h1>
          <div class="pt-5 max-h-[86vh] overflow-y-auto">
              <form @submit.prevent="handleSubmit">
                  <div class="divide-y divide-white space-y-8 px-4">

                      <div class="relative w-[22rem] flex">
                          <select v-model="status_verifikasi" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                        focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                              <option value="" selected disabled hidden></option>
                              <option value="accepted">Setujui</option>
                              <option value="rejected">Tolak</option>
                              <option value="pending">Menunggu</option>
                          </select>
                          <label for="status_verifikasi"
                              class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                              :class="{ 'floating-label': status_verifikasi !== '' }"> Pilih Status Verifikasi
                          </label>
                      </div>
                      <div v-if="showAlasan" class="relative flex h-28">
                          <input type="text" id="alasan_ditolak" v-model="alasan_ditolak" required
                              class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " />
                          <label for="alasan_ditolak"
                              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              Alasan</label>
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
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
      'font-awesome-icon': FontAwesomeIcon,
      saveButton,
      cancelButton,
      loading
  },
  props: {
      visible: {
          type: Boolean,
          required: true
      },
      loading: {
          type: Boolean,
          default: false
      },
      id: {
          type: String,
          required: true
      },
      famData: {
      type: Object, // Assuming document id is a string// Allow it to be optional
  }
  },
  setup(props, { emit }) {
      const store = useStore();

      const status_verifikasi = ref('');
      const alasan_ditolak = ref('');
      const itemId = ref('');
      const showAlasan = ref(false);

      watch(status_verifikasi, (newValue) => {
          showAlasan.value = newValue === 'rejected';
      });

      status_verifikasi.value = props. famData.status_verifikasi;
      alasan_ditolak.value = props. famData.alasan_ditolak || '';
      itemId.value = props.famData.id;

      const handleSubmit = async () => {
          try {
              loading.value = true;
              await store.dispatch('verifyFamily', {
                  id: props.id,
                  itemId: itemId.value,
                  status_verifikasi: status_verifikasi.value,
                  alasan_ditolak: alasan_ditolak.value || '',
              });
              closeModal();
              window.location.reload();
          } catch (error) {
              console.error('Error:', error);
          } finally {
              loading.value = false;
          }
      };

      const closeModal = () => {
          emit('close');
      };

      return {
          itemId,
          status_verifikasi,
          alasan_ditolak,
          showAlasan,
          handleSubmit,
          closeModal,
      };

  }
}
</script>

<style scoped>
.floating-label {
  transform: translateY(-120%) scale(0.75);
  top: 1rem;
}
</style>