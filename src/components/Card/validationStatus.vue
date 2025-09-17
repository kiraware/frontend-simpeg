<template>
    <span class="py-1 px-2 rounded-full" :class="validationClass">{{ validationText }}</span>
  </template>
  
  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true
      }
    },
    computed: {
      validationText() {
        if (this.status === 'accepted') {
          return 'Diterima';
        } else if (this.status === 'pending') {
          return 'Menunggu';
        } else if (this.status === 'rejected') {
          return 'Ditolak';
        }
      },
      validationClass() {
        if (this.status === 'accepted') {
          return 'bg-green-500/50 text-gray-500';
        } else if (this.status === 'pending') {
          return 'bg-yellow-500/50 text-gray-500';
        } else if (this.status === 'rejected') {
          return 'bg-red-500/50 text-gray-500';
        }
      }
    }
  };
  </script>
  