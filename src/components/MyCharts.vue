<template>
    <q-card>
        <q-card-section>
            <div>
                {{ title }}
            </div>
            <div class="chart-container">
                <canvas ref="chartCanvas"></canvas>
            </div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat dense label="Refresh" @click="refreshChart" color="primary" />
        </q-card-actions>
    </q-card>
</template>

<script>
import { Chart, registerables } from 'chart.js';

// Register Chart.js components globally
Chart.register(...registerables);

export default {
    name: "MyChart",
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartOptions: {
            type: Object,
            default: () => ({}),
        },
        title: {
            type: String,
            default: "My Chart",
        },
    },
    data() {
        return {
            chartInstance: null,
        };
    },
    mounted() {
        this.initializeChart();
    },
    methods: {
        initializeChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy(); // Destroy the previous chart instance
            }
            this.chartInstance = new Chart(this.$refs.chartCanvas, {
                type: this.chartData.type,
                data: this.chartData.data,
                options: this.chartOptions,
            });
        },
        refreshChart() {
            this.initializeChart(); // Re-render the chart when refreshing
        },
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    height: 300px;
    width: 100%;
}
</style>
