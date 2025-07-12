import React from "react";
import "./Homepage.css";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid1";
import Collection from "./components/Collection";
import AboutUs from "./components/AboutUsmain";
import Footer from "./components/Footer";
import Navbar from "./components/navbar"; // 👈 Import the new component

function Home() {
  return (
    <div className="modern-app">
      <Navbar /> {/* ✅ Use the component */}
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
