import faker from "faker";
import type { ChartData, ChartOptions } from "chart.js";
import { Chart } from "react-chartjs-2";

const workingHr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const isPeakHour = (hr: number) => hr > 10 && hr < 15;

const AVERAGE_WAITING_TIME_LINE_CHART = "line" as const;
const BOTTOM_20_LINE_CHART = "line" as const;
const TOP_20_LINE_CHART = "line" as const;
const BAR_CHART = "bar" as const;

const data: ChartData = {
  labels: workingHr.map((label) => label.toString().padStart(2, "0")),
  datasets: [
    {
      type: AVERAGE_WAITING_TIME_LINE_CHART,
      data: workingHr.map((hr) => ({
        x: hr,
        y: faker.datatype.float({ min: isPeakHour(hr) ? 1 : 5, max: isPeakHour(hr) ? 10 : 1, precision: 0.1 }),
        style: "line",
      })),
      label: "Average Waiting Time",
      borderColor: "rgb(124, 222, 13)",
      borderWidth: 1,
      yAxisID: "lineY",
    },
    {
      type: BOTTOM_20_LINE_CHART,
      data: workingHr.map((hr) => ({
        x: hr,
        y: faker.datatype.float({ min: 3, max: 10 }),
        style: "triangleDown",
      })),
      label: "Bottom 20%",
      backgroundColor: "rgb(255, 0, 0)",
      borderDash: [0, 1],
      yAxisID: "lineY",
    },
    {
      type: TOP_20_LINE_CHART,
      data: workingHr.map((hr) => ({
        x: hr,
        y: faker.datatype.float({ min: 0, max: 0.5 }),
        style: "triangleUp",
      })),
      label: "Top 20%",
      backgroundColor: "rgb(64, 114, 201)",
      borderDash: [0, 1],
      yAxisID: "lineY",
    },
    {
      type: BAR_CHART,
      data: workingHr.map((hr) => ({
        x: hr,
        y: faker.datatype.number({ min: isPeakHour(hr) ? 100000 : 0, max: isPeakHour(hr) ? 200000 : 100000 }),
        style: "rect",
      })),
      label: "# Txn",
      backgroundColor: "rgb(215, 232, 255)",
      yAxisID: "barY",
    },
  ],
};

interface DataWithStyle {
  x: number;
  y: number;
  style: "triangleUp" | "triangleDown" | "rect" | "line";
}

const options: ChartOptions = {
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.4, // 0.4 for Curve effect, 0 for straight line
    },
    point: {
      pointStyle: (ctx) => {
        const style = (ctx.raw as DataWithStyle).style;
        switch (style) {
          case "triangleUp":
          case "triangleDown":
            return "triangle";
          default:
            return "rect";
        }
      },
      rotation: (ctx) => {
        const style = (ctx.raw as DataWithStyle).style;
        return style === "triangleDown" ? 180 : 0;
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        // align: "end",
        text: "Office Hr",
        font: {
          // size: 12,
          weight: "bold",
        },
      },
    },
    barY: {
      position: "right",
    },
    lineY: {
      position: "left",
      ticks: {
        stepSize: 5,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
    datalabels: {
      font: {
        size: 10,
      },
      clamp: true,
      align: "end",
      offset: 1,
      formatter: (value) => (value.style === "line" ? value.y : null),
    },
  },
};

const AverageWaitingTimeGraph = () => {
  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default AverageWaitingTimeGraph;
