import React from "react";

type SearchBarProps = {
  query: string;
  setQuery: React.Dispatch<string>;
};

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="relative w-full w-full h-10">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-11 h-10 pr-3 py-2 bg-transparent placeholder:text-gray-400 placeholder:text-sm text-slate-700 text-sm border border-slate-300 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-xs"
        placeholder="Here you can find the user..."
      />
      <button
        className="absolute h-8 w-8 left-1 top-1 my-auto px-2 flex items-center rounded"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};
