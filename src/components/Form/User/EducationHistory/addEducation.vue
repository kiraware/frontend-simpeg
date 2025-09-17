<template v-if="visible">
    <div
        class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div
            class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
                <loading class="" />
            </div>
            <h1 class="font-bold text-2xl text-center">
                Tambah Riwayat Pendidikan
            </h1>
            <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
            <div class="pt-5">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4">
                        <div class="relative w-[22rem] flex-col">
                            <select v-model="jenjang" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                            <label for="select"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': jenjang !== '' }"> Pilih Jenjang Pendidikan
                            </label>
                        </div>
                        <div class="relative">
                            <input type="text" id="nama" v-model="nama" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="nama"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nama
                                Instansi</label>
                        </div>
                        <div class="relative">
                            <input type="text" id="jurusan" v-model="jurusan"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="jurusan"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Jurusan</label>
                        </div>
                        <div class="relative">
                            <input type="text" id="tahun_lulus" v-model="tahun_lulus" required 
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " 
                                pattern="[0-9]{4}"/>
                            <label for="tahun_lulus"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tahun
                                Lulus</label>
                        </div>
                        <span class="text-gray-500 text-xs italic mt-1 ml-1">Contoh : 2024</span>
                        <div>
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <font-awesome-icon icon="cloud-arrow-up" class="size-24" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer bg-sky-50 hover:bg-sky-200 rounded-md font-bold text-gray-500 hover:text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                            <span class="">{{ file ? file.name : 'Pilih Dokumen Ijazah untuk diunggah'
                                                }}</span>
                                            <input id="file-upload" name="file-upload" type="file"
                                                @change="handleFileSelect" class="hidden" required accept=".pdf">
                                        </label>
                                    </div>
                                    <p class="pt-2 text-xs text-gray-500 italic">
                                        Format <strong>.pdf</strong> sampai dengan 1 MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="relative flex justify-end pt-4 space-x-6">
                            <saveButton type="submit" class="w-20" />
                            <cancelButton  @click="closeModal" class="w-20" />
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
import { ref } from 'vue';
import { useStore } from 'vuex';

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
    const jenjang = ref('');
    const nama = ref('');
    const jurusan = ref('');
    const tahun_lulus = ref('');
    const file = ref(null);
    const loading = ref(false);
    const errorMessage = ref('');

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await store.dispatch('createEducations', { 
            jenjang: jenjang.value,
            nama: nama.value,
            jurusan: jurusan.value,
            tahun_lulus: tahun_lulus.value,
            file: file.value
         });
        closeModal();
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        errorMessage.value = error.message
      } finally {
        loading.value = false;
      }
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile.size > 1 * 1024 * 1024) {
            errorMessage.value = "Ukuran file terlalu besar. Maksimum 1 MB.";
            file.value = null;
        } else {
            errorMessage.value = "";
            file.value = selectedFile;
        }
    };

    return { jenjang, nama, jurusan, tahun_lulus, file, loading, handleSubmit, handleFileSelect, closeModal, errorMessage};
  },
}
</script>

<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>