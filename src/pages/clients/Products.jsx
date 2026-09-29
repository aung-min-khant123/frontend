import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"

function Products() { 
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("https://backend-production-1756.up.railway.app/api/products");

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log("Error from fetching", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 font-mono">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-80 object-contain rounded-2xl"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold">{product.name}</h3>

              <p className="text-xl font-bold font-mono mt-2">${product.price}</p>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-bold font-mono">
                <Link to={`/products/${product.id}`}>View Details</Link> <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
