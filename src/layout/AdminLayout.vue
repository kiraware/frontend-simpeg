<template>
  <div class="bg-gradient-to-r from-blue-col to-green-col">
    <div>
      <NavbarAdmin  class="bg-gradient-to-r from-blue-col to-green-col"/>
    </div>
    <div class="flex">
      <SidebarAdmin />
      <router-view class="flex-1 bg-gray-50 " />
    </div>
    <div>
      <Footer class="bg-gradient-to-r from-blue-col to-green-col" />
    </div>
  </div>
</template>

<script>
import NavbarAdmin from '../components/Navbar/AdminNavbar.vue';
import SidebarAdmin from '../components/Sidebar/AdminSidebar.vue';
import Footer from '../components/Footer/Footer.vue';

export default {
  components: {
    NavbarAdmin,
    SidebarAdmin,
    Footer,
  },
};
</script>

<style>
/* Add styles for the MainLayout if needed */
</style>