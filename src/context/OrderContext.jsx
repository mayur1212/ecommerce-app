import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  // Load orders from localStorage (persist after refresh)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /**
   * PLACE ORDER
   * @param {Array} items - cart items
   * @param {number} total - order total
   * @returns {string} orderId
   */
  const placeOrder = (items, total) => {
    const orderId = `ORD-${Date.now()}`;

    const order = {
      id: orderId,
      items,
      total,
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    setOrders((prev) => [order, ...prev]);

    return orderId;
  };

  /**
   * GET SINGLE ORDER
   */
  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }
  return context;
};
