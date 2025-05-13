import { useState } from "react";
import { Save, Loader, CheckCircle } from "lucide-react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    width: "",
    height: "",
    depth: "",
    price: "",
    imageUrl: "",
    dimensions: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "width" ||
        name === "height" ||
        name === "depth"
          ? parseFloat(value) || value
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the product data for submission
      const productData = {
        ...product,
        price: parseFloat(product.price),
        width: parseInt(product.width),
        height: parseInt(product.height),
        depth: parseInt(product.depth),
      };

      // Get token from localStorage if available
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await fetch("http://localhost:5050/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      // Success!
      setSuccess(true);

      // Reset form after successful submission
      setProduct({
        name: "",
        category: "",
        width: "",
        height: "",
        depth: "",
        price: "",
        imageUrl: "",
        dimensions: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Pre-populate with sample data (for demo purposes)
  const fillSampleData = () => {
    setProduct({
      name: "Floor Lamp",
      category: "Lighting",
      width: 30,
      height: 150,
      depth: 30,
      price: 129.99,
      imageUrl:
        "https://media-hosting.imagekit.io/4e203781a75844a5/lamp%20Background%20Removed.png?Expires=1841674622&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=X~HNGSl8XbnJnWs2yrSvrWsiDZ~BTpUPkRkslhjiAJ6FZTNnATPI8wiNwg~uTIZMggcph2km9-vRJezaDyOKZJLHfCmr5Y7PWip5lNfg~-gTe3kc38mcZQX3Bq~xqeYG3bO3q7ASPoEvcHGxftXxWa1jZin4GBleOmy4UqghPmSHb81jZy6VcVV81a994v3l07AGFEtKURRJz2HRfL3TSOqeTIIInXqpP92FhbEoumUcXXoEcNU0GkXH37jHz7BIY0kCAXmnx5jHWv1UpvU0iff503wyyzPZ~AEBCZHpOO2mzedAvSeN1K0gzWUhylc0HGW~POGgu5xo0zy3r31HTw__",
      dimensions: "30cm × 30cm",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Product
            </h2>
            <button
              onClick={fillSampleData}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Load Sample Data
            </button>
          </div>

          {error && (
            <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Product added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  value={product.width}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={product.height}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Depth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Depth (cm)
                </label>
                <input
                  type="number"
                  name="depth"
                  value={product.depth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions (Format: width × height)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={product.dimensions}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Image Preview */}
              {product.imageUrl && (
                <div className="md:col-span-2 mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Image Preview:
                  </p>
                  <div className="h-64 bg-gray-100 flex items-center justify-center p-4 rounded border border-gray-300">
                    <img
                      src={product.imageUrl}
                      alt="Product preview"
                      className="max-h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/400/400";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={20} />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
