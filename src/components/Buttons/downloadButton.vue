<template>
  <button @click="downloadFile" class="py-2 px-4 w-[4.5rem] bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-400 text-white transition ease-in duration-200 text-center text-xs font-semibold font-poppins shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Lihat</button>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    downloadFile() {
      // Create an anchor element to initiate download
      const link = document.createElement('a');
      link.href = `https://api-pdmsleman.umy.ac.id/${this.fileUrl}`;
      link.setAttribute('download', this.fileUrl); // Set the download attribute
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>
