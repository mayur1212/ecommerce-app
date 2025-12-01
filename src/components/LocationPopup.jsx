// src/components/LocationPopup.jsx
import React, { useState } from "react";
import { X, MapPin } from "lucide-react";

export default function LocationPopup({ close, setLocation }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
    pincode: "",
    address: "",
    lat: "",
    lon: "",
  });

  // ⭐ AUTO GET LIVE LOCATION
  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
          );

          const data = await res.json();
          const address = data.address || {};

          // ⭐ Smart City Detection
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            address.state_district ||
            "";

          setForm({
            city,
            state: address.state || "",
            country: address.country || "",
            pincode: address.postcode || "",
            address: data.display_name || "",
            lat,
            lon,
          });
        } catch (err) {
          alert("Failed to fetch address");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Failed to get location");
        setLoading(false);
      }
    );
  };

  // ⭐ SAVE LOCATION
  const saveLocation = () => {
    const finalLocation = form.city || form.state || "Unknown";
    setLocation(finalLocation);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[999] px-3">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Select Delivery Location</h2>
          <X
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={close}
          />
        </div>

        {/* LIVE LOCATION BUTTON */}
        <button
          onClick={getLiveLocation}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:opacity-90 transition mb-5"
        >
          <MapPin size={20} />
          {loading ? "Detecting Your Location..." : "Use My Current Location"}
        </button>

        {/* INPUT FORM */}
        <div className="space-y-3">
          {["address", "city", "state", "country", "pincode"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-400 outline-none text-sm"
            />
          ))}

          {/* Hidden Fields */}
          <input type="hidden" value={form.lat} readOnly />
          <input type="hidden" value={form.lon} readOnly />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveLocation}
          className="w-full mt-5 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition"
        >
          Save Location
        </button>

      </div>
    </div>
  );
}
