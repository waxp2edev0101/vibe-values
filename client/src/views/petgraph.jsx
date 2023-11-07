import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "../font.css";

const labels = ["", "", "", "", ""];


const abbreviateNumber = (value) => {
    if (value === 0) {
      return "0";
    }
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(Math.log10(value) / 3);
    const shortValue = parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2));
    return shortValue + suffixes[suffixNum];
  }

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
        ticks: {
            callback: function (value) {
            return abbreviateNumber(value);
            },
		color: "white"
        },
        grid: {
            display: false,
        },
        },
        x: {
        grid: {
            display: false,
        },
        },
    },
    plugins: {
        legend: {
        display: false,
        },
        tooltip: {
        displayColors: false,
        callbacks: {
            label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
                label += ": ";
            }
            label += abbreviateNumber(context.parsed.y);
            return label;
            },
        },
        },
    },
    };

const PetGraph = (props) => {
    const { pet } = props;
    const data = {
        labels: labels,
        datasets: [
        {
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "#9853ff",
            data: pet.Updates,
            pointHoverBackgroundColor: "transparent",
            pointHoverBorderColor: "transparent",
        },
        ],
    };
    
    return (
        <div style={{ height: "100%", padding: "1vmin" }}>
            <Line data={data} options={options} />
        </div>
    );
    };

export default PetGraph;