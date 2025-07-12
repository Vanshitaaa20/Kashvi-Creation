import React, { useEffect, useState, useRef } from "react";
import "./ProductGrid2.css";

function Collectiongrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="featured-section" ref={sectionRef}>
      <h2 className={`featured-heading ${isVisible ? "glow" : ""}`}>
        FEATURED COLLECTION
      </h2>
      <div className="featured-grid">
        {[...Array(4)].map((_, index) => (
          <div
            className={`featured-card ${isVisible ? "zoom-in" : ""}`}
            key={index}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img
              src={`/images/product${index + 1}.jpg`}
              alt={`Product ${index + 1}`}
              className="featured-image"
            />
            <p>Product {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collectiongrid;
