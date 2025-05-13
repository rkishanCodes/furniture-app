import { useState, useEffect } from "react";
import {
  Calendar,
  ShoppingCart,
  Package,
  Check,
  Info,
  Truck,
  Tag,
} from "lucide-react";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          throw new Error(
            "Authentication token not found. Please login again."
          );
        }

        const response = await fetch("http://localhost:5050/api/orders", {
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

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return <Info className="text-blue-500" />;
      case "PROCESSING":
        return <Package className="text-orange-500" />;
      case "SHIPPED":
        return <Truck className="text-purple-500" />;
      case "DELIVERED":
        return <Check className="text-green-500" />;
      default:
        return <ShoppingCart className="text-gray-500" />;
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
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <div className="flex space-x-2">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
            <ShoppingCart size={16} className="mr-1" />
            <span className="font-medium">{orders.length} Orders</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingCart size={48} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-xl font-medium text-gray-600">
            No orders found
          </h2>
          <p className="mt-2 text-gray-500">
            You haven't placed any orders yet.
          </p>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
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
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          order.status === "PENDING"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "PROCESSING"
                            ? "bg-orange-100 text-orange-800"
                            : order.status === "SHIPPED"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-6 text-right">
                    <div className="text-lg font-bold">
                      ₹{calculateTotal(order.items)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
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
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50">
                                  <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="h-full w-full object-contain object-center"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {item.product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.product.dimensions}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Tag size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm text-gray-500">
                                  {item.product.category}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              ₹{item.price.toFixed(2)}
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
                            ₹{calculateTotal(order.items)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-6 flex justify-between border-t border-gray-200 pt-4">
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
                          <dt className="mr-1">Date:</dt>
                          <dd className="font-medium text-gray-900">
                            {formatDate(order.createdAt)}
                          </dd>
                        </div>
                        <div className="flex mt-1">
                          <dt className="mr-1">Status:</dt>
                          <dd className="font-medium text-gray-900">
                            {order.status}
                          </dd>
                        </div>
                      </dl>
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
