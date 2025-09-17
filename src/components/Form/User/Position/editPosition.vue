<template v-if="visible">
    <div
        class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div
            class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center ">
                <loading class="" />
            </div>
            <h1 class="font-bold text-2xl text-center">
                Edit SK
            </h1>
            <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
            <div class="pt-5">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4">
                        <div class="relative">
                            <input type="text" id="no_sk" v-model="no_sk"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
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
                        <div class="relative w-[22rem] flex-col">
                            <input type="date" v-model="tmt" id="tmt"
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 text-sm rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400" />
                            <label for="tmt"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2  bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': tmt !== '' }">
                                Terhitung Mulai Tanggal (TMT)
                            </label>
                        </div>
                        <div class="relative w-[22rem] flex-col">
                            <select v-model="jenis_sk" class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option value="Pengangkatan Pegawai Tetap">Pengangkatan Pegawai Tetap</option>
                                <option value="Pengangkatan Pegawai Kontrak">Pengangkatan Pegawai Kontrak</option>
                            </select>
                            <label for="select"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': jenis_sk !== '' }"> Pilih Jenis SK
                            </label>
                        </div>
                        <div class="relative">
                            <input type="text" id="gaji_pokok" v-model="gaji_pokok"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="gaji_pokok"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gaji
                                Pokok</label>
                        </div>
                        <span class="text-gray-500 text-xs italic mt-1 ml-1">Tuliskan dalam rupiah. Contoh : 1000000</span>
                        <div>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                                :class="{ 'bg-blue-100': positionData.file_url }">
                                <div class="space-y-1 text-center">
                                    <font-awesome-icon icon="cloud-arrow-up" class="size-24" />
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload"
                                            class="relative cursor-pointer bg-sky-50 hover:bg-sky-200 rounded-md font-bold text-gray-500 hover:text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                            <span class="">{{ file ? file.name : positionData.file_url ?
                positionData.file_url.split('/').pop() : 'Pilih Dokumen SK untuk diunggah' }}</span>
                                            <input id="file-upload" name="file-upload" type="file"
                                                @change="handleFileSelect" class="hidden" accept=".pdf">
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
        positionData: Object,
        id: String
    },
    setup(props, { emit }) {
        const store = useStore();
        const no_sk = ref('');
        //const tanggal_sk = ref('');
        //const tmt = ref('');
        const jenis_sk = ref('');
        const gaji_pokok = ref('');
        const file = ref(null);
        const loading = ref(false);
        const errorMessage = ref('');

        no_sk.value = props.positionData.no_sk;
        //tanggal_sk.value = props.positionData.tanggal_sk;
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
        const tanggal_sk = ref(props.positionData.tanggal_sk ? parseTanggalSK(props.positionData.tanggal_sk) : '');

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
        const tmt = ref(props.positionData.tmt ? parseTMT(props.positionData.tmt) : '');
        // tmt.value = props.positionData.tmt;

        
        jenis_sk.value = props.positionData.jenis_sk;
        gaji_pokok.value = props.positionData.gaji_pokok;
        file.value = null;

        const closeModal = () => {
            emit('close');
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                await store.dispatch('updatePositions', {
                    id: props.id,
                    no_sk: no_sk.value,
                    tanggal_sk: tanggal_sk.value,
                    tmt: tmt.value,
                    jenis_sk: jenis_sk.value,
                    gaji_pokok: gaji_pokok.value,
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

        return { no_sk, tanggal_sk, tmt, jenis_sk, gaji_pokok, file, loading, handleSubmit, handleFileSelect, closeModal, errorMessage};
    },
}
</script>

<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>