import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";

export default function SearchBar() {
  const { searchText, setSearchText } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const boxRef = useRef(null);

  const items = ["Mobiles", "Electronics", "Fashion", "Toys", "iPhone 16"];

  /* OUTSIDE CLICK → CLOSE */
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = searchText
    ? items.filter((i) =>
        i.toLowerCase().includes(searchText.toLowerCase())
      )
    : items;

  return (
    <div ref={boxRef} className="relative w-full">
      {/* SEARCH BAR */}
      <div
        className="
          flex items-center w-full
          bg-white px-4 py-3
          rounded-xl border
          cursor-text
        "
        onClick={() => setShowDropdown((prev) => !prev)} // ✅ TAP → TOGGLE
      >
        <input
          className="w-full outline-none bg-transparent"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setShowDropdown(false); // ✅ ENTER → CLOSE
            }
          }}
        />
      </div>

      {/* DROPDOWN */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50">
          {filtered.length ? (
            filtered.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearchText(item);
                  setShowDropdown(false); // ✅ ITEM CLICK → CLOSE
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
