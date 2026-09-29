import React, { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
  });

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/products/${editingProduct.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: editingProduct.name,
            price: Number(editingProduct.price),
            image_url: editingProduct.image_url,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: editingProduct.name,
                price: Number(editingProduct.price),
                image_url: editingProduct.image_url,
              }
            : product,
        ),
      );

      setEditingProduct(null);

      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: newProduct.name,
          price: Number(newProduct.price),
          image_url: newProduct.image_url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setProducts((currentProducts) => [...currentProducts, data.product]);

      setNewProduct({
        name: "",
        price: "",
        image_url: "",
      });

      setAddingProduct(false);

      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>

            <p className="text-gray-500 mt-1">Manage your football jerseys</p>
          </div>
          <button
            onClick={() => setAddingProduct(true)}
            className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>

                  <th className="px-6 py-4 text-left">Image</th>

                  <th className="px-6 py-4 text-left">Product Name</th>

                  <th className="px-6 py-4 text-left">Price</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-600">{product.id}</td>

                    <td className="px-6 py-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-lg shadow-sm"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">
                        ${product.price}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            setEditingProduct({
                              ...product,
                            })
                          }
                          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

              <form onSubmit={updateProduct} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Product Name</label>

                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Price</label>

                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Image URL</label>

                  <input
                    type="text"
                    value={editingProduct.image_url}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image_url: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {addingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Add Product</h2>

              <form onSubmit={addProduct} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Product Name</label>

                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        name: e.target.value,
                      })
                    }
                    placeholder="England 2026 Bellingham Home Shirt"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Price</label>

                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="89.99"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Image URL</label>

                  <input
                    type="text"
                    value={newProduct.image_url}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        image_url: e.target.value,
                      })
                    }
                    placeholder="http://localhost:8000/images/Bellingham2026.png"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setAddingProduct(false)}
                    className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
