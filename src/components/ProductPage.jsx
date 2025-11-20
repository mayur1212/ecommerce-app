import React from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";

export default function ProductPage() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id || p.id.toString() === id);

  if (!product) return <h2>Product not found</h2>;

  const price = product.priceAfterDiscount ?? (product.priceCents ? (product.priceCents / 100) : product.price);
  const ratingDisplay = typeof product.rating === "number" ? product.rating : product.rating?.stars ?? "—";

  return (
    <div className="w-full p-6">  {/* FULL WIDTH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"> {/* 100% width grid */}
        
        {/* IMAGE SECTION */}
        <div className="w-full">
          <img
            src={product.image || product.images?.[0]}
            alt={product.name}
            className="w-full h-[400px] object-contain bg-white rounded-lg shadow"
          />
        </div>

        {/* INFO SECTION */}
        <div className="w-full">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {product.brand && (
            <p className="text-sm text-slate-600 mt-1">Brand: {product.brand}</p>
          )}

          <p className="text-sm text-slate-600">Category: {product.category}</p>

          <p className="text-3xl font-extrabold text-sky-600 mt-4">₹{price}</p>

          <p className="mt-2 text-lg">Rating: {ratingDisplay} ★</p>

          <h3 className="mt-6 font-semibold text-lg">Description</h3>
          <p className="text-sm text-slate-700 mt-2">
            {product.longDescription ?? product.description}
          </p>

          <h3 className="mt-6 font-semibold text-lg">Specifications</h3>
          <pre className="bg-slate-100 p-4 rounded text-xs mt-2 overflow-auto">
            {JSON.stringify(product.specs ?? {}, null, 2)}
          </pre>

          <h3 className="mt-6 font-semibold text-lg">Warranty</h3>
          <p>{product.warranty ?? "N/A"}</p>

          <h3 className="mt-6 font-semibold text-lg">Return Policy</h3>
          <p>{product.returnPolicy ?? "—"}</p>
        </div>
      </div>
    </div>
  );
}
