"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("react-apexcharts"),
  {
    ssr: false,
  }
);

export default function CandleChart() {
  const series = [
    {
      data: [
        {
          x: new Date(2024, 0, 1),
          y: [120, 140, 100, 130],
        },
        {
          x: new Date(2024, 0, 2),
          y: [130, 150, 120, 145],
        },
        {
          x: new Date(2024, 0, 3),
          y: [145, 170, 140, 160],
        },
        {
          x: new Date(2024, 0, 4),
          y: [160, 180, 150, 170],
        },
        {
          x: new Date(2024, 0, 5),
          y: [170, 190, 160, 175],
        },
      ],
    },
  ];

  const options: ApexCharts.ApexOptions =
  {
    chart: {
      type: "candlestick",
      height: 350,
    },

    title: {
      text: "Candlestick Chart",
      align: "left",
    },

    xaxis: {
      type: "datetime",
    },

    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
}