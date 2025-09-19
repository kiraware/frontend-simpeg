<template v-if="visible">
  <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
    <div class="relative m-auto max-w-2xl bg-white px-6 p-5 shadow-lg sm:rounded-xl sm:px-10">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <loading />
      </div>
      <h1 class="font-bold text-2xl text-center">Edit Staff</h1>
      <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>

      <div class="pt-5 max-h-[86vh] overflow-y-auto">
        <form @submit.prevent="handleSubmit">
          <div class="divide-y divide-white space-y-4 px-4">
            <!-- Nama -->
            <div class="relative">
              <input type="text" v-model="nama" required
                class="block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg focus:border-blue-600 focus:outline-none peer"
                placeholder=" " />
              <label class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                Nama Staff
              </label>
            </div>

            <!-- NIPM -->
            <div class="relative">
              <input type="text" v-model="nipm" required pattern="[0-9]{18}"
                class="block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg focus:border-blue-600 focus:outline-none peer"
                placeholder=" " />
              <label class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                NIPM (18 angka)
              </label>
            </div>
            <span v-if="nipm && !validNipm" class="text-red-500 text-sm">NIPM harus 18 angka</span>

            <!-- Email -->
            <div class="relative">
              <input type="email" v-model="email"
                class="block w-full px-2.5 pb-2 pt-4 text-sm border border-gray-400 rounded-lg focus:border-blue-600 focus:outline-none peer"
                placeholder=" " />
              <label class="absolute text-sm text-gray-500 transform -translate-y-4 scale-75 top-2 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                Email (opsional)
              </label>
            </div>

            <!-- Status Kepegawaian -->
            <div class="relative">
              <select v-model="status_kepegawaian" required
                class="pt-3 pb-2 block w-full px-2 border border-gray-400 rounded-lg focus:border-blue-600 focus:outline-none">
                <option value="" selected disabled hidden></option>
                <option value="Tetap">Pegawai Tetap</option>
                <option value="Tidak_Tetap">Pegawai Tidak Tetap</option>
                <option value="Kontrak">Pegawai Kontrak</option>
              </select>
              <label class="absolute text-sm top-3 bg-white px-2 text-gray-500">Pilih Status Pegawai</label>
            </div>

            <!-- Foto -->
            <div>
              <input type="file" @change="handleFileSelect" accept="image/*" />
              <p class="text-xs text-gray-500 italic">Upload foto baru (opsional, max 1 MB)</p>
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

export default {
  components: { saveButton, cancelButton, loading },
  props: { visible: Boolean, staffData: Object, id: String },
  setup(props, { emit }) {
    const store = useStore()
    const nama = ref('')
    const nipm = ref('')
    const email = ref('')
    const status_kepegawaian = ref('')
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
        loading.value = true
        if (!/^\d{18}$/.test(nipm.value)) {
          validNipm.value = false
          return
        } else validNipm.value = true

        await store.dispatch('staff/updateStaff', {
          id: props.id,
          nama: nama.value,
          nipm: nipm.value,
          email: email.value,
          status_kepegawaian: status_kepegawaian.value,
          file: file.value
        })

        closeModal()
        window.location.reload()
      } catch (err) {
        errorMessage.value = err.message
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      if (props.staffData) {
        nama.value = props.staffData.nama || ''
        nipm.value = props.staffData.nipm || ''
        email.value = props.staffData.email || ''
        status_kepegawaian.value = props.staffData.status_kepegawaian || ''
      }
    })

    return { nama, nipm, email, status_kepegawaian, file, loading, errorMessage, handleSubmit, closeModal, handleFileSelect, validNipm }
  }
}
</script>
