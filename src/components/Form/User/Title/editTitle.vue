<template v-if="visible">
    <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div
            class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
                <loading class="" />
            </div>
            <h1 class="font-bold text-2xl text-center">
                Edit Riwayat Jabatan
            </h1>
            <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
            <div class="pt-5 max-h-[86vh] overflow-y-auto">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4">
                        <div class="relative">
                            <input type="text" id="jabatan" v-model="jabatan" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="jabatan"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Jabatan</label>
                        </div>
                        <div class="relative">
                            <input type="text" id="unit_kerja" v-model="unit_kerja" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="unit_kerja"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Unit
                                Kerja</label>
                        </div>
                        <div class="relative w-[22rem] flex-col">
                            <input type="date" v-model="tmt" id="tmt" required
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 text-sm rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400" />
                            <label for="tmt"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2  bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': tmt !== '' }">
                                Terhitung Mulai Tanggal (TMT)
                            </label>
                        </div>
                        <div class="relative w-[22rem] flex-col">
                            <input type="date" v-model="tanggal_berakhir" id="tanggal_berakhir" required
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 text-sm rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400" />
                            <label for="tanggal_berakhir"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': tanggal_berakhir !== '' }">
                                Tanggal Akhir
                            </label>
                        </div>
                        <div class="relative">
                            <input type="text" v-model="no_sk" id="no_sk" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="no_sk"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">No.
                                SK</label>
                        </div>
                        <div class="relative w-[22rem] flex-col">
                            <input type="date" v-model="tanggal_sk" id="tanggal_sk"
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 text-sm rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400" />
                            <label for="tanggal_sk"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 tracking-widest bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': tanggal_sk !== '' }">
                                Tanggal SK
                            </label>
                        </div>
                        <div>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" :class="{'bg-blue-100': titleData.file_url }">
                                <div class="space-y-1 text-center">
                                    <font-awesome-icon icon="cloud-arrow-up" class="size-24" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer bg-sky-50 hover:bg-sky-200 rounded-md font-bold text-gray-500 hover:text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                            <span class="">{{ file ? file.name : 'Pilih Dokumen SK untuk diunggah' }}</span>
                                            <input id="file-upload" name="file-upload" type="file" @change="handleFileSelect" class="hidden" required accept=".pdf">
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
        titleData: Object,
        id: String
    },
    setup(props, { emit }) {
        const store = useStore();
        const jabatan = ref('');
        const unit_kerja = ref('');
      //  const tmt = ref('');
        //const tanggal_berakhir = ref('');
        const no_sk = ref('');
        //const tanggal_sk = ref('');
        const file = ref(null);
        const loading = ref(false);
        const errorMessage = ref('');

        jabatan.value = props.titleData.jabatan;
        unit_kerja.value = props.titleData.unit_kerja;
       // tmt.value = props.titleData.tmt;
       const parseTMT = (tmt) => {
            const [day, month, year] = tmt.split(' ');
            const monthMapping = {
                'Januari': '01',
                'Februari': '02',
                'Maret': '03',
                'April': '04',
                'Mei': '05',
                'Juni': '06',
                'Juli': '07',
                'Agustus': '08',
                'September': '09',
                'Oktober': '10',
                'November': '11',
                'Desember': '12'
            };
            return `${year}-${monthMapping[month]}-${day.padStart(2, '0')}`;
        };
        const tmt = ref(props.titleData.tmt ? parseTMT(props.titleData.tmt) : '');
        //tanggal_berakhir.value = props.titleData.tanggal_berakhir;
        const parseTanggalBerakhir = (tanggal_berakhir) => {
            const [day, month, year] = tanggal_berakhir.split(' ');
            const monthMapping = {
                'Januari': '01',
                'Februari': '02',
                'Maret': '03',
                'April': '04',
                'Mei': '05',
                'Juni': '06',
                'Juli': '07',
                'Agustus': '08',
                'September': '09',
                'Oktober': '10',
                'November': '11',
                'Desember': '12'
            };
            return `${year}-${monthMapping[month]}-${day.padStart(2, '0')}`;
        };
        const tanggal_berakhir = ref(props.titleData.tanggal_berakhir ? parseTanggalBerakhir(props.titleData.tanggal_berakhir) : '');
        no_sk.value = props.titleData.no_sk;
       // tanggal_sk.value = props.titleData.tanggal_sk;
       const parseTanggalSK = (tanggal_sk) => {
            const [day, month, year] = tanggal_sk.split(' ');
            const monthMapping = {
                'Januari': '01',
                'Februari': '02',
                'Maret': '03',
                'April': '04',
                'Mei': '05',
                'Juni': '06',
                'Juli': '07',
                'Agustus': '08',
                'September': '09',
                'Oktober': '10',
                'November': '11',
                'Desember': '12'
            };
            return `${year}-${monthMapping[month]}-${day.padStart(2, '0')}`;
        };
        const tanggal_sk = ref(props.titleData.tanggal_sk ? parseTanggalSK(props.titleData.tanggal_sk) : '');
        file.value = null;

        const closeModal = () => {
            emit('close');
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                await store.dispatch('updateTitles', {
                    id: props.id,
                    jabatan: jabatan.value,
                    unit_kerja: unit_kerja.value,
                    tmt: tmt.value,
                    tanggal_berakhir: tanggal_berakhir.value,
                    no_sk: no_sk.value,
                    tanggal_sk: tanggal_sk.value,
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


        return { jabatan, unit_kerja, tmt, tanggal_berakhir, no_sk, tanggal_sk, file, loading, handleSubmit, handleFileSelect, closeModal, errorMessage};
    },
}
</script>

<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>