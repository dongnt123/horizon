"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: { accounts: Account[] }) => {

  const accountNames = accounts.map((account) => account.name);
  const balances = accounts.map((account) => account.currentBalance);

  const chartData = {
    datasets: [{
      label: "Banks",
      data: balances,
      backgroundColor: ["#0747B6", "2265D8", "#2F91FA"]
    }],
    labels: accountNames
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