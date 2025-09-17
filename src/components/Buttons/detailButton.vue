<template>
    <button class="py-1 px-3.5 m-2 bg-sky-400 hover:bg-sky-500 focus:ring-sky-300 focus:ring-offset-sky-200 text-white transition ease-in duration-200 text-center text-medium font-semibold font-poppins shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
        <font-awesome-icon icon="fa-solid fa-info"/></button>
</template>

<script>
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

 export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
 }
</script>