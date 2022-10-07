import faker from "faker";
import type { ChartArea, ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

const SLA = 10;
const branches = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];

const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, overSLA = false) => {
  const gradientRed = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  const gradientBlue = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  gradientRed.addColorStop(0, "rgb(251, 130, 81)");
  gradientRed.addColorStop(1, "rgb(251, 83, 81)");
  gradientBlue.addColorStop(0, "rgb(80, 216, 251)");
  gradientBlue.addColorStop(1, "rgb(77, 92, 225)");
  return overSLA ? gradientRed : gradientBlue;
};

const data: ChartData<"bar"> = {
  labels: branches,
  datasets: [
    {
      data: branches.map(() => faker.datatype.number({ min: 3, max: 12 })),
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (chartArea) return getGradient(ctx, chartArea, (context.raw as number) > SLA);
      },
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
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChartWithSLA;
