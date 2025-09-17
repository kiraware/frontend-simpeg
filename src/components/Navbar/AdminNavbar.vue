<template>
  <div class=" fixed w-full z-20 top-0 start-0">
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-0 p-3">
      <a class="flex items-center">
        <img src="../../assets/logo muhammadiyah putih.png" alt="Logo" class="w-12 h-12" />
        <div class="">
          <div class="flex items-baseline">
            <span class="pl-3 font-semibold text-2xl font-poppins text-white">SimPegMU</span>
          </div>
          <div class="flex items-baseline">
            <span class="pl-3 font-semibold text-[0.50rem] font-poppins text-white">Sistem Informasi Kepegawaian Pimpinan
              Daerah Muhammadiyah
              Sleman</span>
          </div>
        </div>
      </a>
      <div class="flex items-center space-x-6 md:space-x-0 relative">
        <span class="mr-4 px-4 py-2 text-center font-semibold text-lg font-poppins text-white border-solid border-2 rounded-md">{{ user.nama }}</span>
        <button @click="toggleDropdown" type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0" :aria-expanded="isDropdownOpen" aria-haspopup="true">
          <span class="sr-only">Open user menu</span>
          <img v-if="user.img_url" :src="user.img_url" class="w-12 h-12 rounded-full overflow-hidden" alt="user photo">
          <span v-else class="w-12 h-12 rounded-full bg-gray-400"></span>
        </button>
        <!-- Dropdown menu -->
        <div v-show="isDropdownOpen" class="z-50 absolute right-3 mt-[9rem] font-poppins font-semibold text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl" id="user-dropdown">
          <ul class="w-44 py-2">
           <!--  <li>
              <router-link to="/admin/adminDashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                <font-awesome-icon icon="fa-solid fa-bars" />
                <span class="ml-2">Dashboard</span>
              </router-link>
            </li>-->
            <li>
              <router-link to="/admin/change-admin-password" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                <font-awesome-icon icon="fa-solid fa-key" />
                <span class="ml-2">Ubah Password</span></router-link>
            </li> 
            <li @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
              <span class="ml-2">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        id: '',
        nama: '',
        img_url: '',
      },
      isDropdownOpen: false,
    };
  },
  async created() {
    try {
      const response = await axios.get('users/navbar');
      const userData = response.data.user;
      this.user.id = userData.id;
      this.user.nama = userData.nama;
      this.user.img_url = userData.img_url || ''; // Use the provided img_url or fallback to an empty string
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },  
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    goToUserProfile(userId) {
      this.$router.push({ name: 'adminProfile', params: { id: userId } });
    },
    logout() {

      axios.delete('logout') // Assuming '/logout' is the endpoint to logout
        .then(() => {
          // Clear user data and redirect to the home page
          this.user = {
            nama: '',
            img_url: '',
          };
          localStorage.removeItem('token');
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
