
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import RelatedProducts from "./RelatedProducts";
import ReviewsDrawer from "./ReviewsDrawer"; // <-- corrected
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";





const formatPrice = (price) => `₹${price?.toLocaleString() || "0"}`;

const getSellerSlug = (name = "") =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)+/g, "");

// generic price helper
const getPriceInfo = (product, variant) => {
  const hasVariant = variant && Object.keys(variant).length > 0;

  const mrp =
    (hasVariant && (variant.mrp ?? variant.original_price)) ??
    product.mrp ??
    product.original_price ??
    product.price ??
    0;

  let salePrice =
    (hasVariant &&
      (variant.discount_price ?? variant.sale_price ?? variant.price)) ??
    product.discount_price ??
    product.sale_price ??
    product.price ??
    mrp;

  let discountPercent = 0;

  if (mrp && salePrice && mrp > salePrice) {
    discountPercent = Math.round(((mrp - salePrice) / mrp) * 100);
  } else if (hasVariant && typeof variant.discount_percent === "number") {
    discountPercent = variant.discount_percent;
  } else if (typeof product.discount_percent === "number") {
    discountPercent = product.discount_percent;
  }

  if (mrp && discountPercent > 0 && (salePrice === mrp || !salePrice)) {
    salePrice = Math.round(mrp * (1 - discountPercent / 100));
  }

  return { mrp, salePrice, discountPercent };
};

const ratingBreakdown = [
  { label: "Excellent", value: 3228, width: "70%" },
  { label: "Very Good", value: 1069, width: "25%" },
  { label: "Good", value: 533, width: "15%" },
  { label: "Average", value: 0, width: "4%" },
  { label: "Poor", value: 304, width: "6%" },
];

function SellerSection({ ratingValue, ratingCount, sellerName, sellerStats, onViewAllReviews }) {
  const displayRating = Number(ratingValue || 0).toFixed(1);
  const displayCount = ratingCount || 0;

  const {
    sellerRating = 4.1,
    sellerRatingCount = 116951,
    followers = 1059,
    productsCount = 27,
  } = sellerStats || {};

  const sellerSlug = getSellerSlug(sellerName || "seller");

  return (
    <section className="mt-8 space-y-4">
      {/* SOLD BY CARD */}
      <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
              🏬
            </div>

            <div>
              <p className="text-[11px] font-medium text-slate-500">Sold By</p>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                {sellerName || "HILL TOP FASHION"}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-semibold text-green-700">
                  {sellerRating.toFixed(1)} ★
                </span>
                <span>{sellerRatingCount.toLocaleString()} Ratings</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                <span>{followers.toLocaleString()} Followers</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
                <span>{productsCount} Products</span>
              </div>
            </div>
          </div>

          {/* VIEW SHOP LINK */}
          <Link
            to={`/seller/${sellerSlug}`}
            className="self-start rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium text-violet-600 transition hover:bg-violet-50"
          >
            View Shop
          </Link>
        </div>
      </div>

      {/* PRODUCT RATINGS & REVIEWS */}
      <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
        <p className="mb-4 text-sm sm:text-base font-semibold text-slate-900">
          Product Ratings &amp; Reviews
        </p>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 items-center gap-3">
            <div>
              <p className="text-4xl sm:text-5xl font-semibold text-green-600">
                {displayRating}★
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                5134 Ratings, 3790 Reviews
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs text-slate-600"
              >
                <span className="w-20">{item.label}</span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: item.width }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] text-slate-500">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* sample reviews */}
        <div className="mt-4 space-y-4 border-t pt-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-800">Sumit Yadav</span>
              <span className="rounded-sm bg-green-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                5.0★
              </span>
              <span className="text-[11px] text-slate-500">
                Posted on 2 Dec 2025
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Very good in fitting fabric and colour you can buy it
            </p>
            <div className="mt-2 flex gap-2">
              <div className="h-16 w-16 rounded-md bg-slate-100 overflow-hidden" />
            </div>
            <button className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
              👍 Helpful (0)
            </button>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-800">
                Pawan Chandu G
              </span>
              <span className="rounded-sm bg-green-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                5.0★
              </span>
              <span className="text-[11px] text-slate-500">
                Posted on 30 Nov 2025
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Excellent product, worth of money
            </p>
            <div className="mt-2 flex gap-2">
              <div className="h-16 w-16 rounded-md bg-slate-100 overflow-hidden" />
            </div>
            <button className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
              👍 Helpful (0)
            </button>
          </div>
        </div>

        {/* VIEW ALL REVIEWS */}
        <button
          onClick={onViewAllReviews}
          className="mt-4 w-full rounded-lg border border-violet-500 py-2 text-xs sm:text-sm font-semibold text-violet-600 hover:bg-violet-50"
        >
          VIEW ALL REVIEWS →
        </button>
      </div>

      {/* bottom features strip */}
      <div className="grid gap-2 rounded-2xl border bg-[#f5f7ff] p-3 text-center text-xs sm:text-sm text-slate-700 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-1">
          <span role="img" aria-label="price">
            🏷️
          </span>
          <span>Lowest Price</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span role="img" aria-label="cod">
            📦
          </span>
          <span>Cash on Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span role="img" aria-label="returns">
            🔄
          </span>
          <span>7-day Returns</span>
        </div>
      </div>
    </section>
  );
}

