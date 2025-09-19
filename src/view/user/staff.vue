<template>
  <div class="mt-16 pt-8 px-6 w-auto relative text-gray-900">
    <div class="pb-6">
      <h1 class="pl-8 font-poppins font-bold text-3xl">Daftar Staff</h1>
    </div>

    <div class="flex flex-col p-8 bg-white shadow rounded-lg mb-4">
      <!-- Tombol tambah -->
      <div class="m-2 ml-auto mr-10">
        <addButton @click="toggleAddStaff" />
      </div>

      <!-- Tabel staff -->
      <div class="px-4 py-4 mx-4 sm:-mx-8 sm:px-8">
        <div class="max-w-screen overflow-x-auto justify-center rounded-lg shadow">
          <table class="max-w-full leading-normal font-poppins">
            <thead>
              <tr>
                <th class="px-2 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">No.</th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">NIPM</th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">Nama</th>
                <th class="px-10 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">Email</th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">Status</th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">Unit Kerja</th>
                <th class="px-14 py-2 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-sky-50">
              <template v-if="staffList.length > 0">
                <tr v-for="(s, index) in staffList" :key="s.id" class="divide-x">
                  <td class="px-2 py-5 text-sm text-center border-b border-gray-200">{{ index + 1 }}</td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">{{ s.nipm }}</td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">{{ s.nama }}</td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">{{ s.email || '-' }}</td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">{{ s.status_kepegawaian }}</td>
                  <td class="px-4 py-2 text-sm text-center border-b border-gray-200">{{ s.unit_kerja?.nama || '-' }}</td>
                  <td class="px-4 py-2 text-sm items-center border-b border-gray-200">
                    <div class="flex flex-row gap-0.5 items-center">
                      <editButton @click="toggleEditStaff(s)" />
                      <deleteButton @click="toggleDeleteStaff(s.id)" />
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7" class="text-center py-4 text-gray-500 font-semibold">
                    Data tidak tersedia
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal add/edit/delete -->
    <addStaff v-if="addStaff" @close="addStaff = false" :visible="addStaff" />
    <editStaff v-if="editStaff" @close="editStaff = false" :visible="editStaff" :staffData="selectedStaff" :id="selectedStaff.id"/>
    <alertConfirmation v-if="deleteStaff" @close="deleteStaff = false" :visible="deleteStaff" @confirm="deleteStaffConfirm" />
  </div>
</template>

<script>
import addButton from '../../components/Buttons/addButton.vue';
import editButton from '../../components/Buttons/editButton.vue';
import deleteButton from '../../components/Buttons/deleteButton.vue';
import addStaff from '../../components/Form/User/Staff/addStaff.vue';
import editStaff from '../../components/Form/User/Staff/editStaff.vue';
import alertConfirmation from '../../components/Alert/alertConfirmation.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { addButton, editButton, deleteButton, addStaff, editStaff, alertConfirmation },
  setup() {
    const store = useStore();
    const staffList = computed(() => store.state.staff.staff);

    onMounted(() => {
      store.dispatch('staff/fetchStaff');
    });

    const addStaff = ref(false);
    const editStaff = ref(false);
    const deleteStaff = ref(false);
    const selectedStaff = ref({});

    const toggleAddStaff = () => { addStaff.value = !addStaff.value; };
    const toggleEditStaff = (staffData) => { selectedStaff.value = staffData; editStaff.value = !editStaff.value; };
    const toggleDeleteStaff = (id) => { selectedStaff.value = { id }; deleteStaff.value = !deleteStaff.value; };

    const deleteStaffConfirm = async () => {
      try {
        await store.dispatch('staff/deleteStaff', selectedStaff.value.id);
        await store.dispatch('staff/fetchStaff');
        deleteStaff.value = false;
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    };

    return { staffList, addStaff, editStaff, deleteStaff, selectedStaff, toggleAddStaff, toggleEditStaff, toggleDeleteStaff, deleteStaffConfirm };
  }
};
</script>
