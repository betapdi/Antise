import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Overview() {
  const stats = [
    { label: "Number of Applications", value: "100" },
    { label: "Number of Pending Companies", value: "100" },
    { label: "Number of Active Jobs", value: "100" },
  ];

  // Data for the pie chart
  const pieCompanyType = {
    labels: ["Technology", "Healthcare", "Finance", "Retail", "Other"],
    datasets: [
      {
        label: "Company Types",
        data: [40, 25, 15, 10, 10], // Example data (replace with your data)
        backgroundColor: [
          "#4F46E5", // Technology
          "#10B981", // Healthcare
          "#F59E0B", // Finance
          "#EF4444", // Retail
          "#6366F1", // Other
        ],
        borderWidth: 1,
      },
    ],
  };
  const pieRole = {
    labels: ["Applicant", "Company"],
    datasets: [
      {
        label: "Company Types",
        data: [40, 25], // Example data (replace with your data)
        backgroundColor: [
          "#4F46E5", 
          "#10B981", 
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      {/* Stats List */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center w-4́́8 h-32"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center mb-6">
        {/* Pie Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">
            Company Types Distribution
          </h3>
          <Pie data={pieCompanyType} options={pieOptions} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">
            Role Distribution
          </h3>
          <Pie data={pieRole} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
