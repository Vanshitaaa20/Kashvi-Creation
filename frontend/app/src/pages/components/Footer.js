import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section footer-logo">
          <h2>Kashvi Creation</h2>
          <p>प्रेम और विश्वास का अनोखा संगम</p>
        </div>

        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Pinterest"><FaPinterestP /></a>
          </div>
        </div>

        <div className="footer-section footer-newsletter">
          <h3>Join Our Newsletter</h3>
          <p>Stay updated with our latest collections and offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Kashvi Creation. All Rights Reserved.</p>
        <p className="footer-credit">Built by Team Frostbyte (GWoC'25)</p>
      </div>
    </footer>
  );
}

export default Footer;
