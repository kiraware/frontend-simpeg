<template>
    <button class="py-1 px-2 m-2 bg-amber-400 hover:bg-amber-500 focus:ring-amber-300 focus:ring-offset-amber-200 text-white transition ease-in duration-200 text-center text-medium font-semibold font-poppins shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
        <font-awesome-icon icon="fa-solid fa-pen" /></button>
</template>

<script>
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

 export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
 }
</script>