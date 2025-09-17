<template v-if="visible">
    <div class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
                <loading class="" />
            </div>
            <h1 class="font-bold text-2xl text-center">Edit Sekolah</h1>
            <div v-if="errorMessage" class="mt-2 bg-red-200 text-red-900 p-3 rounded-md">{{ errorMessage }}</div>
            <div class="pt-5 max-h-[86vh] overflow-y-auto">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4 px-4">
                        <div class="relative">
                            <input type="text" id="nama" v-model="nama" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="nama"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nama
                                Sekolah</label>
                        </div>
                        <div class="relative w-[35rem] flex">
                            <input type="text" id="npsn" v-model="npsn" required pattern="[0-9]{8}"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="npsn"
                                pattern="[0-9]{8}" 
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">NPSN</label>
                            <span v-if="npsn && !validNpsn" class="text-red-500 text-sm mt-1">NPSN harus terdiri dari 8 angka</span>
                        </div>
                        <div class="relative">
                            <select v-model="jenjang" required
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                            </select>
                            <label for="jenjang"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': jenjang !== '' }"> Pilih Jenjang Sekolah
                            </label>
                        </div>
                        <div class="relative">
                            <select id="kecamatan" v-model="kecamatan"
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option v-for="district in districts" :key="district.id" :value="district.id">{{
                                    district.name }}</option>
                            </select>
                            <label for="kecamatan"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': kecamatan !== '' }">
                                Pilih Kecamatan
                            </label>
                        </div>
                        <div class="relative">
                            <select id="kelurahan" v-model="kelurahan"
                                class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                <option value="" selected disabled hidden></option>
                                <option v-for="village in villages" :key="village.id" :value="village.id">{{
                                    village.name }}</option>
                            </select>
                            <label for="kelurahan"
                                class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                :class="{ 'floating-label': kelurahan !== '' }">Pilih Kelurahan</label>
                        </div>
                        <div class="relative">
                            <input type="text" id="alamat" v-model="alamat"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="alamat"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Alamat</label>
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
import { ref, onMounted, watch } from 'vue';
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
        schoolData: Object,
        id: String,
    },
    setup(props, { emit }) {
        const store = useStore();
        const nama = ref('');
        const npsn = ref('');
        const jenjang = ref('');
        const kelurahan = ref('');
        const kecamatan = ref('');
        const alamat = ref('');
        const districts = ref([]);
        const villages = ref([]);
        const loading = ref(false);
        const errorMessage = ref('');
        const validNpsn = ref(true); // Added for NPSN validation

        const fetchRegencies = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/34.json`; // Assuming provinsi.value contains the selected province ID
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching regencies:', error);;
            }
        };

        const fetchDistricts = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = `https://emsifa.github.io/api-wilayah-indonesia/api/districts/3404.json`; // Assuming kabupaten_kota.value contains the selected regency ID
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                districts.value = data.map(district => ({ id: district.id, name: district.name }));
                const selectedDistrict = districts.value.find(district => district.name === props.schoolData.kecamatan)
                if (selectedDistrict) {
                    kecamatan.value = selectedDistrict.id;
                }
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        const fetchVillages = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan.value}.json`;
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                villages.value = data.map(village => ({ id: village.id, name: village.name }));
                const selectedVillage = villages.value.find(village => village.name === props.schoolData.kelurahan)
                if (selectedVillage) {
                    kelurahan.value = selectedVillage.id;
                }
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        };

        watch(() => kecamatan.value, (newValue) => {
            fetchVillages(newValue);
        });

        onMounted(async () => {
            fetchRegencies();
            fetchDistricts();
            fetchVillages();
        });

        // Set initial values from props.schoolData
        nama.value = props.schoolData.nama;
        npsn.value = props.schoolData.npsn;
        jenjang.value = props.schoolData.jenjang;
        kecamatan.value = props.schoolData.kecamatan;
        kelurahan.value = props.schoolData.kelurahan;
        alamat.value = props.schoolData.alamat;

        const closeModal = () => {
            emit('close');
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;

                // Validate NPSN format
                const npsnRegex = /^[0-9]{8}$/;
                if (!npsnRegex.test(npsn.value)) {
                    validNpsn.value = false;
                    return;
                }

                // If validation passes, proceed to dispatch action
                await store.dispatch('updateSchools', {
                    id: props.id,
                    nama: nama.value,
                    npsn: npsn.value,
                    jenjang: jenjang.value,
                    kelurahan: villages.value.find(v => v.id === kelurahan.value)?.name || '',
                    kecamatan: districts.value.find(d => d.id === kecamatan.value)?.name || '',
                    alamat: alamat.value,
                });
                closeModal();
                window.location.reload(); // Reload the page (adjust this as per your application flow)
            } catch (error) {
                console.error('Error:', error);
                errorMessage.value = error.message;
            } finally {
                loading.value = false;
            }
        };

        return { nama, npsn, jenjang, kecamatan, districts, kelurahan, villages, alamat, loading, errorMessage, validNpsn, fetchRegencies, fetchDistricts, fetchVillages, handleSubmit, closeModal };
    },
};
</script>

<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>
