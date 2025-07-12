import React from "react";
import "./AboutUsmain.css";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-details" style={{ color: "#180e31" }}>
        <h3 className="about-subtitle">Our Story</h3>
        <h2 className="about-main-title">About Kashvi Creation</h2>
        <p className="about-description">
          Welcome to Kashvi Creation, where tradition meets elegance.
        </p>
        <p className="about-description">
          At Kashvi Creation, we take pride in crafting exquisite sarees that blend heritage, craftsmanship, and contemporary fashion. Our journey began with a vision to bring the timeless beauty of Indian textiles to modern wardrobes.
        </p>
        <p className="about-description">
          With deep roots in India's rich weaving traditions, Kashvi Creation was founded to celebrate the artistry of skilled artisans. Every saree we offer is a masterpiece, woven with precision, care, and passion. From delicate handloom weaves to intricately embroidered designs, our collection is a tribute to the elegance of Indian ethnic wear.
        </p>
        <Link to="/about" className="about-link">Read more</Link>
      </div>
      <div className="about-photo">
        <img src="IMG-20250204-WA0006.jpg" alt="About Kashvi Creation" />
      </div>
    </div>
  );
}

export default AboutUs;
