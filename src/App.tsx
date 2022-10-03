import React from "react";
import HorizontalBarChartWithSLA from "./components/HorizontalBarChartWithSLA";
import AverageWaitingTimeGraph from "./components/AverageWaitingTimeGraph";
import styles from "./App.module.scss";

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
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartAnnotation from "chartjs-plugin-annotation";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartDataLabels,
  ChartAnnotation
);

const App = () => {
  return (
    <div className={styles.app}>
      <h1>React-chartjs-2 Example</h1>
      <div className={styles.horizontalBarChart}>
        <HorizontalBarChartWithSLA />
        <HorizontalBarChartWithSLA />
        <HorizontalBarChartWithSLA />
        <HorizontalBarChartWithSLA />
      </div>
      <div className={styles.averageWaitingTimeGraph}>
        <AverageWaitingTimeGraph />
      </div>
    </div>
  );
};

export default App;
