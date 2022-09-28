import faker from "faker";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

const SLA = 10;
const branches = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];

const data: ChartData<"bar"> = {
  labels: branches,
  datasets: [
    {
      data: branches.map(() => faker.datatype.number({ min: 3, max: 12 })),
      backgroundColor: (ctx) => ((ctx.raw as number) > SLA ? "rgb(222, 20, 0)" : "rgb(124, 222, 13)"),
    },
  ],
};

const options: ChartOptions<"bar"> = {
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  elements: {
    bar: {},
  },
  responsive: true,
  scales: {
    y: {
      reverse: true,
      beginAtZero: true,
      ticks: {
        font: {
          size: 8,
        },
      },
    },
    x: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          xMin: 10,
          xMax: 10,
          borderColor: "rgb(188, 158, 103)",
          borderWidth: 2,
        },
        label1: {
          type: "label",
          xMin: 10,
          yMin: 1.5,
          content: "SLA",
          position: "start",
          font: {
            size: 8,
          },
        },
      },
    },
  },
};

const HorizontalBarChartWithSLA = () => {
  return <Bar data={data} options={options} />;
};

export default HorizontalBarChartWithSLA;
