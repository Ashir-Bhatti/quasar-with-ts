<template>
    <q-page>
        <div class="q-pa-md">
            <h4>Bar Chart</h4>
            <my-chart :chart-data="chartData" :chart-options="chartOptions" />
        </div>
        <div class="q-pa-md">
            <h4>Line Chart</h4>
            <my-chart :chart-data="lineChart" :chart-options="chartOptions" />
        </div>
    </q-page>
</template>

<script>
import MyChart from 'src/components/MyCharts.vue';

export default {
    name: "ChartsPage",
    components: {
        MyChart,
    },
    data() {
        return {
            chartData: {
                type: "bar", // Chart type: 'bar', 'line', 'pie', etc.
                data: {
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [
                    {
                        label: "Sales",
                        data: [10, 20, 30, 40, 50],
                        backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#AB47BC",
                        "#FF7043",
                        ],
                        borderColor: "#000000",
                        borderWidth: 1,
                    },
                    ],
                },
            },
            lineChart: {
                type: "line", // Chart type: 'bar', 'line', 'pie', etc.
                data: {
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [
                    {
                        label: "Sales",
                        data: [10, 20, 30, 40, 50],
                        backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#AB47BC",
                        "#FF7043",
                        ],
                        borderColor: "#000000",
                        borderWidth: 1,
                    },
                    ],
                },
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        };
    },
};
</script>
