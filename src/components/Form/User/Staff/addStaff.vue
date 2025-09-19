<template v-if="visible">
  <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
    <div class="relative m-auto max-w-2xl bg-white px-6 p-5 shadow-lg sm:rounded-xl sm:px-10">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <loading />
      </div>
      <h1 class="font-bold text-2xl text-center">Tambah Staff</h1>
      <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>

      <div class="pt-5 max-h-[86vh] overflow-y-auto">
        <form @submit.prevent="handleSubmit">
          <div class="divide-y divide-white space-y-4 px-4">
            <!-- Nama -->
            <div class="relative">
              <input type="text" v-model="nama" required
                class="peer block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg 
                       focus:border-blue-600 focus:outline-none"
                placeholder=" " />
              <label
                class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 
                       peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4">
                Nama Staff
              </label>
            </div>

            <!-- NIPM -->
            <div class="relative">
              <input type="text" v-model="nipm" required pattern="[0-9]{18}"
                class="peer block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg 
                       focus:border-blue-600 focus:outline-none"
                placeholder=" " />
              <label
                class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 
                       peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4">
                NIPM (18 angka)
              </label>
            </div>
            <span v-if="nipm && !validNipm" class="text-red-500 text-sm">NIPM harus 18 angka</span>

            <!-- Status Kepegawaian -->
            <div class="relative">
              <select v-model="status_kepegawaian" required
                class="peer block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg 
                       focus:border-blue-600 focus:outline-none">
                <option disabled value=""> </option>
                <option value="Tetap">Pegawai Tetap</option>
                <option value="Tidak_Tetap">Pegawai Tidak Tetap</option>
                <option value="Kontrak">Pegawai Kontrak</option>
              </select>
              <label
                class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 
                       peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4">
                Pilih Status Pegawai
              </label>
            </div>

            <!-- Foto -->
            <div>
              <input type="file" @change="handleFileSelect" accept="image/*" />
              <p class="text-xs text-gray-500 italic">Upload foto (opsional, max 1 MB)</p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end pt-4 space-x-6">
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import saveButton from '../../../Buttons/saveButton.vue'
import cancelButton from '../../../Buttons/cancelButton.vue'
import loading from '../../../Alert/loading.vue'
import axios from 'axios'

export default {
  components: { saveButton, cancelButton, loading },
  props: { visible: Boolean },
  setup(_, { emit }) {
    const store = useStore()
    const nama = ref('')
    const nipm = ref('')
    const unit_kerja_id = ref('')
    const status_kepegawaian = ref('')
    const schools = ref([])
    const file = ref(null)
    const loading = ref(false)
    const errorMessage = ref('')
    const validNipm = ref(true)

    const closeModal = () => emit('close')

    const handleFileSelect = (e) => {
      const selected = e.target.files[0]
      if (selected && selected.size > 1024 * 1024) {
        errorMessage.value = 'Ukuran file maksimal 1 MB'
        file.value = null
      } else {
        file.value = selected
      }
    }

    const handleSubmit = async () => {
      try {
        loading.value = true;
        if (!/^\d{18}$/.test(nipm.value)) {
          validNipm.value = false;
          return;
        } else validNipm.value = true;

        await store.dispatch('staff/addStaff', {
          nama: nama.value,
          nipm: nipm.value,
          unit_kerja_id: unit_kerja_id.value,
          status_kepegawaian: status_kepegawaian.value,
          file: file.value
        });

        closeModal();
        window.location.reload();
      } catch (err) {
        console.error("Error in handleSubmit:", err);
        errorMessage.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      try {
        const response = await axios.get('schools')
        schools.value = response.data.schools
      } catch (error) {
        console.error('Error fetch schools:', error)
        errorMessage.value = error.message
      }
    })

    return { nama, nipm, unit_kerja_id, status_kepegawaian, schools, file, loading, errorMessage, handleSubmit, closeModal, handleFileSelect, validNipm }
  }
}
</script>
