import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

/* PROVIDER */
export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        clearSearch: () => setSearchText(""),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

/* CUSTOM HOOK ✅ MUST BE EXPORTED */
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return context;
}
