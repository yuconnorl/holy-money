"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 33, 55, 20, 30, 10],
        borderColor: "",
        tension: 0.4,
      },
    ],
  };

  const options = {};

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
