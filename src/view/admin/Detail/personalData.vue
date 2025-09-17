<template>
  <div class="pt-4">
    <div class="flex p-4 bg-white shadow rounded-lg mb-4 border-solid border-2">
      <div v-if="userData">
        <div class="flex flex-row border-b border-gray-200 px-4 py-5">
          <dl class="divide-y divide-gray-200">
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Nama</dt>
              <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                {{ displayData(userData.nama) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">NIPM</dt>
              <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                {{ displayData(userData.nipm) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Tempat, Tanggal Lahir</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.profile.tempat_lahir || !userData.profile.tanggal_lahir}">
                <template v-if="!userData.profile.tempat_lahir && !userData.profile.tanggal_lahir">
                  Data Belum Diisi
                </template>
                <template v-else>
                  {{ displayData(userData.profile.tempat_lahir) }}
                  <span v-if="userData.profile.tempat_lahir && userData.profile.tanggal_lahir">, </span>
                  {{ formatTanggal(userData.profile.tanggal_lahir) }}
                </template>
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Jenis Kelamin</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.profile.jenis_kelamin}">
                {{ displayData(formatJenisKelamin(userData.profile.jenis_kelamin)) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Agama</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.profile.agama}">
                {{ displayData(userData.profile.agama) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Status Kepegawaian</dt>
              <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                {{ displayData(userData.status_kepegawaian) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Jabatan Saat Ini</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.titles[0]?.jabatan}">
                {{ displayData(userData.titles[0]?.jabatan) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Unit Kerja Saat Ini</dt>
              <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                {{ displayData(userData.unit_kerja.nama) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">No. Telp / Hp</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.profile.no_telepon}">
                {{ displayData(userData.profile.no_telepon) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Email</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.email}">
                {{ displayData(userData.email) }}
              </dd>
            </div>
            <div class="py-3 grid grid-cols-3 gap-8 px-6">
              <dt class="text-sm text-black font-semibold">Alamat</dt>
              <dd 
                class="mt-1 text-sm text-gray-900 px-12 col-span-2" 
                :class="{'italic': !userData.profile.alamat}">
                {{ displayData(userData.profile.alamat) }}
              </dd>
            </div>
          </dl>
          <div class="profile-image-container flex justify-center items-center w-48 h-48">
            <img class="rounded-full shadow-md max-w-full max-h-full" :src="userData.img_url" />
          </div>
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
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const loading = ref(true);

    watch(() => props.userData, (newValue) => {
      if (newValue) {
        loading.value = false;
      }
    }, { immediate: true });

    const formatJenisKelamin = (jenisKelamin) => {
      if (jenisKelamin !== null && typeof jenisKelamin !== 'undefined') {
        return jenisKelamin.replace(/_/g, '-');
      } else {
        return ''; // Or handle the null/undefined case as per your requirement
      }
    };

    const displayData = (value) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'Data Belum Diisi';
      }
      return value;
    };
    
    const formatTanggal = (tanggal) => {
      if (!tanggal) {
        return ''; // Mengembalikan string kosong jika null atau undefined
      }
      const date = new Date(tanggal);
      return isNaN(date.getTime()) ? '' : date.toLocaleDateString(); // Tampilkan tanggal dalam format lokal
    };

    return {
      loading, formatJenisKelamin, displayData, formatTanggal
    };
  }
};
</script>

<style scoped>
/* Your component styles */
</style>
