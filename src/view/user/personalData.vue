<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">
        Data Diri
      </h1>
    </div>
    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="m-2 ml-auto mr-10">
        <editButton @click="toggleEditProfile(profiles)" class="" />
      </div>
      <div v-if="profiles" class="relative max-w-full font-poppins">
        <dl class="divide-y divide-gray-200">
          <div v-if="profiles && profiles.user" class="relative p-2 grid grid-cols-2 ">
            <dt class="ml-2 text-sm text-black font-semibold">
              Nama Lengkap
            </dt>
            <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
               {{ profiles.user.nama }} 
            </dd>
          </div>
          <div class="relative flex space-x-16">
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Gelar Depan
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.gelar_depan }}
              </dd>
            </div>
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Gelar Belakang
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.gelar_belakang }}
              </dd>
            </div>
          </div>
          <div class="relative flex space-x-16">
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Tempat Lahir
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.tempat_lahir }}
              </dd>
            </div>
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Tanggal Lahir
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.tanggal_lahir }}
              </dd>
            </div>
          </div>
          <div class="relative flex space-x-16">
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Jenis Kelamin
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ formatJenisKelamin(profiles.jenis_kelamin) }}
              </dd>
            </div>
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Agama
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.agama }}
              </dd>
            </div>
          </div>
          <div class="relative p-2 grid grid-cols-2 gap-0">
            <dt class="ml-2 text-sm text-black font-semibold">
              Golongan Darah
            </dt>
            <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
              {{ profiles.golongan_darah }}
            </dd>
          </div>
          <div class="relative p-2 grid grid-cols-2 gap-0">
            <dt class="ml-2 text-sm text-black font-semibold">
              Alamat
            </dt>
            <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
              {{ profiles.alamat }}
            </dd>
          </div>
          <div class="relative flex space-x-16">
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Kelurahan
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.kelurahan }}
              </dd>
            </div>
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Kecamatan
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.kecamatan }}
              </dd>
            </div>
          </div>
          <div class="relative flex space-x-16">
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Kabupaten / Kota
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.kabupaten_kota }}
              </dd>
            </div>
            <div class="relative w-72 p-2 grid grid-cols-2 gap-0">
              <dt class="ml-2 text-sm text-black font-semibold">
                Provinsi
              </dt>
              <dd class="mt-1 text-sm text-gray-900 px-4 col-span-2">
                {{ profiles.provinsi }}
              </dd>
            </div>
          </div>
        </dl>
      </div>
      <div v-else-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <p>Data not available.</p>
      </div>
    </div>
    <EditData v-if="editProfile" @close="editProfile = false" :visible="editProfile" :personalData="selectedData" />
  </div>
</template>

<script>
import EditData from '../../components/Form/User/PersonalData/editData.vue';
import editButton from '../../components/Buttons/editButton.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

export default {
  components:
  {
    EditData,
    editButton,
  },
  setup() {
    const store = useStore();
    const profiles = computed(() => store.state.profiles.profiles);
    const loading = computed(() => store.state.profiles.loading);

    onMounted(() => {
      store.dispatch('fetchProfile').then(() => {
        console.log(profiles.value); // Log the profiles data after it's fetched
      });
    });

    const editProfile = ref(false);
    const selectedData = ref({});

    const toggleEditProfile = (personalData) => {
      selectedData.value = personalData;
      editProfile.value = !editProfile.value;
    };

    const formatJenisKelamin = (jenisKelamin) => {
      if (jenisKelamin) {
        return jenisKelamin.replace(/_/g, '-');
      } else {
        return ''; // or return a default value if jenisKelamin is not defined
      }
    };

    return { profiles, loading, editProfile, selectedData, toggleEditProfile, formatJenisKelamin }
  }
};
</script>
