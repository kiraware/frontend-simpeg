<template>
  <div class="mt-16 pt-8 px-8  w-full relative  text-gray-900 font-poppins">
    <div class="relative flex flex-col p-6 bg-white shadow rounded-lg mb-4">
      <div class="relative flex flex-row justify-start">
        <p class="font-poppins font-bold text-2xl text-center">Detail Pegawai</p>
        <button @click="goBack" class="ml-[64.5rem] font-medium text-gray-500">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
          <span>Kembali</span>
        </button>
      </div>
      <div class='relative flex pt-6 justify-center items-center'>
        <ul class="flex mx-auto max-w-full w-full grid-cols-9 gap-x-5">
          <li v-for="(item, index) in items" :key="index" class="">
            <div @click="selectTab(item.value)"
              class="relative flex cursor-pointer items-center justify-center rounded-full border bg-white border-gray-300 py-2 px-4 font-semibold text-xs focus:outline-none ease-in-out"
              :class="{ 'text-blue-col': isSelectedTab(item.value), 'border-gray-300': !isSelectedTab(item.value) }">
              <div class="flex items-center">
                <font-awesome-icon :icon="item.icon" class="w-4 h-4" />
              </div>
              <div class="flex items-center pl-1">
                {{ item.label }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <template v-if="selectedTab === 'personalData'">
        <personalData v-if="userData !== null" :userData="userData" />
      </template>
      <template v-else-if="selectedTab === 'personalDocument'">
        <personalDocument v-if="documentData !== null" :documentData="documentData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'position'">
        <positions v-if="positionData !== null" :positionData="positionData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'education'">
        <educations v-if="educationData !== null" :educationData="educationData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'training'">
        <trainings v-if="trainingData !== null" :trainingData="trainingData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'title'">
        <titles v-if="titlesData !== null" :titlesData="titlesData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'family'">
        <families v-if="familyData !== null" :familyData="familyData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'achievement'">
        <achievements v-if="achievementData !== null" :achievementData="achievementData" :id="id" />
      </template>
      <template v-else-if="selectedTab === 'performance'">
        <performances v-if="performanceData !== null" :performanceData="performanceData" :id="id" />
      </template>
    </div>
    <!-- Render selected tab data -->
    <!-- Add more templates for other tabs as needed -->

  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Adjust the path as needed
import axios from 'axios';
import personalData from './Detail/personalData.vue';
import personalDocument from './Detail/document.vue';
import positions from './Detail/position.vue';
import educations from './Detail/education.vue';
import trainings from './Detail/training.vue';
import titles from './Detail/title.vue';
import families from './Detail/family.vue';
import achievements from './Detail/achievement.vue';
import performances from './Detail/performance.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// Import other child components as needed

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    personalData,
    personalDocument,
    positions,
    educations,
    trainings,
    titles,
    families,
    achievements,
    performances
    // Register other child components here
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const items = ref([
      { icon: ['fas', 'user'], label: 'Data Diri', value: 'personalData' },
      { icon: ['fas', 'folder-open'], label: 'Dokumen', value: 'personalDocument' },
      { icon: ['fas', 'bookmark'], label: 'Kepangkatan', value: 'position' },
      { icon: ['fas', 'graduation-cap'], label: 'Pendidikan', value: 'education' },
      { icon: ['fas', 'clipboard-check'], label: 'Pelatihan', value: 'training' },
      { icon: ['fas', 'briefcase'], label: 'Jabatan', value: 'title' },
      { icon: ['fas', 'people-roof'], label: 'Keluarga', value: 'family' },
      { icon: ['fas', 'award'], label: 'Penghargaan', value: 'achievement' },
      { icon: ['fas', 'chart-line'], label: 'Kinerja', value: 'performance' },
    ]);

    const selectedTab = ref('');
    const userData = ref(null);
    const documentData = ref(null);
    const positionData = ref(null);
    const educationData = ref(null);
    const trainingData = ref(null);
    const titlesData = ref(null);
    const familyData = ref(null);
    const achievementData = ref(null);
    const performanceData = ref(null);

    const fetchUserData = async () => {
      try {
        if (selectedTab.value === 'personalData') {
          const response = await axios.get(`users/${props.id}`);
          userData.value = response.data.user;
        } else
          if (selectedTab.value === 'personalDocument') {
            const response = await axios.get(`documents/${props.id}`);
            documentData.value = response.data.documents;
          } else
            if (selectedTab.value === 'position') {
              const response = await axios.get(`positions/${props.id}`);
              positionData.value = response.data.positions;
            } else
              if (selectedTab.value === 'education') {
                const response = await axios.get(`educations/${props.id}`);
                educationData.value = response.data.educations;
              } else
                if (selectedTab.value === 'training') {
                  const response = await axios.get(`trainings/${props.id}`);
                  trainingData.value = response.data.trainings;
                } else
                  if (selectedTab.value === 'title') {
                    const response = await axios.get(`titles/${props.id}`);
                    titlesData.value = response.data.titles;
                  } else
                    if (selectedTab.value === 'family') {
                      const response = await axios.get(`families/${props.id}`);
                      familyData.value = response.data.families;
                    } else
                      if (selectedTab.value === 'achievement') {
                        const response = await axios.get(`achievements/${props.id}`);
                        achievementData.value = response.data.achievements;
                      } else
                        if (selectedTab.value === 'performance') {
                          const response = await axios.get(`performances/${props.id}`);
                          performanceData.value = response.data.performances;
                        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const selectTab = (tabValue) => {
      selectedTab.value = tabValue;
      sessionStorage.setItem('selectedTab', tabValue);
      fetchUserData();
    };

    const isSelectedTab = (tabValue) => selectedTab.value === tabValue;

    watch(selectedTab, fetchUserData);
    onMounted(() => {
      const storedTab = sessionStorage.getItem('selectedTab');
      if (storedTab && items.value.some(item => item.value === storedTab)) {
        selectedTab.value = storedTab;
      } else {
        selectedTab.value = 'personalData'; // Default to personalData if no stored tab or invalid tab
      }
      fetchUserData();
    });

    
    function goBack() {
            router.go(-1);
        }

    return {
      items,
      selectedTab,
      userData,
      documentData,
      positionData,
      educationData,
      trainingData,
      titlesData,
      familyData,
      achievementData,
      performanceData,
      selectTab,
      isSelectedTab,
      goBack,
    };
  },
};
</script>

<style scoped>
/* Your styles */
</style>
