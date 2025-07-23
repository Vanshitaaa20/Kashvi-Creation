import React from "react";
import "./Homepage.css";
import Hero from "./components/Hero";
import ProductGridmain from "./components/ProductGrid1";
import Collection from "./components/Collection";
import AboutUs from "./components/AboutUsmain";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";

function Home() {
  return (
    <div className="modern-app">
      <Navbar />
      <main>
        <Hero />
        <ProductGridmain />
        <Collection />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
