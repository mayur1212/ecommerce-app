// src/components/Shoping/ProductsList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ TOASTER
import products from "../../data/products.json";
import { useCart } from "../../context/CartContext";

/* ================= SAFE HELPERS ================= */

const formatPrice = (price) => {
  const value = Number(price);
  return `₹${isNaN(value) ? "0" : value.toLocaleString()}`;
};

const getDisplayPrice = (product) => {
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    const prices = product.variants
      .map((v) => v.price)
      .filter((p) => typeof p === "number");
    return prices.length > 0 ? Math.min(...prices) : 0;
  }
  return product.discount_price ?? product.price ?? 0;
};

const getDisplayMRP = (product) => {
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    const mrps = product.variants
      .map((v) => v.mrp)
      .filter((m) => typeof m === "number");
    return mrps.length > 0 ? Math.max(...mrps) : null;
  }
  return product.price ?? null;
};

const getTotalStock = (product) => {
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.reduce(
      (sum, v) => sum + (v.stock ?? 0),
      0
    );
  }
  return product.stock ?? 0;
};

const getDeliveryLabel = (product) => {
  const charge = product.delivery_charge;
  if (charge === 0) return "Free Delivery";
  if (typeof charge === "number") return `Delivery ₹${charge}`;
  return "Delivery at checkout";
};

const isInStock = (product) => {
  if (product.variants?.length > 0) {
    return product.variants.some((v) => (v.stock ?? 0) > 0);
  }
  return (product.stock ?? 0) > 0;
};

/* ================================================= */

export default function ProductsList() {
  const [wishlisted, setWishlisted] = useState({});
  const { addToCart } = useCart();

  const toggleWishlist = (id) => {
    setWishlisted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: getDisplayPrice(product),
      image: product.thumbnail,
      qty: 1,
    });

    // 🔥 TOASTER
    toast.success("Added to cart", {
      icon: "🛒",
      duration: 2000,
    });
  };

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.length > 0 ? (
        products.map((product) => {
          const inStock = isInStock(product);
          const isWish = !!wishlisted[product.id];

          const ratingValue =
            product.rating?.stars ??
            product.rating?.value ??
            (typeof product.rating === "number" ? product.rating : 4.5);

          const totalStock = getTotalStock(product);
          const deliveryLabel = getDeliveryLabel(product);

          const salePrice = getDisplayPrice(product);
          const mrp = getDisplayMRP(product);

          return (
            <Link
              key={product.id}
              to={`/shopping/${product.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              {/* IMAGE */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-3 relative">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* STOCK BADGE */}
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold
                  ${
                    inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>

                {/* WISHLIST */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={isWish ? "red" : "none"}
                    stroke={isWish ? "red" : "currentColor"}
                    strokeWidth="2"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </button>
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {product.category}
              </p>

              {/* PRICE */}
              <div className="mt-2 flex items-center justify-between">
                <div>
                  {mrp && mrp > salePrice ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-base font-bold text-red-600">
                        {formatPrice(salePrice)}
                      </span>
                      <span className="text-xs line-through text-gray-400">
                        {formatPrice(mrp)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base font-bold text-red-600">
                      {formatPrice(salePrice)}
                    </span>
                  )}
                </div>

                <div className="text-xs flex items-center gap-1">
                  ⭐ {ratingValue}
                </div>
              </div>

              {/* QTY + DELIVERY */}
              <div className="mt-1 flex justify-between text-[11px] text-gray-600">
                <span>Qty: {totalStock} pc</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {deliveryLabel}
                </span>
              </div>

              {/* ADD TO CART */}
              <button
                disabled={!inStock}
                onClick={(e) => handleAddToCart(e, product)}
                className={`mt-3 w-full text-sm font-semibold py-2 rounded-lg transition
                  ${
                    inStock
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-600">
          No products available.
        </p>
      )}
    </div>
  );
}
