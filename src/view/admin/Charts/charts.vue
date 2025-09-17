<template>
    <div class="grid grid-cols-2 gap-4 font-poppins">
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-lg text-center font-semibold mb-4">Berdasarkan Jenis Kelamin</h2>
            <canvas id="jenisKelaminChart"></canvas>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-lg text-center font-semibold mb-4">Berdasarkan Status Kepegawaian</h2>
            <canvas id="statusKepegawaianChart"></canvas>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-lg text-center font-semibold mb-4">Berdasarkan Pendidikan Terakhir</h2>
            <canvas id="educationChart"></canvas>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-lg text-center font-semibold mb-4">Berdasarkan Unit Kerja</h2>
            <canvas id="unitKerjaChart"></canvas>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart } from 'chart.js/auto'; // Import Chart.js auto bundle

export default {
    name: 'Charts',
    setup() {
        const userChart = ref(null);
        const educationChart = ref(null);

        const fetchData = async () => {
            try {
                const response = await axios.get('users/count');
                const data = response.data;

                // Create charts
                createJenisKelaminChart(data.userChart.Jenis_Kelamin);
                createUnitKerjaChart(data.userChart.Unit_Kerja);
                createStatusKepegawaianChart(data.userChart.Status_Kepegawaian);
                createEducationChart(data.educationChart);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const createJenisKelaminChart = (data) => {
            const canvas = document.getElementById('jenisKelaminChart');
            if (canvas && canvas.getContext) {
                const ctx = canvas.getContext('2d');
                const total = Object.values(data).reduce((acc, val) => acc + val, 0);
                const percentages = Object.values(data).map(val => ((val / total) * 100).toFixed(2));

                const chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Laki-Laki', 'Perempuan'],
                        datasets: [{
                            data: Object.values(data),
                            backgroundColor: ['#6edabd', '#ffdf4f'],
                        }],
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const label = context.label || '';
                                        if (label) {
                                            const percentage = percentages[context.dataIndex] + '%';
                                            return `${label}: ${context.formattedValue} (${percentage})`;
                                        }
                                        return '';
                                    }
                                }
                            }
                        },
                        aspectRatio: 2,
                    }
                });
                userChart.value = chart;
            }
        };

        const createUnitKerjaChart = (data) => {
            const canvas = document.getElementById('unitKerjaChart');
            if (canvas && canvas.getContext) {
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            // label: 'Unit Kerja',
                            labels: ['SD', 'SMP', 'SMA'],
                            data: Object.values(data),
                            backgroundColor: ['#F9E0A2', '#C58C00', '#F4C145'],
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    generateLabels: function (chart) {
                                        return chart.data.labels.map((label, index) => {
                                            return {
                                                text: label,
                                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                            };
                                        });
                                    },
                                },
                            },
                        },
                    },
                });
            }
        };

        const createStatusKepegawaianChart = (data) => {
            const canvas = document.getElementById('statusKepegawaianChart');
            if (canvas && canvas.getContext) {
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Tetap', 'Tidak Tetap', 'Kontrak'],
                        datasets: [{
                            // label: 'Status Kepegawaian',
                            data: Object.values(data),
                            backgroundColor: ['	#005073', '#107dac', '#189ad3'],
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    generateLabels: function (chart) {
                                        return chart.data.labels.map((label, index) => {
                                            return {
                                                text: label,
                                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                            };
                                        });
                                    },
                                },
                            },
                        },
                    },
                });
            }
        };



        const createEducationChart = (data) => {
            const canvas = document.getElementById('educationChart');
            if (canvas && canvas.getContext) {
                const ctx = canvas.getContext('2d');
                educationChart.value = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['SD', 'SMP', 'SMA', 'S1'],
                        datasets: [{
                            // label: 'Pendidikan Terakhir',
                            data: [
                                data.totalSD,
                                data.totalSMP,
                                data.totalSMA,
                                data.totalS1,
                            ],
                            backgroundColor: ['#123740',
                                '#549aab',
                                '#b0d7e1',
                                '#f6f6f6'],
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    generateLabels: function (chart) {
                                        return chart.data.labels.map((label, index) => {
                                            return {
                                                text: label,
                                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                            };
                                        });
                                    },
                                },
                            },
                        },
                    },
                });
            }
        };

        onMounted(() => {
            fetchData();
        });

        return { userChart, educationChart };
    },
};
</script>

<style>
/* Your styles here */
</style>