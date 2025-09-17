<template>
  <div class="relative mt-4 mx-auto max-w-6xl">
    <form @submit.prevent="handleSubmit">
      <div class="relative flex flex-row bg-white p-8 shadow rounded-lg border-solid border-2">
        <div class="relative flex-col p-12 items-center justify-center">
          <!-- Profile photo -->
          <label for="profile-photo" class="cursor-pointer">
            <input type="file" id="profile-photo" class="hidden" @change="handleFileChange" />
            <img v-if="img_url" class="rounded-full shadow-md h-48 w-48 cursor-pointer" :src="img_url" alt="Profile Photo" />
            <div v-else class="rounded-full shadow-md h-48 w-48 bg-gray-300 flex items-center justify-center cursor-pointer">
              <span class="text-gray-500">Upload Photo</span>
            </div>
          </label>
          <!-- Edit button for profile photo -->
          <!-- <button @click="editProfilePhoto" class="mt-2 ml-[3.7rem] text-blue-500 hover:underline focus:outline-none">
            Edit Photo
          </button> -->
        </div>
        <div class="relative ml-8 max-w-full">
          <div class="relative max-w-full font-poppins">
            <!-- Profile data -->
            <dl class="divide-y divide-gray-200">
              <div class="relative p-2 grid grid-cols-2 gap-0">
                <dt class="ml-2 text-sm text-black font-semibold">
                  Nama Lengkap
                </dt>
                <dd class="mt-1 text-sm text-gray-500 px-4 col-span-2">{{ profileData.nama }}</dd>
              </div>
              <div class="relative p-2 grid grid-cols-2 gap-0">
                <dt class="ml-2 text-sm text-black font-semibold">
                  NIPM
                </dt>
                <dd class="mt-1 text-sm text-gray-500 px-4 col-span-2">{{ profileData.nipm }}</dd>
              </div>
              <div class="relative p-2 grid grid-cols-2 gap-0">
                <dt class="ml-2 text-sm text-black font-semibold">
                  Unit Kerja
                </dt>
                <dd class="mt-1 text-sm text-gray-500 px-4 col-span-2">{{ profileData.unit_kerja }}</dd>
              </div>
              <div class="relative p-2 grid grid-cols-2 gap-0">
                <dt class="ml-2 text-sm text-black font-semibold">
                  Status Kepegawaian
                </dt>
                <dd class="mt-1 text-sm text-gray-500 px-4 col-span-2">{{ profileData.status_kepegawaian }}</dd>
              </div>
            </dl>
          </div>
          <!-- Email input -->
          <div class="mt-4 relative flex">
            <input type="email" id="email" v-model="email" required
              class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " />
            <label for="email"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
          </div>
        </div>
        <!-- Save button -->
        <div class="justify-end ml-auto">
          <saveButton type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import saveButton from '../../../components/Buttons/saveButton.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    saveButton,
  },
  props: {
    profileData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const email = ref('');
    const img_url = ref(null);
    const router = useRouter();

    // Populate email if available in profileData
    if (props.profileData && props.profileData.email) {
      email.value = props.profileData.email;
    }

    // Handle file change event
    const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
        img_url.value = event.target.files[0];
      } else {
        img_url.value = null;
      }
    };

    // Handle form submission
    const handleSubmit = async () => {
      try {
        await store.dispatch('updateProfileEmail', {
          email: email.value,
          img: img_url.value,
        });

        // Optionally reload the page or handle success
        // window.location.reload();
        router.push('/user/dashboard');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {
      email,
      img_url,
      handleFileChange,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>
