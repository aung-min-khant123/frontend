import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        <h2 className="text-2xl font-bold font-mono animate-bounce">
          GOAT Football Shirts
        </h2>

        <div className="flex gap-10 text-lg font-bold font-mono">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;