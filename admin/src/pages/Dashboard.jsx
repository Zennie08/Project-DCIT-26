import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
    salesOverTime: [],
    orderCategories: [], // Added for Pie chart
  });

  const fetchDashboardStats = async () => {
    try {
      // Fetch orders
      const ordersResponse = await axios.post(
        `${backendUrl}/api/order/list`, // Orders API
        {},
        { headers: { token } }
      );

      if (ordersResponse.data.success) {
        const orders = ordersResponse.data.orders;
        const totalOrders = orders.length;
        const totalSales = orders.reduce((total, order) => total + order.amount, 0);

        // Prepare sales over time (monthly sales in this case)
        const salesOverTime = orders.reduce((acc, order) => {
          const month = new Date(order.createdAt).getMonth(); // Extract month from order date
          acc[month] = acc[month] ? acc[month] + order.amount : order.amount;
          return acc;
        }, Array(12).fill(0)); // Initialize an array for 12 months

        setStats((prevStats) => ({
          ...prevStats,
          totalOrders,
          totalSales,
          salesOverTime,
        }));
      } else {
        toast.error(ordersResponse.data.message);
      }

      // Fetch products
      const productsResponse = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });

      if (productsResponse.data.success) {
        const totalProducts = productsResponse.data.products.length;

        // Simulate product category distribution for Pie chart (use real data if available)
        const orderCategories = productsResponse.data.products.reduce((acc, product) => {
          const category = product.category || 'Other'; // Assuming product has a 'category' field
          acc[category] = acc[category] ? acc[category] + 1 : 1;
          return acc;
        }, {});

        setStats((prevStats) => ({
          ...prevStats,
          totalProducts,
          orderCategories: Object.entries(orderCategories).map(([key, value]) => ({
            category: key,
            count: value,
          })),
        }));
      } else {
        toast.error(productsResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch dashboard stats.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
    }
  }, [token]);

  // Chart data for Bar Chart (Total Orders, Products, Sales)
  const barChartData = {
    labels: ['Orders', 'Products', 'Sales'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.totalOrders, stats.totalProducts, stats.totalSales],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
        borderColor: ['#388E3C', '#F57C00', '#1976D2'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for Bar Chart
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Dashboard Statistics',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === 'Statistics' && context.raw !== undefined) {
              return context.raw.toLocaleString(); // Format number with commas
            }
            return context.raw;
          },
        },
      },
    },
  };

  // Line Chart for Sales Over Time
  const lineChartData = {
    labels: Array.from({ length: 12 }, (_, index) => `Month ${index + 1}`), // Month labels
    datasets: [
      {
        label: 'Sales Over Time',
        data: stats.salesOverTime,
        fill: false,
        borderColor: '#FF5733',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  // Pie Chart for Product Categories Distribution
  const pieChartData = {
    labels: stats.orderCategories.map((category) => category.category),
    datasets: [
      {
        label: 'Product Categories',
        data: stats.orderCategories.map((category) => category.count),
        backgroundColor: ['#FFEB3B', '#FF9800', '#8BC34A', '#2196F3'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Categories Distribution',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} products`, // Formatting tooltip
        },
      },
    },
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <main className="flex-1 p-2 bg-gray-100">
          {/* Example Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Total Orders:</h3>
              <p className="mt-2 text-2xl">{stats.totalOrders}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Total Products:</h3>
              <p className="mt-2 text-2xl">{stats.totalProducts}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Total Sales:</h3>
              <p className="mt-2 text-2xl">{currency} {stats.totalSales.toFixed(2)}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-5">
              <h3 className="text-lg font-semibold">Dashboard Stats Chart</h3>
              <Bar data={barChartData} options={chartOptions} />
            </div>

            {/* Line Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-5">
              <h3 className="text-lg font-semibold">Sales Over Time</h3>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-5">
              <h3 className="text-lg font-semibold">Product Categories Distribution</h3>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