export default function ProductsDetails() {

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
  const cartItem = {
    productId: product.id,
    name: product.name,
    price: salePrice,
    qty: quantity,
    image: selectedImage,
    variant: selectedVariant,
  };

  addToCart(cartItem);

  // 🔥 Professional toast (Flipkart style)
  toast.success("Added to cart", {
    icon: "🛒",
    duration: 2000,
  });
};


  const handleBuyNow = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: salePrice,
      qty: quantity,
      image: selectedImage,
      variant: selectedVariant,
    };

    addToCart(cartItem);
    navigate("/checkout");
  };





  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const variants = product.variants || [];

  // ================= VARIANT STATES =================
const [selectedColor, setSelectedColor] = useState(variants[0]?.color || null);
const [selectedSize, setSelectedSize] = useState(variants[0]?.size || null);
const [selectedWeight, setSelectedWeight] = useState(variants[0]?.weight || null);

const [showColorModal, setShowColorModal] = useState(false);
const [showWeightModal, setShowWeightModal] = useState(false);

// ================= UNIQUE OPTIONS =================
const uniqueColors = [...new Set(variants.map(v => v.color).filter(Boolean))];
const uniqueSizes = [...new Set(variants.map(v => v.size).filter(Boolean))];
const uniqueWeights = [...new Set(variants.map(v => v.weight).filter(Boolean))];


  

  const selectedVariant =
  variants.find(
    (v) =>
      (!selectedColor || v.color === selectedColor) &&
      (!selectedSize || v.size === selectedSize) &&
      (!selectedWeight || v.weight === selectedWeight)
  ) || variants[0] || {};


  // image
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.thumbnail);

  // wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);
  const handleWishlistToggle = () => setIsWishlisted((p) => !p);

  // share
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = { title: product.name, text: product.description, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Product link copied!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const { mrp, salePrice, discountPercent } = getPriceInfo(product, selectedVariant);
  const totalStock = selectedVariant?.stock ?? product.stock ?? 0;
  const inStock = totalStock > 0;

  const ratingValue =
    product.rating?.stars ??
    product.rating?.value ??
    (typeof product.rating === "number" ? product.rating : 0);

  const ratingCount = product.rating_count ?? product.rating?.count ?? 0;
  const youSave = mrp > salePrice ? mrp - salePrice : 0;

  // qty
  const [quantity, setQuantity] = useState(1);
  const minQty = product.min_order_qty ?? 1;

  const handleQtyChange = (type) => {
    setQuantity((prev) => {
      if (type === "dec") return Math.max(minQty, prev - 1);
      if (totalStock) return Math.min(totalStock, prev + 1);
      return prev + 1;
    });
  };

  const deliveryCharge =
    product.delivery_charge === 0
      ? 0
      : product.delivery_charge === 100
      ? 100
      : 0;

  const totalPrice = salePrice * quantity + deliveryCharge;


  const [activeTab, setActiveTab] = useState("description");
  const tags = product.tags || [];
  const specs = {
    Brand: product.brand,
    Category: product.category,
    SKU: product.sku_id || product.sku,
    Weight: product.weight,
    Dimensions: product.dimensions,
    "Min Order Qty": product.min_order_qty,
  };

  // reviews drawer state + handlers
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const openReviews = () => setReviewsOpen(true);
  const closeReviews = () => setReviewsOpen(false);

  


  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
      <Link
        to="/shopping"
        className="text-blue-600 mb-4 inline-block text-xs sm:text-sm font-semibold hover:underline"
      >
        ← Back to Products
      </Link>

      <div className="flex flex-col gap-6 md:gap-8 lg:flex-row">
        {/* LEFT */}
        <div className="lg:w-[45%] w-full">
          <div className="w-full h-64 sm:h-80 md:h-[420px] bg-white rounded-3xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />

            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-lg">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
            {[product.thumbnail, ...(product.images || [])].map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`rounded-2xl border-2 p-1 min-w-[60px]
                    ${selectedImage === img ? "border-blue-600" : "border-gray-200 hover:border-blue-400"}`}
              >
                <img src={img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-full overflow-hidden">
                <button onClick={() => handleQtyChange("dec")} className="w-10 h-10 flex items-center justify-center">−</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => handleQtyChange("inc")} className="w-10 h-10 flex items-center justify-center">+</button>
              </div>
            </div>

  
  <div className="bg-white border rounded-2xl p-4 text-sm text-gray-700">
              <p><b>Delivery:</b> {deliveryCharge === 0 ? "Free delivery available" : `Delivery charge: ${formatPrice(deliveryCharge)}`}</p>
              <p><b>Warranty:</b> {product.warranty ?? "No warranty info"}</p>
              <p><b>Return Policy:</b> {product.return_policy ?? "7 days return policy"}</p>
              <p><b>SKU:</b> {product.sku_id || product.sku}</p>
              {product.weight && <p><b>Weight:</b> {product.weight}</p>}
            </div>
            

</div>

        </div>

        {/* RIGHT */}
        <div className="lg:w-[55%] w-full flex flex-col gap-4 mt-4 lg:mt-0">
          <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg w-max">
            {product.brand}
          </span>

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              {product.overview && <p className="mt-1 text-sm text-gray-600">{product.overview}</p>}
            </div>

            <div className="flex gap-2 mt-1">
              <button onClick={handleWishlistToggle} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center">
                <svg className="w-5 h-5" fill={isWishlisted ? "red" : "none"} stroke={isWishlisted ? "red" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>

              <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51 15.42 17.5" />
                  <path d="M15.41 6.5 8.59 10.49" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-xs">
            Category: <b>{product.category}</b> • SKU: <b>{product.sku_id || product.sku}</b>
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div className="text-yellow-500">★</div>
            <span className="font-semibold">{Number(ratingValue).toFixed(1)}</span>
            <span className="text-gray-500 text-xs">({ratingCount} reviews)</span>
          </div>

          <p className={`text-sm font-semibold ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? `✔ In Stock • ${totalStock} left` : "✘ Out Of Stock"}
          </p>

          {/* PRICE BOX */}
          <div className="mt-3 space-y-3">
            <div className="bg-gray-50 rounded-2xl border p-4">
              <div className="flex items-center gap-3 flex-wrap">
                {mrp > salePrice && <span className="line-through text-gray-400 text-lg">{formatPrice(mrp)}</span>}
                <span className="text-3xl font-bold text-red-600">{formatPrice(salePrice)}</span>
                {discountPercent > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">{discountPercent}% off</span>}
              </div>

              {youSave > 0 && <p className="text-sm text-gray-700 mt-2">You save <b>{formatPrice(youSave)}</b> per item</p>}

              <p className="text-sm text-gray-700 mt-1">
                Delivery Charge: {deliveryCharge === 0 ? <b className="text-green-600">FREE</b> : <b className="text-red-600">{formatPrice(deliveryCharge)}</b>}
              </p>

              <div className="bg-blue-50 border rounded-xl px-3 py-2 mt-2 text-sm">
                <span className="font-medium">Total for {quantity} item{quantity > 1 ? "s" : ""}: </span>
                <span className="font-bold text-blue-700">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* ================= COLOR ================= */}
  {uniqueColors.length > 0 && (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-xs uppercase tracking-wide">
          Color
        </p>
        <button
          onClick={() => setShowColorModal(true)}
          className="text-xs text-blue-600 font-medium underline"
        >
          View All
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {uniqueColors.slice(0, 4).map((color) => {
          const selected = selectedColor === color;
          return (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center
                ${selected ? "border-black ring-2 ring-black" : "border-gray-300"}`}
            >
              <span
                className="w-7 h-7 rounded-full"
                style={{ background: color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  )}

  {/* ================= WEIGHT ================= */}
  {uniqueWeights.length > 0 && (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-xs uppercase tracking-wide">
          Weight
        </p>
        <button
          onClick={() => setShowWeightModal(true)}
          className="text-xs text-blue-600 font-medium underline"
        >
          View All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {uniqueWeights.slice(0, 4).map((weight) => {
          const selected = selectedWeight === weight;
          return (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold
                ${selected
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}
            >
              {weight}
            </button>
          );
        })}
      </div>
    </div>
  )}

  {/* ================= SIZE ================= */}
  {uniqueSizes.length > 0 && (
    <div>
      <p className="font-semibold mb-2 text-xs uppercase tracking-wide">
        Size
      </p>

      <div className="flex flex-wrap gap-3 items-center">
        {uniqueSizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border
                ${isSelected
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300"}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  )}
          </div>

          {/* QUANTITY + ACTIONS */}
          <div className="mt-5 space-y-4">
            

            <div className="flex flex-col sm:flex-row gap-4">
              <button
  onClick={handleAddToCart}
  className="flex-1 bg-amber-500 text-white py-3 rounded-2xl font-semibold hover:bg-amber-600 disabled:opacity-60"
  disabled={!inStock}
>
  Add to Cart
</button>


              <button
  onClick={handleBuyNow}
  className="flex-1 bg-orange-500 text-white py-3 rounded-2xl font-semibold hover:bg-orange-600 disabled:opacity-60"
  disabled={!inStock}
>
  Buy Now
</button>

            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-10 bg-white rounded-3xl border">
        <div className="flex border-b text-sm font-semibold overflow-x-auto">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 whitespace-nowrap ${activeTab === tab ? "text-orange-600 border-b-2 border-orange-500" : "text-gray-500"}`}
            >
              {tab === "description" ? "Description" : tab === "specs" ? "Specifications" : `Reviews (${ratingCount})`}
            </button>
          ))}
        </div>

        <div className="p-6 text-gray-700 text-sm">
          {activeTab === "description" && <p className="leading-relaxed whitespace-pre-line">{product.description || "No description available."}</p>}

          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(specs).map(([label, value]) => value ? (
                <div key={label}>
                  <p className="text-gray-400 text-xs uppercase">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ) : null)}

              {tags.length > 0 && (
                <div className="sm:col-span-2">
                  <p className="text-gray-400 text-xs uppercase mb-1">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{tag}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <p className="font-semibold mb-3">Rating: {Number(ratingValue).toFixed(1)} / 5</p>

              {ratingCount === 0 ? <p className="text-gray-500">No reviews yet.</p> : <p className="text-gray-500">{ratingCount} reviews will be displayed here.</p>}
            </div>
          )}
        </div>
      </div>

      {/* SELLER + RATING SECTION (pass openReviews handler) */}
      <SellerSection
        ratingValue={ratingValue}
        ratingCount={ratingCount}
        sellerName={product.seller_name || product.brand || "HILL TOP FASHION"}
        sellerStats={product.seller_stats}
        onViewAllReviews={openReviews}
      />

      {/* RELATED PRODUCTS */}
      <RelatedProducts products={products} currentProduct={product} />

      {/* REVIEWS DRAWER */}
      <ReviewsDrawer open={reviewsOpen} onClose={closeReviews} reviews={product.reviews || []} />

      {/* ================= COLOR MODAL ================= */}
{showColorModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl p-5 w-[90%] max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Select Color</h3>
        <button onClick={() => setShowColorModal(false)}>✕</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {uniqueColors.map((color) => (
          <button
            key={color}
            onClick={() => {
              setSelectedColor(color);
              setShowColorModal(false);
            }}
            className="w-10 h-10 rounded-full border flex items-center justify-center"
          >
            <span
              className="w-8 h-8 rounded-full"
              style={{ background: color }}
            />
          </button>
        ))}
      </div>
    </div>
  </div>
)}

{/* ================= WEIGHT MODAL ================= */}
{showWeightModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl p-5 w-[90%] max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Select Weight</h3>
        <button onClick={() => setShowWeightModal(false)}>✕</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {uniqueWeights.map((weight) => (
          <button
            key={weight}
            onClick={() => {
              setSelectedWeight(weight);
              setShowWeightModal(false);
            }}
            className="px-4 py-2 rounded-full border text-sm font-medium hover:border-black"
          >
            {weight}
          </button>
        ))}
      </div>
    </div>
  </div>
)}
    </div>

    
  );
}


