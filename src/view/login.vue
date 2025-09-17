<template>
  <div class="bg-white">
    <div class="flex justify-center h-screen">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <loading />
      </div>
      <div class="hidden bg-gradient-to-r from-green-col to-blue-col lg:block lg:w-2/3">
        <div class="flex items-center justify-center h-full bg-gray-900 bg-opacity-40">
          <img src="../assets/logo muhammadiyah putih.png" class="h-48 w-48" />
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 font-poppins">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700">SimPegMU</h2>
            <p class="mt-3 text-gray-500">Masuk untuk mengakses akun Anda</p>
          </div>

          <div v-if="errorMessage" class="mt-4 bg-red-200 text-red-900 p-3 rounded-md text-xs">
            {{ errorMessage }}
          </div>

          <div class="mt-8">
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="relative">
                <input type="text" required id="nipm" pattern="[0-9]{18}" ref="nipmInput"
                  class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " v-model="nipm" @blur="validateNipm" />
                <label for="nipm"
                  class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nomor
                  Induk Kepegawaian Muhammadiyah</label>
                </div>
                <span v-if="nipmError" class="text-red-500 text-sm mt-1">{{ nipmError }}</span>

              <div class="mt-6 relative">
                <input type="password" required id="password" minlength="8" ref="passwordInput"
                  class="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " v-model="password" @blur="validatePassword" />
                <label for="password"
                  class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                  <button type="button" class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  @click="togglePasswordVisibility">
                  <font-awesome-icon :icon="passwordVisible ? 'eye' : 'eye-slash'" class="text-gray-500 h-5 w-5" />
                </button>
              </div>
              <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
            

              <div class="mt-6">
                <button type="submit" :disabled="formInvalid"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-blue-col hover:bg-blue-300 focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Masuk
                </button>
              </div>
            </form>

            <!-- <p class="mt-6 text-sm text-center text-gray-400">
              Belum memiliki akun?
              <a href="/register"
                class="router-link text-blue-500 focus:outline-none focus:underline hover:underline">Daftar disini</a>.
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import loading from '../components/Alert/loading.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
  components: {
    loading,
    'font-awesome-icon': FontAwesomeIcon,
    
  },
  data() {
    return {
      nipm: '',
      password: '',
      loading: false,
      nipmError: '',
      passwordError: '',
      errorMessage: '',
      passwordVisible: false,
    };
  },
  computed: {
    formInvalid() {
      return this.nipmError || this.passwordError || !this.nipm || !this.password;
    },
  },
  methods: {
    validateNipm() {
      const nipmPattern = /^[0-9]{18}$/;
      if (!this.nipm) {
        this.nipmError = 'NIPM tidak boleh kosong';
      } else if (!nipmPattern.test(this.nipm)) {
        this.nipmError = 'NIPM harus terdiri dari 18 angka';
      } else {
        this.nipmError = '';
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password tidak boleh kosong';
      } else if (this.password.length < 8) {
        this.passwordError = 'Password harus terdiri dari minimal 8 karakter';
      } else {
        this.passwordError = '';
      }
    },
    async handleSubmit() {
      this.validateNipm();
      this.validatePassword();

      if (this.formInvalid) {
        return;
      }

      try {
        this.loading = true;
        const response = await axios.post('login', {
          nipm: this.nipm,
          password: this.password,
        });
        console.log(response);

        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('role', response.data.data.role);

        const role = response.data.data.role;

        if (role === 'USER') {
          router.push('/user');
        } else if (role === 'ADMIN') {
          router.push('/admin');
        } else {
          // Handle other roles or conditions here
          console.error('Unknown role:', role);
        }
      } catch (error) {
        this.errorMessage = 'Akun tidak valid. Silakan periksa NIPM dan kata sandi Anda, lalu coba lagi.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      const passwordInput = this.$refs.passwordInput;
      if (this.passwordVisible) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },
  },
};
</script>