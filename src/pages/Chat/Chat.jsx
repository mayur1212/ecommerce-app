import React from "react";

const chats = [
  { id: 1, name: "Support Team", lastMessage: "How can we help you?" },
  { id: 2, name: "Seller Rahul", lastMessage: "Your order is shipped 🚚" },
];

export default function Chat() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">Chats</h1>
      <p className="text-sm text-gray-600 mt-1">
        Your recent conversations.
      </p>

      <div className="mt-6 space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="bg-white p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-sm text-gray-600">{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
