// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// function Home() {
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.log("Error from fetching", error);
//     }
//   };
//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>Products</h1>22
//         {products.map((product) => (
//           <div key={product.id}>
//             <h3>{product.name}</h3>
//             <p>${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home;
