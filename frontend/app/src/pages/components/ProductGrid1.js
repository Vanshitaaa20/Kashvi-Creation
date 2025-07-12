import React, { useEffect, useRef } from "react";
import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import "./ProductGrid1.css";    

const products = [
  {
    id: 20341,
    name: "Rose Pink with Golden Embroidery",
    img: "/images/product1.jpg",
  },
  {
    id: 20342,
    name: "Crimson Red with Intricate Gold Embroidery",
    img: "/images/product2.jpg",
  },
  {
    id: 20343,
    name: "Emerald Green with Gold Embroidery",
    img: "/images/product3.jpg",
  },
  {
    id: 20344,
    name: "Crimson Red with Gold Embroidery",
    img: "/images/product4.jpg",
  },
];

export default function ProductGrid() {
  const trackRef = useRef(null);

  useEffect(() => {
    const cards = trackRef.current?.children;
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
            <div className="product-card" key={p.id}>
              <a href={`/product/${p.id}`} className="card-link">
                <div className="card-img">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <span className="card-code">{p.id}</span>
                </div>
                <p className="card-name">{p.name}</p>
              </a>

              <div className="card-actions">
                <button className="add-btn">
                  <FaShoppingCart aria-hidden />
                  Add&nbsp;to&nbsp;Cart
                </button>
                <button className="wish-btn">
                  <FaHeart aria-hidden />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
