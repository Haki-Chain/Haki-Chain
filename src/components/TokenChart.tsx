"use client"

import type React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface TokenChartProps {
  className?: string
}

const TokenChart: React.FC<TokenChartProps> = ({ className }) => {
  // Mock data for the token price over time
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const data = {
    labels,
    datasets: [
      {
        label: "HAKI Token Price (USD)",
        data: [1.2, 1.4, 1.3, 1.5, 1.8, 2.1, 2.0, 2.2, 2.3, 2.1, 2.4, 2.34],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Trading Volume ($M)",
        data: [0.3, 0.5, 0.4, 0.6, 0.8, 1.2, 1.0, 1.3, 1.1, 0.9, 1.1, 1.2],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(14, 165, 233)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.parsed.y)
              } else {
                label +=
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 1,
                  }).format(context.parsed.y) + "M"
              }
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          callback: (value: any) => "$" + value,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  }

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  )
}

export default TokenChart

