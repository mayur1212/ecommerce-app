import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const items = Object.values(wishlist);

  if (!items.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">Your wishlist is empty ❤️</h2>
        <Link to="/shopping" className="text-red-600 mt-4 inline-block">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm p-3 flex flex-col"
        >
          <Link to={`/shopping/${product.id}`}>
            <div className="relative mb-3 w-full aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <span className="text-red-600 font-bold mt-1">
            ₹{product.price}
          </span>

          <div className="mt-auto flex gap-2">
            <button
              onClick={() => {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.thumbnail,
                  qty: 1,
                });
                toast.success("Added to cart 🛒");
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="px-3 border rounded-lg"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
