"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

  const chartData = {
    datasets: [{
      label: "Banks",
      data: [1250, 2500, 3750],
      backgroundColor: ["#0747B6", "2265D8", "#2F91FA"]
    }],
    labels: ["Test 1", "Test 2", "Test 3"]
  }

  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  )
}

export default DoughnutChart;