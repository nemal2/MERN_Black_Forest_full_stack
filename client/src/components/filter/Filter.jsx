import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function Filter() {

  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };


  console.log(searchParams.get("city"))

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type"
          onChange={handleChange}
          defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="Red_Alert">Red Alert</option>
            <option value="Orange_Alert">Orange Alert</option>
            <option value="Blue_Alert">Blue Alert</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Mission Type</label>
          <select name="property" id="property"
          onChange={handleChange}
          defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="Global_Terrorism">Global Terrorism</option>
            <option value="Regional">Regional</option>
            <option value="Political">Political</option>
            <option value="Black_Market">Black Market</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">From</label>
          <input
            type="date"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">To</label>
          <input
            type="date"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Deaths</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
