import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`,
        );

        const data = await response.json();

        setProduct(data);

      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <p>No products found......</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="overflow-hidden">
          <img
            src={
              product.image_url.startsWith("http")
                ? product.image_url
                : `http://localhost:8000${product.image_url}`
            }
            alt={product.name}
            className="w-full h-125 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold font-mono">{product.name}</h1>

          <p className="text-3xl font-bold mt-5">${product.price}</p>

          <p className="text-gray-800 mt-5 font-bold">
            High-quality football jersey for passionate football fans. Show your
            support for your favorite team and player.
          </p>

          <button className="mt-8 bg-black text-white py-3 px-6 rounded-lg font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
