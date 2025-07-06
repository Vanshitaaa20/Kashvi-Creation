import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import "./Homepage.css";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid1";
import Collection from "./components/Collection";
import AboutUs from "./components/AboutUsmain";
import Footer from "./components/Footer";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.modern-nav');
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="modern-app">
      <nav className="modern-nav">
        <div className="nav-brand">
          <img src="/IMG-20250204-WA0006l.jpg" alt="Kashvi Logo" className="logo-img" />
        </div>
        <motion.div
          className="welcome-message"
          initial={{ x: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",  // Moves back to initial position after each loop
            ease: "easeInOut",
          }}
        >
          <span>Welcome to Kashvi Creation</span>
        </motion.div>

        <div className={`nav-items ${menuOpen ? "active" : ""}`}>
          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle dropdown menu"
              aria-expanded={dropdownOpen}
            >
              Explore
              <FaChevronRight className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />
            </button>

            <div
              className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <ul>
                <li><Link to="/" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Home</Link></li>
                <li><Link to="/shop" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Shop</Link></li>
                <li><Link to="/about" className="dropdown-link" onClick={() => setDropdownOpen(false)}>About</Link></li>
                <li><Link to="/blogs" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Blog</Link></li>
                <li><Link to="/contact" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search"><FaSearch /></button>
            <button className="icon-btn" aria-label="User Profile"><FaUser /></button>
            <button className="icon-btn" aria-label="Favorites"><FaHeart /></button>
            <button className="icon-btn cart-btn" aria-label="Shopping Cart">
              <FaShoppingCart />
              <span className="cart-badge">3</span>
            </button>
          </div>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <main>
        <Hero />
        <ProductGrid />
        <Collection />
        <AboutUs />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
