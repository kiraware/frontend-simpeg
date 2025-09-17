<template>
  <div class="mt-16 pt-8 px-10 lg:px-20 w-full relative xl:px-20 text-gray-900">
    <div class="pb-6">
      <h1 class="font-poppins font-bold text-3xl">
        Assalamualaikum, {{ userData.nama }}
      </h1>
    </div>
    <div class="flex flex-row gap-2 p-8 bg-white shadow rounded-lg mb-4">
      <div class="profile-image-container flex justify-center items-center w-48 h-48">
        <img class="rounded-full shadow-md max-w-full max-h-full" :src="getUserImage" />
      </div>
      <div class="relative py-12 px-4">
        <div v-for="(data, index) in datas" :key="index" class="flex flex-row items-center my-2">
          <div class="relative flex items-center w-56">
            <span class="font-bold">{{ data.label }}</span>
          </div>
          <div class="relative flex items-center w-auto">
            {{ Array.isArray(data.keys) 
              ? data.keys.map(key => 
                  key.includes('tanggal_lahir') 
                  ? formatDate(getProperty(userData, key)) 
                  : getProperty(userData, key)
                ).join(', ')
              : (data.key.includes('tanggal_lahir') 
                ? formatDate(getProperty(userData, data.key)) 
                : getProperty(userData, data.key))
            }}
          </div>
        </div>
        <div class="flex flex-row my-2" v-if="userData.positions && userData.positions.length">
          <span class="relative flex items-center w-56 font-bold">Kepangkatan</span>
          <span class="relative flex items-center w-56">{{ userData.positions[0].no_sk }}</span>
        </div>
        <div class="flex flex-row my-2" v-if="userData.educations && userData.educations.length">
          <span class="relative flex items-center w-56 font-bold">Pendidikan</span>
          <span class="relative flex items-center w-56">{{ userData.educations[0].jenjang }}</span>
        </div>
        <div class="flex flex-row my-2" v-if="userData.titles && userData.titles.length">
          <span class="relative flex items-center w-56 font-bold">Jabatan</span>
          <span class="relative flex items-center w-56">{{ userData.titles[0].jabatan }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import defaultImage from '../../assets/profile-person.webp'; // Import the default image

export default {
  setup() {
    const store = useStore();

    const userData = computed(() => store.state.dashboard.userData);
    const datas = [
      { label: 'Nama', key: 'nama' },
      { label: 'Tempat, Tanggal Lahir', keys: ['profile.tempat_lahir', 'profile.tanggal_lahir'] },
      { label: 'NIPM', key: 'nipm' },
      { label: 'Alamat', key: 'profile.alamat' },
      { label: 'No. HP', key: 'profile.nomor_telepon' },
    ];

    onMounted(() => {
      store.dispatch('fetchUserData');
    });

    // Helper function to access nested properties
    const getProperty = (obj, key) => key.split('.').reduce((o, i) => o && o[i], obj);

    // Helper function to format date to dd/mm/yyyy
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    
    const getUserImage = computed(() => {
      const imageUrl = getProperty(userData.value, 'img_url');
      return userData.value && userData.value.img_url ? `https://api-pdmsleman.umy.ac.id/${userData.value.img_url}` : defaultImage; // Use the imported default image
    });

    return { userData, datas, getProperty, formatDate, getUserImage };
  }
};
</script>
