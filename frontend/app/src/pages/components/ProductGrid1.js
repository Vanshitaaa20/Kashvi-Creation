import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "./ProductGrid1.css";

const products = [
  {
    id: 20341,
    name: "Crimson Red with Golden Embroidery",
    video: "/videos/01.mp4",
  },
  {
    id: 20342,
    name: "Emerald Green with Intricate Gold Embroidery",
    video: "/videos/02.mp4",
  },
  {
    id: 20343,
    name: "Rich Maroon with Gold Embroidery",
    video: "/videos/03.mp4",
  },
  {
    id: 20344,
    name: "Serene Blue with Gold Embroidery",
    video: "/videos/05.mp4",
  },
];

export default function ProductGridmain() {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cards = trackRef.current?.children;
    if (!cards) return;
    [...cards].forEach((card, i) => {
      card.style.opacity = 0;
      card.style.transform = "translateY(25px)";
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
        card.style.transition = "all .45s ease";
      }, 150 * i);
    });
  }, []);

  return (
    <section className="product-section">
      {/* heading */}
      <header className="product-header">
        <h2>Featured Collection</h2>
        <a href="/collections">View All Collection →</a>
      </header>

      {/* track */}
      <div className="slider-wrapper">
        <div className="product-grid" ref={trackRef}>
          {products.map((p) => (
            <div
              className="product-card"
              key={p.id}
              onClick={() => navigate(`/ProductPage/${p._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-link">
                <div className="card-img">
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="product-video"
                  />
                  <span className="card-code">{p.id}</span>
                </div>
                <p className="card-name">{p.name}</p>
              </div>

              <div className="card-actions">
                <button className="add-btn" onClick={(e) => e.stopPropagation()}>
                  <FaShoppingCart aria-hidden="true" />
                  Add&nbsp;to&nbsp;Cart
                </button>
                <button className="wish-btn" onClick={(e) => e.stopPropagation()}>
                  <FaHeart aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
