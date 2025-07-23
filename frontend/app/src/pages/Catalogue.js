import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "./Catalogue.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

const CataloguePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStyle = queryParams.get("type") || "";

  const [sarees, setSarees] = useState([]);
  const [filters, setFilters] = useState({ color: "", style: initialStyle });

  // Update filters from query param on route change
  useEffect(() => {
    const styleFromQuery = new URLSearchParams(location.search).get("type") || "";
    setFilters((prev) => ({ ...prev, style: styleFromQuery }));
  }, [location.search]);

  // Fetch sarees
  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/catalogue");
        if (Array.isArray(response.data)) {
          setSarees(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sarees:", error);
      }
    };

    fetchSarees();
  }, []);

  // Filter logic
  const filteredSarees = sarees.filter((saree) => {
    return (
      (filters.color === "" || saree.color === filters.color) &&
      (filters.style === "" ||
        (saree.style && saree.style.toLowerCase() === filters.style.toLowerCase()))
    );
  });

  return (
    <div className="explore-container">
      <Navbar />
      <h1>Our Collection</h1>

      <div className="catalogue-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <h3>Filters</h3>

          <div className="filter-section">
            <h4>Category</h4>
            {["Bridal", "Designer"].map((cat) => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.style.toLowerCase() === cat.toLowerCase()}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      style: filters.style === cat ? "" : cat,
                    })
                  }
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>Colour</h4>
            {["Blue", "Brown", "Green", "Pink", "Red", "Yellow"].map((color) => (
              <label key={color} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.color === color}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      color: filters.color === color ? "" : color,
                    })
                  }
                />
                <span style={{ color: color.toLowerCase(), fontWeight: "bold" }}>{color}</span>
              </label>
            ))}
          </div>

          <button
            className="reset-filter-button"
            onClick={() => setFilters({ color: "", style: "" })}
          >
            Reset Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="saree-grid">
          {filteredSarees.length > 0 ? (
            filteredSarees.map((saree) => {
              const productId = saree._id;
              if (!productId) return null;

              return (
                <div key={productId} className="saree-card">
                  <Link to={`/ProductPage/${productId}`} state={{ saree }}>
                    <img src={saree.image} alt={saree.name} />
                    <h3>{saree.name}</h3>
                    <div className="card-actions">
                      <button className="add-btn">
                        <FaShoppingCart />
                        Add&nbsp;to&nbsp;Cart
                      </button>
                      <button className="wish-btn">
                        <FaHeart />
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No sarees found matching your filters.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CataloguePage;
