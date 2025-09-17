<template>
    <div class="mt-16 pt-8 px-8 w-full relative  text-gray-900 font-poppins">
      <div class="relative flex flex-col p-8 bg-white shadow rounded-lg mb-4">
        <div class="relative flex justify-start">
          <p class="font-poppins font-bold text-2xl text-center">Daftar Sekolah</p>
        </div>
        <div class="pt-6 relative flex flex-row space-x-8">
          <div class="relative flex ">
            <div class="flex border-2 rounded-lg border-gray-400">
              <input v-model="filter" type="search" class="px-3 py-2 w-40 text-xs border-transparent " placeholder="Cari">
              <button @click="search" class="flex items-center justify-center text-xs px-4 border-1">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <addButton @click="toggleAddSchools" class="ml-[60rem]" />
          </div>
        </div>
        <div class="pt-4">
          <div class="container mx-auto px-0 py-8 overflow-x-auto">
            <div class="relative flex max-w-full justify-center rounded-xl shadow">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NPSN</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Sekolah</th>
                    <th class="px-6 py-3 text-centert text-xs font-medium text-gray-500 uppercase tracking-wider">Jenjang</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelurahan / Desa
                    </th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kecamatan
                    </th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(school, index) in paginatedSchools" :key="school.id">
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ calculateRowNumber(index) }}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ school.npsn }}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ school.nama }}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ school.jenjang }}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ school.kelurahan }}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">{{ school.kecamatan}}</td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      <div class="flex flex-row justify-center items-center">
                        <detailButton @click="viewSchoolDetails(school.id)" />
                        <editLogoButton @click="toggleEditSch(school)" />
                        <deleteLogoButton @click="toggleDeleteSch(school.id)" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-6 flex justify-between">
              <button @click="prevPage" :disabled="page === 1"
                class="text-gray-900 hover:text-blue-500">Sebelumnya</button>

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
              <button @click="nextPage" :disabled="page === totalPages"
                class="text-gray-900 hover:text-blue-500">Selanjutnya</button>
            </div>
  
          </div>
        </div>
      </div>
      <addSchool v-if="addSch" @close="addSch = false" :visible="addSch" />
      <editSchool v-if="editSch" @close="editSch = false" :visible="editSch" :schoolData="selectedSch"
      :id="selectedSch.id"/>
      <alertConfirmation v-if="deleteSch" @close="deleteSch = false" :visible="deleteSch" @confirm="deleteSchools" />
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import addButton from '../../components/Buttons/addButton.vue';
  import addSchool from '../../components/Form/Admin/School/addSchool.vue';
  import editSchool from '../../components/Form/Admin/School/editSchool.vue';
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
      addSchool,
      editSchool,
      editLogoButton,
      deleteLogoButton,
      detailButton,
      alertConfirmation
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const filter = ref('');
      const addSch = ref(false);
      const editSch = ref(false);
      const deleteSch = ref(false);
      const selectedSch = ref({});
  
      // Use computed instead of ref for reactive properties
      const schoolsPerPage = 10;
      const schools = computed(() => store.state.schools.schools);
      const page = computed(() => store.state.schools.page);
      const totalPages = computed(() => {
          return Math.ceil(filteredSchools.value.length / schoolsPerPage);
        });
      const paginatedSchools = computed(() => {
        const start = (page.value - 1) * schoolsPerPage;
        const end = start + schoolsPerPage;
        return filteredSchools.value.slice(start, end);
      });
  
      const calculateRowNumber = (index) => {
        const start = (page.value - 1) * schoolsPerPage;
        return start + index + 1;
      };
  
      const toggleAddSchools = () => {
        addSch.value = !addSch.value;
      };
  
      const toggleDeleteSch = (id) => {
        selectedSch.value = { id };
        deleteSch.value = !deleteSch.value;
      };

      const toggleEditSch = (schoolData) => {
      selectedSch.value = schoolData;
      editSch.value = !editSch.value;
      };

      const fetchSchools = () => {
        store.dispatch('fetchSchools', page.value);
      };
  
      const deleteSchools = async () => {
        try {
          await store.dispatch('deleteSchools', selectedSch.value.id);
          await store.dispatch('fetchSchools');
          deleteSch.value = false;
        } catch (error) {
          console.error("Error deleting school:", error);
        }
      };
  
      const nextPage = () => {
        if (page.value < totalPages.value) {
          store.dispatch('fetchSchools', page.value + 1);
        }
      };
  
      const prevPage = () => {
        if (page.value > 1) {
          store.dispatch('fetchSchools', page.value - 1);
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
          store.dispatch('fetchSchools', pageNumber); // Fetch users for the new page
        }
      };
  
      const viewSchoolDetails = async (schoolId) => {
        try {
          // Fetch user details by ID
          const schoolData = await store.dispatch('fetchSchoolById', schoolId);
  
          // Programmatic navigation using Vue Router and passing userData as part of route state
          router.push({
            name: 'schoolDetail',
            params: { id: schoolId },
          });
        } catch (error) {
          console.error("Error viewing school detail:", error);
        }
      };
  
      const search = () => {
      store.dispatch('searchSchools', { searchQuery: filter.value, page: 1, size: 10 });
    };

    const filteredSchools = computed(() => {
      return schools.value.filter(school =>
        school.nama.toLowerCase().includes(filter.value.toLowerCase()) ||
        school.npsn.toLowerCase().includes(filter.value.toLowerCase())
      );
    });

      onMounted(fetchSchools);
  
      return { filter, addSch, editSch, deleteSch, selectedSch, schools: filteredSchools, paginatedSchools, page, toggleAddSchools, toggleEditSch, toggleDeleteSch, totalPages, nextPage, prevPage, calculateRowNumber, gotoPage, deleteSchools, viewSchoolDetails, search, displayedPages};
    },
  };
  </script>
  
  <style scoped>
  .floating-label {
    transform: translateY(-120%) scale(0.75);
    top: 1rem;
  }
  </style>