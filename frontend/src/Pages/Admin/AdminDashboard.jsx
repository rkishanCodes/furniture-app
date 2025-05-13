import { useState, useEffect } from "react";
import {
  Calendar,
  ShoppingCart,
  Package,
  Check,
  Info,
  Truck,
  Tag,
  XCircle,
  AlertTriangle,
  Search,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const token = user?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch("http://localhost:5050/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch orders: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch(
        `http://localhost:5050/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update order: ${response.status} ${response.statusText}`
        );
      }

      // Update local state to reflect the change
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(`Failed to update order status: ${err.message}`);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return <Info className="text-blue-500" />;
      case "SHIPPED":
        return <Truck className="text-purple-500" />;
      case "DELIVERED":
        return <Check className="text-green-500" />;
      case "CANCELLED":
        return <XCircle className="text-red-500" />;
      default:
        return <ShoppingCart className="text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Status filter
    const statusMatch = statusFilter === "ALL" || order.status === statusFilter;

    // Search filter
    const searchMatch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.items &&
        order.items.some(
          (item) =>
            item.product &&
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    return statusMatch && searchMatch;
  });

  const countOrdersByStatus = (status) => {
    return orders.filter((order) =>
      status === "ALL" ? true : order.status === status
    ).length;
  };

  const stats = [
    {
      name: "All Orders",
      count: countOrdersByStatus("ALL"),
      status: "ALL",
      icon: <ShoppingCart size={18} />,
      color: "bg-gray-100 text-gray-800",
    },
    {
      name: "Pending",
      count: countOrdersByStatus("PENDING"),
      status: "PENDING",
      icon: <Info size={18} />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Shipped",
      count: countOrdersByStatus("SHIPPED"),
      status: "SHIPPED",
      icon: <Truck size={18} />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Delivered",
      count: countOrdersByStatus("DELIVERED"),
      status: "DELIVERED",
      icon: <Check size={18} />,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Cancelled",
      count: countOrdersByStatus("CANCELLED"),
      status: "CANCELLED",
      icon: <XCircle size={18} />,
      color: "bg-red-100 text-red-800",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => {
            setError(null);
            fetchOrders();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center">
          <button
            onClick={fetchOrders}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <button
            key={stat.name}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              statusFilter === stat.status
                ? "ring-2 ring-blue-500 border-blue-500"
                : "border-gray-200"
            }`}
            onClick={() => setStatusFilter(stat.status)}
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {stat.name}
                </div>
                <div className="text-lg font-semibold">{stat.count}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by order ID, customer ID, or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <AlertTriangle size={48} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-xl font-medium text-gray-600">
            No orders found
          </h2>
          <p className="mt-2 text-gray-500">
            Try changing your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <div className="ml-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        Order #{order.id.substring(0, 8)}
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Customer ID: {order.userId.substring(0, 12)}...
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-6 text-right">
                    <div className="text-lg font-bold">
                      ${order.items && calculateTotal(order.items)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <div
                    className="transform transition-transform duration-200"
                    style={{
                      transform:
                        expandedOrder === order.id
                          ? "rotate(180deg)"
                          : "rotate(0)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items &&
                          order.items.map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50">
                                    <img
                                      src={item.product?.imageUrl}
                                      alt={item.product?.name || "Product"}
                                      className="h-full w-full object-contain object-center"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">
                                      {item.product?.name || "Product Name"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {item.product?.dimensions ||
                                        "No dimensions"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Tag
                                    size={14}
                                    className="text-gray-400 mr-1"
                                  />
                                  <span className="text-sm text-gray-500">
                                    {item.product?.category || "No category"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-center">
                                <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                ${item.price?.toFixed(2) || "0.00"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan="3"
                            className="px-4 py-4 text-right text-sm font-medium text-gray-900"
                          >
                            Order Total:
                          </td>
                          <td className="px-4 py-4 text-right text-lg font-bold text-gray-900">
                            ${order.items && calculateTotal(order.items)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row justify-between border-t border-gray-200 pt-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Order Details
                      </h3>
                      <dl className="mt-2 text-sm text-gray-500">
                        <div className="flex mt-1">
                          <dt className="mr-1">Order ID:</dt>
                          <dd className="font-medium text-gray-900">
                            {order.id}
                          </dd>
                        </div>
                        <div className="flex mt-1">
                          <dt className="mr-1">Customer ID:</dt>
                          <dd className="font-medium text-gray-900">
                            {order.userId}
                          </dd>
                        </div>
                        <div className="flex mt-1">
                          <dt className="mr-1">Date:</dt>
                          <dd className="font-medium text-gray-900">
                            {formatDate(order.createdAt)}
                          </dd>
                        </div>
                        <div className="flex mt-1">
                          <dt className="mr-1">Last Updated:</dt>
                          <dd className="font-medium text-gray-900">
                            {formatDate(order.updatedAt)}
                          </dd>
                        </div>
                        <div className="flex mt-1">
                          <dt className="mr-1">Current Status:</dt>
                          <dd
                            className={`font-medium ${
                              order.status === "PENDING"
                                ? "text-blue-600"
                                : order.status === "SHIPPED"
                                ? "text-purple-600"
                                : order.status === "DELIVERED"
                                ? "text-green-600"
                                : order.status === "CANCELLED"
                                ? "text-red-600"
                                : "text-gray-900"
                            }`}
                          >
                            {order.status}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        Update Status
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {updatingOrderId === order.id ? (
                          <div className="flex items-center justify-center p-2">
                            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                            <span className="ml-2 text-sm text-gray-500">
                              Updating...
                            </span>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "PENDING")
                              }
                              disabled={order.status === "PENDING"}
                              className={`px-3 py-2 rounded text-xs font-medium ${
                                order.status === "PENDING"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }`}
                            >
                              Set Pending
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "SHIPPED")
                              }
                              disabled={
                                order.status === "SHIPPED" ||
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                              }
                              className={`px-3 py-2 rounded text-xs font-medium ${
                                order.status === "SHIPPED" ||
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                              }`}
                            >
                              Mark Shipped
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "DELIVERED")
                              }
                              disabled={
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED" ||
                                order.status !== "SHIPPED"
                              }
                              className={`px-3 py-2 rounded text-xs font-medium ${
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED" ||
                                order.status !== "SHIPPED"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }`}
                            >
                              Mark Delivered
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, "CANCELLED")
                              }
                              disabled={
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                              }
                              className={`px-3 py-2 rounded text-xs font-medium ${
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              }`}
                            >
                              Cancel Order
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
