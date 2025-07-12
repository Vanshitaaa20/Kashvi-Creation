import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import "./Catalogue.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

const CataloguePage = () => {
  const [sarees, setSarees] = useState([]);
  const [filters, setFilters] = useState({ color: "", style: "" });
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/catalogue");
        console.log("✅ API Response:", response.data);

        if (Array.isArray(response.data)) {
          setSarees(response.data);
        } else {
          console.error("❌ Unexpected API Response:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching sarees:", error);
      }
    };

    fetchSarees();
  }, []);

  const filteredSarees = sarees.filter((saree) => {
    return (
      (filters.color === "" || saree.color === filters.color) &&
      (filters.style === "" || saree.style === filters.style)
    );
  });
  return (
    <div className="explore-container">
      <Navbar />
      <h1>Our Collection</h1>

      <div className="catalogue-layout">
        {/* 🔍 Sidebar Filters */}
        <aside className="filter-sidebar">
          <h3>Filters</h3>

          <div className="filter-section">
            <h4>Category</h4>
            {["Bridal", "Designer"].map((cat) => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.style === cat}
                  onChange={() =>
                    setFilters({ ...filters, style: filters.style === cat ? "" : cat })
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
                    setFilters({ ...filters, color: filters.color === color ? "" : color })
                  }
                />
                <span style={{ color: color.toLowerCase(), fontWeight: "bold" }}>{color}</span>
              </label>
            ))}
          </div>

          <button className="reset-filter-button" onClick={() => setFilters({ color: "", style: "" })}>
            Reset Filters
          </button>
        </aside>

        {/* 🧵 Product Grid */}
        <div className="saree-grid">
          {filteredSarees.length > 0 ? (
            filteredSarees.map((saree) => {
              const productId = saree._id;
              if (!productId) return null;

              return (
                <div key={productId} className="saree-card">
                  <Link to={`/product/${productId}`} state={{ saree }}>
                    <img src={saree.image} alt={saree.name} />
                    <h3>{saree.name}</h3>
                    <div className="card-actions">
                      <button className="add-btn">
                        <FaShoppingCart aria-hidden />
                        Add&nbsp;to&nbsp;Cart
                      </button>
                      <button className="wish-btn">
                        <FaHeart aria-hidden />
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

}

export default CataloguePage;
