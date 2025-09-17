<template>
    <div v-if="visible"
        class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div
            class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
                <loading class="" />
            </div>
            <h1 class="font-bold ml-6 text-2xl text-center">Edit {{ jenisDokumen }}</h1>
            <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
            <div class="pt-5">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4">
                        <div class="relative w-[22rem] flex-col">
                            <select v-model="jenisDokumen"
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option value="KTP">KTP</option>
                                <option value="NBM">NBM</option>
                                <option value="KK">Kartu Keluarga</option>
                                <option value="PASPOR">PASPOR</option>
                                <option value="NUPTK">NUPTK</option>
                                <option value="NPWP">NPWP</option>
                                <option value="BPJS">BPJS</option>
                            </select>
                            <label for="select"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': jenisDokumen !== '' }"> Pilih Jenis Dokumen
                            </label>
                        </div>
                        <div class="relative">
                            <input type="text" id="noDokumen" v-model="noDokumen"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="floating_outlined"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                ID / No. Dokumen </label>
                        </div>
                        <div>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                                :class="{ 'bg-blue-100': documentData.file_url }">
                                <div class="space-y-1 text-center">
                                    <font-awesome-icon icon="cloud-arrow-up" class="size-24" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer bg-sky-50 hover:bg-sky-200 rounded-md font-bold text-gray-500 hover:text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                            <span>{{ file ? file.name : documentData.file_url ?
        documentData.file_url.split('/').pop() : 'Pilih Dokumen untuk diunggah'
                                                }}</span>
                                            <input id="file-upload" name="file-upload" type="file"
                                                @change="handleFileSelect" class="hidden" ref="fileInput" accept=".pdf"/>
                                        </label>
                                    </div>
                                    <p class="pt-2 text-xs text-gray-500 italic"> Format <strong>.pdf</strong> sampai
                                        dengan 1 MB </p>
                                </div>
                            </div>
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
import loading from '../../../Alert/loading.vue'
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
        documentData: Object,
        id: String// Pass the document data to edit
    },
    setup(props, { emit }) {
        const store = useStore();
        const jenisDokumen = ref('');
        const noDokumen = ref('');
        const file = ref(null);
        const loading = ref(false);
        const errorMessage = ref('');

        jenisDokumen.value = props.documentData.jenis_dokumen;
        noDokumen.value = props.documentData.no_dokumen;
        file.value = null; // Set file to null initially

        const closeModal = () => {
            emit('close');
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                await store.dispatch('updateDocument', {
                    id: props.id,
                    jenisDokumen: jenisDokumen.value,
                    noDokumen: noDokumen.value,
                    file: file.value
                });
                closeModal();
                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                loading.value = false;
            }
        };
        /*    const handleFileSelect = (event) => {
               //file.value = event.target.files[0];
               file.value = event.target.files.length > 0 ? event.target.files[0] : null;
           };
    */
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

        return { jenisDokumen, noDokumen, file, loading, handleSubmit, handleFileSelect, closeModal, errorMessage};
    },
}
</script>

<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>
