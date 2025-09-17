<template>
  <div class="mt-16 pt-8 px-8 w-full relative text-gray-900 font-poppins">
    <div class="relative flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <div class="relative flex flex-row justify-start">
        <p class="font-poppins font-bold text-2xl text-center">Daftar Pegawai</p>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
      <div class="pt-6 relative flex flex-row space-x-8">
        <div class="relative w-48 flex-col">
          <select v-model="selectedFilter" class="pt-3 pb-2 block w-full px-2 mt-0 text-xs bg-transparent border-2 rounded-lg appearance-none z-1 
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer border-gray-400">
      <!--       <option value="nama" selected disabled hidden></option> -->
            <option value="status_kepegawaian">Status Kepegawaian</option>
            <option value="unit_kerja">Unit Kerja</option>
          </select>
          <label for="filter"
            class="absolute text-xs duration-300 top-3 z-10 origin-[0] px-2 bg-white text-gray-500 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            :class="{ 'floating-label': selectedFilter !== '' }"> Filter
          </label>
        </div>
        <div class="relative flex ">
          <div class="flex border-2 rounded-lg border-gray-400">
            <input v-model="filter" type="search" class="px-3 py-2 w-40 text-xs border-transparent" placeholder="Cari">
            <button @click="search" class="flex items-center justify-center text-xs px-4 border-1">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
        <div class="flex justify-end">
          <addButton @click="toggleAddEmployee" class="ml-[46rem]" />
        </div>
      </div>
      <div class="pt-4">
        <div class="container mx-auto px-0 py-8 overflow-x-auto">
          <div class="relative flex max-w-full justify-center rounded-xl shadow">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NIPM</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-centert text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                    Kepegawaian</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit
                    Kerja
                  </th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(user, index) in users" :key="user.id">
                  <td class="px-6 py-4 text-center whitespace-nowrap">{{ calculateRowNumber(index) }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap">{{ user.nipm }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap">{{ user.nama }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap">{{ user.status_kepegawaian }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap">{{ user.unit_kerja.nama }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap">
                    <div class="flex flex-row justify-center items-center">
                      <detailButton @click="viewUserDetails(user.id)" />
                      <editLogoButton @click="toggleEditEmp(user)" />
                      <deleteLogoButton @click="toggleDeleteEmp(user.id)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="prevPage" :disabled="page === 1" class="text-gray-900 hover:text-blue-500">
              Sebelumnya
            </button>

            <div class="flex space-x-2">
              <button v-for="pageNumber in displayedPages" :key="pageNumber" 
                @click="gotoPage(pageNumber)"
                :disabled="pageNumber === '...'"
                :class="{ 
                  'bg-blue-500 text-white': pageNumber === page, 
                  'bg-gray-200 text-gray-600 cursor-pointer': pageNumber !== page && pageNumber !== '...' 
                }"
                class="px-3 py-2 rounded-md focus:outline-none">
                {{ pageNumber }}
              </button>
            </div>
            
            <button @click="nextPage" :disabled="page === totalPages" class="text-gray-900 hover:text-blue-500">
              Selanjutnya
            </button>
          </div>

        </div>
      </div>
    </div>
    <addEmployee v-if="addEmp" @close="addEmp = false" :visible="addEmp" />
    <editEmployee v-if="editEmp" @close="editEmp = false" :visible="editEmp" :userData="selectedEmp"
      :id="selectedEmp.id" />
    <alertConfirmation v-if="deleteEmp" @close="deleteEmp = false" :visible="deleteEmp" @confirm="deleteUsers" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import addButton from '../../components/Buttons/addButton.vue';
import addEmployee from '../../components/Form/Admin/Employee/addEmployee.vue';
import editEmployee from '../../components/Form/Admin/Employee/editEmployee.vue';
import editLogoButton from '../../components/Buttons/editLogoButton.vue';
import deleteLogoButton from '../../components/Buttons/deleteLogoButton.vue';
import detailButton from '../../components/Buttons/detailButton.vue';
import alertConfirmation from '../../components/Alert/alertConfirmation.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    addButton,
    addEmployee,
    editEmployee,
    editLogoButton,
    deleteLogoButton,
    detailButton,
    alertConfirmation
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const addEmp = ref(false);
    const editEmp = ref(false);
    const deleteEmp = ref(false);
    const selectedEmp = ref({});
    const selectedFilter = ref('nama' && 'nipm'); // Default to 'nama' (name) filter
    const filter = ref('');
    const errorMessage = ref('');

    // Use computed instead of ref for reactive properties
    const usersPerPage = 10;
    const users = computed(() => store.state.users.users);
    const page = computed(() => store.state.users.page);
    const totalPages = computed(() => store.state.users.totalPages);
    const paginatedUsers = computed(() => {
      const start = (page.value - 1) * usersPerPage;
      const end = start + usersPerPage;
      return users.value.slice(start, end);
    });

    const calculateRowNumber = (index) => {
      const start = (page.value - 1) * usersPerPage;
      return start + index + 1;
    };

    const toggleAddEmployee = () => {
      addEmp.value = !addEmp.value;
    };

    const toggleEditEmp = (userData) => {
      selectedEmp.value = userData;
      editEmp.value = !editEmp.value;
    };

    const toggleDeleteEmp = (id) => {
      selectedEmp.value = { id };
      deleteEmp.value = !deleteEmp.value;
    };

    const fetchUsers = async () => {
      try {
        await store.dispatch('fetchUsers', page.value);
      } catch (error) {
        console.error('Error in fetchUsers:', error.message);
        errorMessage.value = error.message; // Update errorMessage ref with the error message
      }
    };

    const deleteUsers = async () => {
      try {
        await store.dispatch('deleteUsers', selectedEmp.value.id);
        await store.dispatch('fetchUsers');
        deleteEmp.value = false;
      } catch (error) {
        console.error("Error deleting users:", error);
        errorMessage.value = error.message;
      }
    };

    const nextPage = () => {
      if (page.value < totalPages.value) {
        store.dispatch('fetchUsers', page.value + 1);
      }
    };

    const prevPage = () => {
      if (page.value > 1) {
        store.dispatch('fetchUsers', page.value - 1);
      }
    };

    const displayedPages = computed(() => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page.value - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    let pages = [];

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages.value) {
      if (endPage < totalPages.value - 1) {
        pages.push("...");
      }
      pages.push(totalPages.value);
    }

    return pages;
    });

    const gotoPage = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        store.commit('SET_PAGE', pageNumber); // Update the page in Vuex store
        store.dispatch('fetchUsers', pageNumber); // Fetch users for the new page
      }
    };

    const viewUserDetails = async (userId) => {
      try {
        // Fetch user details by ID
        const userData = await store.dispatch('fetchUserById', userId);

        // Programmatic navigation using Vue Router and passing userData as part of route state
        router.push({
          name: 'employeeDetail',
          params: { id: userId },
        });
      } catch (error) {
        console.error("Error viewing user detail:", error);
        errorMessage.value = error.message;
      }
    };

    const search = () => {
      if (!filter.value) {
        console.warn('Please enter a search query.');
        return; // Tidak melakukan apa-apa jika input pencarian kosong
      }
    };

    const filteredUsers = computed(() => {
      if (filter.value) {
        return users.value.filter(user => {
          // Gabungkan semua kolom yang relevan menjadi satu string untuk pencarian
          const searchableFields = [
            user.nipm,
            user.nama,
            user.status_kepegawaian,
            user.unit_kerja?.nama
          ].join(' ').toLowerCase(); // Pastikan semua teks dalam huruf kecil untuk perbandingan
          return searchableFields.includes(filter.value.toLowerCase());
        });
      } else {
        // Return the original users array if filter is not set
        return users.value;
      }
    });

    onMounted(fetchUsers);

    return { filter, addEmp, editEmp, deleteEmp, selectedEmp, users: filteredUsers, paginatedUsers, page, toggleAddEmployee, toggleEditEmp, toggleDeleteEmp, totalPages, nextPage, prevPage, calculateRowNumber, gotoPage, deleteUsers, viewUserDetails, search, errorMessage, selectedFilter, displayedPages};
  },
};
</script>

<style scoped>
.floating-label {
  transform: translateY(-120%) scale(0.75);
  top: 1rem;
}
</style>