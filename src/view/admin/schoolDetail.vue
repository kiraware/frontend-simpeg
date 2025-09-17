<template>
    <div class="mt-16 pt-8 px-10  w-auto relative  text-gray-900 font-poppins">
        <div class="relative flex flex-col p-8 bg-white shadow rounded-lg mb-4">
            <div class="relative flex flex-row justify-start">
                <p class="font-poppins font-bold text-2xl text-center">Detail Sekolah</p>
            </div>
            <div class='relative flex flex-col p-8 justify-start'>
                <div v-if="schools" class="relative flex flex-col bg-white shadow rounded-lg border-solid border-2">
                    <div class="ml-8 mt-4 justify-start">
                        <button @click="goBack" class="font-medium text-gray-500">
                            <font-awesome-icon :icon="['fas', 'angle-left']" />
                            <span>Kembali</span>
                        </button>
                    </div>
                    <div class="relative flex border-b border-gray-200 px-4 py-5">
                        <dl class="divide-y divide-gray-200">
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Nama Sekolah
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ schools.nama }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    NPSN
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ schools.npsn }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Jenjang
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ schools.jenjang }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Alamat
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ schools.alamat }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Kelurahan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ formatText(schools.kelurahan) }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Kecamatan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    {{ formatText(schools.kecamatan) }}
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Kabupaten / Kota
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    Sleman
                                </dd>
                            </div>
                            <div class="py-3 grid grid-cols-3 gap-8 px-6">
                                <dt class="text-sm text-black font-semibold">
                                    Provinsi
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                                    D.I. Yogyakarta
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div v-else-if="loading">
                    <p>Loading...</p>
                </div>
                <div v-else>
                    <p>Data not available.</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Adjust the path as needed
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
//import axios from 'axios';

export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const schools = computed(() => store.state.schools.schoolData);
        const loading = ref(true);

        onMounted(async () => {
            try {
                // Fetch school data by ID
                await store.dispatch('fetchSchoolById', props.id);
                loading.value = false; // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching school by ID:', error);
            }
        });

        function formatText(text) {
            if (!text) return ''; // Handle cases where text is empty or undefined
            return text.toLowerCase().split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        }

        function goBack() {
            router.go(-1);
        }


        return {
            schools,
            loading,
            formatText,
            goBack
        };
    }
};
</script>

<style scoped>
/* Your styles */
</style>