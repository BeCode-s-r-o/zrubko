import React, { useState, useRef, useCallback } from "react";
import SearchResultItem from "./SearchResultItem";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchResults = useCallback(
    debounce(async (query: string) => {
      console.log("fetchResults called with query:", query);
      if (!query) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: query }),
        });
        const data = await res.json();
        setResults(data.hits || []);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  return (
    <div className="relative w-full max-w-lg">
      <div>
        <input
          ref={inputRef}
          value={value}
          onChange={e => {
            setValue(e.target.value);
            console.log("Input changed:", e.target.value);
            fetchResults(e.target.value);
          }}
          onFocus={() => value && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Hľadať produkty..."
          className="w-full px-4 py-2 rounded-lg bg-transparent text-white placeholder:text-white/60 border border-transparent focus:bg-white focus:text-black focus:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold transition-colors duration-200"
          autoComplete="off"
        />
        {showDropdown && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute right-0 left-0 z-10 mt-1 bg-white text-black rounded border shadow"
          >
            {results.map((item: any) => (
              <SearchResultItem
                key={item.id}
                title={item.title}
                image={item.thumbnail || item.image}
                handle={item.handle}
                onClick={() => setShowDropdown(false)}
              />
            ))}
          </div>
        )}
        {showDropdown && !loading && results.length === 0 && (
          <div className="absolute right-0 left-0 z-10 p-4 mt-1 text-sm text-black bg-white rounded border shadow">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 