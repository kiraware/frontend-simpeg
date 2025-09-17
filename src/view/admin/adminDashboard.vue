<template>
  <div class="mt-16 pt-8 px-10 lg:px-20 w-full relative xl:px-8 text-gray-900">
    <div class="pb-6">
      <h1 class="font-poppins font-bold text-2xl">
        Assalamualaikum, Admin
      </h1>
    </div>
    <div class="relative flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="relative flex justify-center">
        <p class="font-poppins font-semibold text-2xl text-center">Daftar Pegawai - Guru Muhammadiyah Kabupaten Sleman
        </p>
      </div>
      
      <Charts class="mt-6"/>
    </div>
  </div>
</template>

<script>
import Charts from './Charts/charts.vue'; // Import the Charts component

export default {
  components: {
    Charts, // Register the Charts component
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
