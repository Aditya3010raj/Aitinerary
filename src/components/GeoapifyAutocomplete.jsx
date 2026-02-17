import React, { useState, useRef, useEffect } from "react"

export default function GeoapifyAutocomplete({ onSelect }) {
  const [suggestions, setSuggestions] = useState([])
  const [query, setQuery] = useState("")

  const inputRef = useRef(null)

  useEffect(() => {
    if (!query) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&limit=5&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data.features || [])
      })
      .catch(() => {})

    return () => controller.abort()
  }, [query])

  return (
    <div className="relative">
      {/* Search Input Field */}
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter destination (e.g. Paris, Tokyo)"
        className="w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 
                   rounded-2xl outline-none focus:border-blue-500 transition-all shadow-sm 
                   dark:text-white dark:placeholder:text-gray-500"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 
                       dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {suggestions.map((item) => (
            <li
              key={item.properties.place_id}
              onClick={() => {
                onSelect(item)
                setQuery(item.properties.formatted)
                setSuggestions([])
              }}
              className="px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 
                         dark:hover:bg-blue-900/30 cursor-pointer transition-colors border-b 
                         last:border-none border-gray-50 dark:border-gray-700/50"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.properties.city || item.properties.name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  {item.properties.formatted}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}