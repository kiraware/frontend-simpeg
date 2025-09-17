<template>
  <div class="mt-16 pt-8 px-10 lg:px-20 w-full relative xl:px-20 text-gray-900">
    <div class="pb-6">
      <h1 class="font-poppins font-bold text-3xl">
        Profil
      </h1>
    </div>
    <div v-if="edit">
      <editProfile :profileData="userData" @close="edit = false"/>
    </div>
    <div v-else>
      <div v-if="!edit && userData !== null" class="relative flex flex-col p-8 bg-white shadow rounded-lg mb-4 ">
        <div class="relative flex mx-auto w-64 text-center ">
          <div class="relative w-64">
            <img class="w-64 h-64 rounded-full" :src="getUserImage" alt="" />
          </div>
        </div>
        <div class="relative mt-4 mx-auto max-w-2xl font-poppins">
          <div class="relative flex flex-col bg-white shadow rounded-lg border-solid border-2">
            <div class="relative flex px-4 py-5">
              <dl class="divide-y">
                <div class="py-3 grid grid-cols-3 gap-8 px-6">
                  <dt class="text-sm text-black font-semibold">
                    Nama Lengkap
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                    {{ userData.nama }}
                  </dd>
                </div>
                <div class="py-3 grid grid-cols-3 gap-8 px-6">
                  <dt class="text-sm text-black font-semibold">
                    NIPM
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                    {{ userData.nipm }}
                  </dd>
                </div>
                <div class="py-3 grid grid-cols-3 gap-8 px-6">
                  <dt class="text-sm text-black font-semibold">
                    Unit Kerja
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                    {{ userData.unit_kerja }}
                  </dd>
                </div>
                <div class="py-3 grid grid-cols-3 gap-8 px-6">
                  <dt class="text-sm text-black font-semibold">
                    Status Kepegawaian
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                    {{ userData.status_kepegawaian }}
                  </dd>
                </div>
                <div class="py-3 grid grid-cols-3 gap-8 px-6">
                  <dt class="text-sm text-black font-semibold">
                    Email
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 px-12 col-span-2">
                    {{ userData.email ? userData.email : 'Belum diatur' }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div class="justify-end ml-auto">
          <editButton @click="edit = true"/>
        </div>
      </div>
      <div v-else>
        Loading... <!-- or any loading indicator -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import editButton from '../../../components/Buttons/editButton.vue';
import editProfile from './editProfile.vue';
import defaultImage from '../../../assets/profile-person.webp';

export default {
  components: {
    editButton,
    editProfile,
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const store = useStore(); // Accessing Vuex store
    const edit = ref(false);
    const userData = ref(null);

    const getUserImage = computed(() => {
      // Use default image if user's image URL is not available
      return userData.value && userData.value.img_url ? `https://api-pdmsleman.umy.ac.id/${userData.value.img_url}` : defaultImage;
    });

    const fetchUserData = async () => {
      try {
        const response = await store.dispatch('fetchProfileById', props.id);
        const userDataResponse = response.data;
        userData.value = {
          id: userDataResponse.id,
          nama: userDataResponse.nama,
          nipm: userDataResponse.nipm,
          status_kepegawaian: userDataResponse.status_kepegawaian,
          unit_kerja: userDataResponse.unit_kerja.nama,
          img_url: userDataResponse.img_url,
          email: userDataResponse.email,
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error here, e.g., show error message
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    const goToEditProfile = (profileData) => {
      edit.value = !edit.value;
      userData.value = profileData;
    };

    return {
      edit,
      userData,
      getUserImage,
      goToEditProfile,
    };
  },
};
</script>

<style scoped>
.floating-label {
  transform: translateY(-120%) scale(0.75);
  top: 1rem;
}
</style>