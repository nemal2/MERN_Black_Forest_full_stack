import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["Red_Alert", "Orange_Alert", "Blue_Alert"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "Red_Alert",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="date"
          name="minPrice"
          placeholder="From"
          onChange={handleChange}
        />
        <input
          type="date"
          name="maxPrice"
          placeholder="To"
          onChange={handleChange}
        />

        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
