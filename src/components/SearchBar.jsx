import React, { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const boxRef = useRef();

  // Static section data
  const shopping = ["Mobiles", "Electronics", "Fashion", "Toys"];
  const news = ["Local News", "Sports News", "Tech News"];
  const store = ["Nearby Store", "Grocery Store", "Medical Store"];
  const trending = ["iPhone 16", "Smart TV", "Nike Shoes"];

  const allItems = [...shopping, ...news, ...store, ...trending];

  // Load stored history
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearch")) || [];
    setHistory(saved);
  }, []);

  // Save search into history
  const saveSearch = (item) => {
    const text = item || searchText;
    if (!text.trim()) return;

    const updated = [
      text,
      ...history.filter((h) => h !== text),
    ].slice(0, 8);

    setHistory(updated);
    localStorage.setItem("recentSearch", JSON.stringify(updated));
  };

  // Close dropdown clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter items while typing
  const filtered = searchText.trim()
    ? allItems.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div ref={boxRef} className="relative w-full">

      {/* Search Bar */}
      <div
        className="flex items-center w-full bg-gray-100 px-4 py-3 border border-black border-2 rounded-xl"
        onClick={() => setShowDropdown(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
        </svg>

        <input
          placeholder="Search products..."
          className="w-full bg-transparent focus:outline-none text-gray-700"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={(e) => e.key === "Enter" && saveSearch()}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl border z-50 max-h-[450px] overflow-y-auto">

          {/* TYPING MODE */}
          {searchText.trim() ? (
            filtered.length > 0 ? (
              <Section
                title="Matching Results"
                list={filtered}
                onClickItem={(item) => {
                  setSearchText(item);
                  saveSearch(item);
                }}
              />
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">❌ No results found</div>
            )
          ) : (
            <>
              <Section title="Shopping" list={shopping} onClickItem={saveSearch} />
              <Section title="News" list={news} onClickItem={saveSearch} />
              <Section title="Store" list={store} onClickItem={saveSearch} />
              <Section title="Trending Searches" list={trending} onClickItem={saveSearch} />

              {history.length > 0 && (
                <Section title="Recent Searches" list={history} onClickItem={saveSearch} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Section Component
function Section({ title, list, onClickItem }) {
  return (
    <div className="border-b last:border-0">
      <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50">
        {title}
      </div>

      {list.map((item, i) => (
        <div
          key={i}
          onClick={() => onClickItem(item)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          {item}
        </div>
      ))}
    </div>
  );
}
