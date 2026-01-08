import React from "react";

const user = {
  name: "Mayur Takke",
  email: "mayur@example.com",
  phone: "+91 9876543210",
};

export default function Account() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold">My Account</h1>
      <p className="text-sm text-gray-600 mt-1">
        Manage your profile and personal information.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow p-5 space-y-3">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
      </div>
    </div>
  );
}
