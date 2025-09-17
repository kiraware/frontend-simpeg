<template>
    <div class="mt-16 pt-8 px-10 w-full relative text-gray-900">
        <div class="relative mt-4 mx-auto max-w-2xl">
                <div class="relative flex flex-col bg-white p-8 shadow rounded-lg border-solid border-2">
                    <div class="pb-6">
                        <h1 class="font-poppins text-center font-bold text-3xl">
                            Ubah Password
                        </h1>
                    </div>
                    <div class="relative max-w-full">
                        <div class="mt-4 relative flex">
                            <input type="password" id="oldPassword" v-model="oldPassword" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="oldPassword"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password
                                Lama</label>
                        </div>
                        <div class="mt-4 relative flex">
                            <input type="password" id="password" v-model="password" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="password"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password
                                Baru</label>
                        </div>
                        <div class="mt-4 relative flex">
                            <input type="password" id="confirmPassword" v-model="confirmPassword" required
                                class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " />
                            <label for="confirmPassword"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Konfirmasi
                                Password Baru</label>
                        </div>
                    </div>
                    <div class="mt-8 items-center text-center">
                        <saveButton @click="toggleShowConfirmation" />
                    </div>
                </div>
        </div>
        <confirmPassword :visible="showConfirm" @close="closeConfirm" @confirm="handleSubmit" />
    </div>
</template>

<script>
import saveButton from '../../components/Buttons/saveButton.vue';
import confirmPassword from '../../components/Alert/confirmPassword.vue';
import { ref } from 'vue';
import axios from 'axios'; // Add this import
import { useRouter } from 'vue-router';

export default {
    components: {
        saveButton,
        confirmPassword,
    },
    setup() {
        const oldPassword = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const showConfirm = ref(false);
        const router = useRouter();

        const toggleShowConfirmation = () => {
            showConfirm.value = !showConfirm.value;
        };

        const handleSubmit = async () => {
            if (password.value !== confirmPassword.value) {
                alert('Password and Confirm Password do not match!');
                return;
            }

            try {
                const response = await axios.patch('users/forgot-password', {
                    oldPassword: oldPassword.value,
                    password: password.value
                });

                console.log('Response:', response.data);
                router.push('/');
                // Handle success (e.g., show success message, redirect user, etc.)
            } catch (error) {
                console.error('Error:', error.response.data);
                // Handle error (e.g., show error message to the user)
            }
        };

        const closeConfirm = () => {
            showConfirm.value = false;
        };

        return {
            oldPassword,
            password,
            confirmPassword,
            showConfirm,
            handleSubmit,
            closeConfirm,
            toggleShowConfirmation
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
