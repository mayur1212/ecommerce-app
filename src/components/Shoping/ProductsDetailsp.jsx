import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart } from "lucide-react";
import products from "../../data/products.json";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");

  useEffect(() => {
    setQty(1);
    setActiveTab("description");
    setAddedMsg("");
    if (product) {
      setSelectedImage(product.images?.[0] || product.image || "");
    } else {
      setSelectedImage("");
    }
  }, [id, product]);

  useEffect(() => {
    if (!product) return;
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist_v1") || "[]");
      setWishlisted(saved.includes(String(product.id)));
    } catch {
      setWishlisted(false);
    }
  }, [product]);

  if (!product) {
    return <h2 className="text-center text-red-600">Product Not Found</h2>;
  }

  const price = (product.priceCents ?? 0) / 100;
  const mrp = (product.mrpCents ?? product.mrp ?? 0) / 100;
  const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : product.discountPercent;
  const related = products
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 6);

  const total = +(price * qty).toFixed(2);

  function toggleWishlist() {
    if (!product) return;
    try {
      const key = "wishlist_v1";
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      const idStr = String(product.id);
      let next;
      if (saved.includes(idStr)) {
        next = saved.filter((x) => x !== idStr);
        setWishlisted(false);
      } else {
        next = [idStr, ...saved];
        setWishlisted(true);
      }
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      setWishlisted((w) => !w);
    }
  }

  function handleAddToCart() {
    const payload = {
      id: product.id,
      name: product.name,
      price,
      qty,
      image: selectedImage || product.image,
    };
    // TODO: integrate with cart store / backend
    setAddedMsg(`${qty} × ${product.name} added to cart • ₹${total}`);
    setTimeout(() => setAddedMsg(""), 3500);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* main grid: single column mobile, 2 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: Images */}
        <div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow">
            {/* responsive image area */}
            <div className="w-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center h-64 sm:h-80 md:h-96">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* thumbnails: horizontal scroll on small, grid on md+ */}
            <div className="mt-4">
              <div className="hidden md:grid md:grid-cols-6 md:gap-3">
                {(product.images && product.images.length ? product.images : [product.image]).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-full h-20 rounded-lg overflow-hidden border-2 transition-shadow focus:outline-none ${
                      (selectedImage || product.image) === img ? "ring-2 ring-red-400" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="md:hidden flex gap-3 overflow-x-auto py-1">
                {(product.images && product.images.length ? product.images : [product.image]).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      (selectedImage || product.image) === img ? "ring-2 ring-red-400" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{product.name}</h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            <span className="capitalize">{product.category}</span>
            {product.subCategory ? ` • ${product.subCategory}` : ""}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center text-yellow-500">
              <Star size={18} />
              <span className="ml-1 font-medium text-sm sm:text-base">{product.rating?.stars ?? "-"}</span>
              <span className="text-gray-500 ml-2 text-xs sm:text-sm">({product.rating?.count ?? 0} reviews)</span>
            </div>

            <div className="ml-auto flex items-center gap-2 text-xs sm:text-sm">
              {discountPercent > 0 && (
                <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] sm:text-xs">{discountPercent}% off</div>
              )}
              <div className="text-gray-400">SKU: {product.sku ?? "-"}</div>
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-red-600">₹{price.toFixed(0)}</div>
              {mrp > 0 && <div className="text-sm text-gray-400 line-through">₹{mrp.toFixed(0)}</div>}
            </div>

            <div className="ml-2 text-sm text-gray-500 hidden sm:block">You save: ₹{(mrp - price > 0 ? (mrp - price).toFixed(0) : 0)}</div>
          </div>

          <p className="mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">{product.shortDescription || product.description}</p>

          {/* small info box */}
          <div className="mt-5 bg-gray-50 p-3 sm:p-4 rounded-lg border text-sm">
            <div className={`${product.inStock ? "text-green-700" : "text-red-600"} font-medium`}>
              {product.inStock ? `In Stock • ${product.stock ?? 0} left` : "Out of stock"}
            </div>

            <ul className="text-gray-600 mt-2 space-y-1 text-xs sm:text-sm">
              {product.delivery && <li><strong>Delivery:</strong> {product.delivery}</li>}
              {product.warranty && <li><strong>Warranty:</strong> {product.warranty}</li>}
              {product.returnPolicy && <li><strong>Return:</strong> {product.returnPolicy}</li>}
              {product.weight && <li><strong>Weight:</strong> {product.weight}</li>}
            </ul>
          </div>

          {/* quantity + actions */}
          <div className="mt-5 grid grid-cols-1 sm:flex sm:items-center sm:gap-4 gap-3">
            <div className="flex items-center border rounded-lg px-2 py-1 w-full sm:w-auto">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2 touch-manipulation"
                aria-label="Decrease quantity"
              >
                <Minus />
              </button>

              <div className="px-4 py-2 min-w-[56px] text-center text-sm">{qty}</div>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2 touch-manipulation"
                aria-label="Increase quantity"
              >
                <Plus />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:opacity-95 transition-shadow shadow-sm text-sm"
              >
                Add to Cart
              </button>

              <button
                onClick={toggleWishlist}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border rounded-lg font-semibold text-sm ${
                  wishlisted ? "border-blue-700 bg-blue-50 text-blue-800" : "border-gray-300 bg-white text-gray-800"
                }`}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} className={`${wishlisted ? "text-blue-700" : "text-gray-600"}`} />
                <span>WISHLIST</span>
              </button>
            </div>
          </div>

          {/* total + feedback */}
          <div className="mt-3 text-sm text-gray-600">
            <div>Total for {qty} item{qty > 1 ? "s" : ""}: <span className="font-semibold">₹{total}</span></div>
            {addedMsg && <div className="mt-2 text-green-700">{addedMsg}</div>}
          </div>

          {/* tags / extra */}
          <div className="mt-4 text-sm text-gray-500">
            {product.minOrder && <div className="mt-1">Minimum Order Quantity: {product.minOrder}</div>}
            {product.tags && <div className="mt-1">Tags: {product.tags.join(", ")}</div>}
            {product.dimensions && <div className="mt-1">Dimensions: {product.dimensions}</div>}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6 shadow">
        <div className="flex gap-4 border-b pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 ${activeTab === "description" ? "border-b-2 border-red-500 text-red-600" : "text-gray-600"}`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-2 ${activeTab === "specs" ? "border-b-2 border-red-500 text-red-600" : "text-gray-600"}`}
          >
            Specifications
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 ${activeTab === "reviews" ? "border-b-2 border-red-500 text-red-600" : "text-gray-600"}`}
          >
            Reviews ({product.reviews?.length ?? 0})
          </button>
        </div>

        <div className="mt-4 text-gray-700">
          {activeTab === "description" && (
            <div className="text-sm sm:text-base leading-relaxed">
              <p>{product.description}</p>
              {product.brand && <p className="mt-3 text-sm italic text-gray-500">Brand: {product.brand}</p>}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {product.specifications ? (
                Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="text-sm">
                    <div className="text-gray-500 text-xs">{k}</div>
                    <div className="font-medium">{v}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No specifications available.</div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-sm">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r, i) => (
                  <div key={i} className="border-b py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{r.user}</div>
                      <div className="text-sm text-yellow-500">{r.rating} ⭐</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{r.comment}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No reviews yet.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      <div className="mt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Products</h2>

        {related.length === 0 ? (
          <p className="text-gray-500">No related products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/shopping/${item.id}`}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />

                <h3 className="text-sm font-semibold mt-2 line-clamp-2">{item.name}</h3>

                <p className="text-red-600 font-bold text-sm mt-1">₹{((item.priceCents ?? 0) / 100).toFixed(0)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
