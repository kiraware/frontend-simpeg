<template v-if="visible">
    <div
        class="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center font-poppins">
        <div
            class="relative m-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white px-6 p-5 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <h1 class="font-bold ml-6 text-2xl text-center">
                Isi Data Diri Anda
            </h1>
            <div class="pt-5">
                <form @submit.prevent="handleSubmit">
                    <div class="divide-y divide-white space-y-4">
                        <div class="relative">
                            <input type="text" id="nama" v-model="nama"
                                class="block px-2.5 pb-2 pt-4 w-full text-sm bg-gray-200 text-gray-500  rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="" disabled />
                            <label for="nama"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nama
                                Lengkap</label>
                        </div>

                        <div class="relative flex space-x-16 ">
                            <div class="relative w-[22rem] flex flex-col">
                                <input type="text" id="gelar_depan" v-model="gelar_depan"
                                    class="block px-4 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " />
                                <label for="gelar_depan"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gelar
                                    Depan</label>
                            </div>
                            <div class="relative w-[22rem] flex flex-col ">
                                <input type="text" id="gelar_belakang" v-model="gelar_belakang"
                                    class="block px-4 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " />
                                <label for="gelar_belakang"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gelar
                                    Belakang</label>
                            </div>
                        </div>

                        <div class="relative flex space-x-16">
                            <div class="relative w-[22rem] flex flex-col">
                                <input type="text" id="tempat_lahir" v-model="tempat_lahir"
                                    class="block px-4 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1   border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "  required/>
                                <label for="tempat_lahir"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tempat
                                    Lahir</label>
                            </div>
                            <div class="relative w-[22rem] flex-col">
                                <input type="date" v-model="tanggal_lahir" id="tanggal_lahir" required
                                    class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 text-sm rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400" />
                                <label for="tanggal_lahir"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': tanggal_lahir !== '' }">
                                    Tanggal Lahir
                                </label>
                            </div>
                        </div>

                        <div class="relative flex space-x-16">
                            <div class="relative w-[22rem] flex-col">
                                <select id="jenis_kelamin" v-model="jenis_kelamin" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                          focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden></option>
                                    <option value="Laki_Laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                <label for="jenis_kelamin"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': jenis_kelamin !== '' }"> Pilih Jenis Kelamin
                                </label>
                            </div>
                            <div class="relative w-[22rem] flex-col">
                                <select id="golongan_darah" v-model="golongan_darah" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                          focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="O">O</option>
                                    <option value="AB">AB</option>
                                </select>
                                <label for="golongan_darah"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': golongan_darah !== '' }"> Pilih Golongan Darah
                                </label>
                            </div>
                        </div>

                        <div class="relative flex space-x-16">
                            <div class="relative w-[22rem] flex-col">
                                <select id="agama" v-model="agama" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                          focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden></option>
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Katolik">Katolik</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Buddha">Buddha</option>
                                    <option value="Konghucu">Konghucu</option>
                                </select>
                                <label for="agama"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': agama !== '' }"> Pilih Agama
                                </label>
                            </div>
                        </div>

                        <div class="relative flex space-x-16">
                            <div class="relative w-[22rem] flex flex-col">
                                <select id="provinsi" v-model="provinsi" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
        focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden>Select Provinsi</option>
                                    <option v-for="province in provinces" :key="province.id" :value="province.id">{{
                    province.name }}</option>
                                </select>
                                <label for="provinsi"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': provinsi !== '' }">
                                    Pilih Provinsi
                                </label>
                            </div>
                            <div class="relative w-[22rem] flex flex-col">
                                <select id="kabupaten_kota" v-model="kabupaten_kota" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden></option>
                                    <option v-for="regency in regencies" :key="regency.id" :value="regency.id">{{
                    regency.name }}</option>
                                </select>
                                <label for="kabupaten_kota"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': kabupaten_kota !== '' }">
                                    Kabupaten / Kota
                                </label>
                            </div>
                        </div>

                        <div class="relative flex space-x-16">
                            <div class="relative w-[22rem] flex flex-col">
                                <select id="kecamatan" v-model="kecamatan" required class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1  rounded-lg appearance-none z-1 
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
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
                            <div class="relative w-[22rem] flex flex-col">
                                <select id="kelurahan" v-model="kelurahan" required
                                    class="pt-3 pb-2 block w-full px-2 mt-0 bg-transparent border-1 rounded-lg appearance-none z-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
                                    <option value="" selected disabled hidden>Select Kelurahan</option>
                                    <option v-for="village in villages" :key="village.id" :value="village.id">{{
                    village.name }}</option>
                                </select>
                                <label for="kelurahan"
                                    class="absolute text-sm duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    :class="{ 'floating-label': kelurahan !== '' }">Pilih Kelurahan</label>
                            </div>
                        </div>

                        <div class="relative">
                            <input type="text" id="alamat" v-model="alamat" required
                                 class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="alamat"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Alamat</label>
                        </div>


                        <div class="relative flex justify-end pt-4 space-x-6">
                            <saveButton type="submit" />
                            <cancelButton @click="closeModal" />
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
        visible: Boolean,
        personalData: Object,
    },
    setup(props, { emit }) {
        const store = useStore();
        const nama = ref('');
        const gelar_depan = ref('');
        const gelar_belakang = ref('');
        const tempat_lahir = ref('');
        const jenis_kelamin = ref('');
        const golongan_darah = ref('');
        const agama = ref('');
        const alamat = ref('');
        const kelurahan = ref('');  // Use separate refs for local data to avoid confusion with props
        const kecamatan = ref('');
        const kabupaten_kota = ref('');
        const provinsi = ref('');
        const loading = ref(false);

        const provinces = ref([]);
        const regencies = ref([]);
        const districts = ref([]);
        const villages = ref([]);

        nama.value = props.personalData.user.nama;
        gelar_depan.value = props.personalData.gelar_depan;
        gelar_belakang.value = props.personalData.gelar_belakang;
        tempat_lahir.value = props.personalData.tempat_lahir;
        const parseTanggalLahir = (tanggal_lahir) => {
            const [day, month, year] = tanggal_lahir.split(' ');
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
        const tanggal_lahir = ref(props.personalData.tanggal_lahir ? parseTanggalLahir(props.personalData.tanggal_lahir) : '');
        jenis_kelamin.value = props.personalData.jenis_kelamin;
        golongan_darah.value = props.personalData.golongan_darah;
        agama.value = props.personalData.agama;
        alamat.value = props.personalData.alamat;
        kelurahan.value = props.personalData.kelurahan;
        kecamatan.value = props.personalData.kecamatan;
        kabupaten_kota.value = props.personalData.kabupaten_kota;
        provinsi.value = props.personalData.provinsi;

        const closeModal = () => {
            emit('close');
        };

        const fetchProvinces = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = 'https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json';
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                provinces.value = data.map(province => ({ id: province.id, name: province.name }));
                const selectedProvince = provinces.value.find(province => province.name === props.personalData.provinsi)
                if (selectedProvince) {
                    provinsi.value = selectedProvince.id;
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        watch(() => props.personalData.provinsi, (newValue) => {
            provinsi.value = newValue;
        });

        fetchProvinces();


        const fetchRegencies = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinsi.value}.json`;  // Assuming provinsi.value contains the selected province ID
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                regencies.value = data.map(regency => ({ id: regency.id, name: regency.name }));
                const selectedRegencie = regencies.value.find(regency => regency.name === props.personalData.kabupaten_kota)
                if (selectedRegencie) {
                    kabupaten_kota.value = selectedRegencie.id;
                }
            } catch (error) {
                console.error('Error fetching regencies:', error);
            }
        };


        watch(() => provinsi.value, (newValue) => {
            fetchRegencies(newValue);
        });

        fetchRegencies();

        const fetchDistricts = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const apiUrl = `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${kabupaten_kota.value}.json`;  // Assuming kabupaten_kota.value contains the selected regency ID
                const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                districts.value = data.map(district => ({ id: district.id, name: district.name }));
                const selectedDistrict = districts.value.find(district => district.name === props.personalData.kecamatan)
                if (selectedDistrict) {
                    kecamatan.value = selectedDistrict.id;
                }
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        watch(() => kabupaten_kota.value, (newValue) => {
            fetchDistricts(newValue);
        });

        fetchDistricts();

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
                const selectedVillage = villages.value.find(village => village.name === props.personalData.kelurahan)
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

        fetchVillages();

        const handleSubmit = async () => {
            try {
                loading.value = true;
                await store.dispatch('updateProfile', {
                    gelar_depan: gelar_depan.value,
                    gelar_belakang: gelar_belakang.value,
                    tempat_lahir: tempat_lahir.value,
                    tanggal_lahir: tanggal_lahir.value,
                    jenis_kelamin: jenis_kelamin.value,
                    golongan_darah: golongan_darah.value,
                    agama: agama.value,
                    alamat: alamat.value,
                    kelurahan: villages.value.find(v => v.id === kelurahan.value)?.name || '',
                    kecamatan: districts.value.find(d => d.id === kecamatan.value)?.name || '',
                    kabupaten_kota: regencies.value.find(r => r.id === kabupaten_kota.value)?.name || '',
                    provinsi: provinces.value.find(p => p.id === provinsi.value)?.name || '',
                });
                closeModal();
                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                loading.value = false;
            }
        };

        return {
            nama,
            gelar_depan,
            gelar_belakang,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            golongan_darah,
            agama,
            alamat,
            kelurahan,
            villages,
            kecamatan,
            districts,
            kabupaten_kota,
            regencies,
            provinsi,
            provinces,
            fetchProvinces,
            fetchRegencies,
            fetchDistricts,
            fetchVillages,
            loading, handleSubmit, closeModal
        };
    },
}
</script>


<style scoped>
.floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
}
</style>