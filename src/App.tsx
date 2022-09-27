import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import * as faker from "faker";
import "./App.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
const labelData = labels.map(() => faker.datatype.number({ min: 0, max: 10 }));

const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labelData,
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: labelData,
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Chart type="bar" data={data} />
    </div>
  );
}

export default App;
