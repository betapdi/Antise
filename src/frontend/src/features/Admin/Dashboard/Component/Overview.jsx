import React from "react";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import adminApi from "../../../../api/adminApi";

ChartJS.register(ArcElement, Tooltip, Legend);

function Overview() {
  const [stats, setStats] = useState([]);
  const [roleData, setRoleData] = useState({ labels: [], data: [] });
  const [organizationData, setOrganizationData] = useState({
    labels: [],
    data: [],
  });
  useEffect(() => {
    const fetchStat = async () => {
      try {
        const response = await adminApi.getWebStats();
        const stat = response.data;

        // Update the stats array dynamically
        const updatedStats = [
          { label: "Number of Applications", value: stat.applications || "0" },
          {
            label: "Number of Pending Companies",
            value: stat.pendingCompanies || "0",
          },
          { label: "Number of Active Jobs", value: stat.jobs || "0" },
        ];

        setStats(updatedStats);
        const roleLabels = stat.roleCount
          .filter((item) => item.first !== "admin")
          .map((item) => item.first);

        console.log(roleLabels);
        const roleValues = stat.roleCount
          .filter((item) => item.first !== "admin")
          .map((item) => item.second);

        const organizationLabels = stat.organizationTypeCount.map(
          (item) => item.first
        );
        const organizationValues = stat.organizationTypeCount.map(
          (item) => item.second
        );
        setRoleData({ labels: roleLabels, data: roleValues });
        setOrganizationData({
          labels: organizationLabels,
          data: organizationValues,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStat();
  }, []);

  // Data for the pie chart
  const pieCompanyType = {
    labels: organizationData.labels,
    datasets: [
      {
        label: "Company Types",
        data: organizationData.data, // Example data (replace with your data)
        backgroundColor: [
          "#4F46E5",
          "#10B981", 
          "#F59E0B", 
          "#EF4444", 
          "#6366F1", 
        ],
        borderWidth: 1,
      },
    ],
  };
  const pieRole = {
    labels: roleData.labels,
    datasets: [
      {
        label: "Company Types",
        data: roleData.data, // Example data (replace with your data)
        backgroundColor: ["#4F46E5", "#10B981"],
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
          <h3 className="text-lg font-medium mb-4">Role Distribution</h3>
          <Pie data={pieRole} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
