import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 2) {
      navigate(`/order/${query}`);
      setQuery("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-32 rounded-full bg-yellow-100 px-2 py-1 text-sm text-stone-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-60 sm:px-3 sm:py-2 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
