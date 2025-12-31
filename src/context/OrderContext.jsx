import { createContext, useContext, useEffect, useState } from "react";
import products from "../data/products.json";

const OrderContext = createContext(null);

/* ===== CREATE INITIAL ORDERS FROM PRODUCTS ===== */
const mapProductsToOrders = () =>
  products.map((p, index) => ({
    id: `ORD-${p.id}`,          // order id
    productId: p.id,            // ✅ ONLY THIS IS USED FOR DETAILS
    title: p.name,
    image: p.thumbnail || p.images?.[0] || "",
    price: Number(p.discount_price ?? p.price),
    mrp: Number(p.price),
    qty: 1,
    rating: Number(p.rating),
    reviews: Number(p.rating_count),
    status: index % 2 === 0 ? "ongoing" : "completed",
    paymentMethod: "COD",
    deliveryCharge: Number(p.delivery_charge ?? 0),
    seller_name: p.seller_name,
    createdAt: new Date().toLocaleString(),
  }));

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : mapProductsToOrders();
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* ===== PLACE ORDER ===== */
  const placeOrder = (cartItems = [], total = 0, meta = {}) => {
    if (!cartItems.length) return null;

    const item = cartItems[0];

    const newOrder = {
      id: `ORD-${Date.now()}`,
      productId: item.productId,     // ✅ MUST EXIST
      title: item.name,
      image: item.image,
      price: Number(item.price),
      mrp: Number(meta.mrp ?? item.price),
      qty: Number(item.qty ?? 1),
      rating: 0,
      reviews: 0,
      status: "ongoing",
      paymentMethod: meta.paymentMethod || "COD",
      deliveryCharge: Number(item.deliveryCharge ?? 0),
      seller_name: meta.seller_name || "",
      createdAt: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder.id;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
};
