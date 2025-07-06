import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

const slides = [
  {
    id: 1,
    type: "video",
    src: "/Untitled video - Made with Clipchamp.mp4",
    title: "प्रेम और विश्वास का अनोखा संगम",
    description: "Discover the finest handcrafted sarees"
  },
  {
    id: 2,
    type: "image", 
    src: "/360_F_98784649_tWwDkRMkBlNBzgFPgIyHz25yfq8IvLQf.jpg",
    title: "Elegance in Every Thread",
    description: "Explore our exclusive collection"
  },
  {
    id: 3,
    type: "image",
    src: "/🌙.jpeg", 
    title: "Tradition Meets Modernity",
    description: "Experience the beauty of tradition"
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsVideoReady(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsVideoReady(false);
  };

  // Handle video playback when slide changes
  useEffect(() => {
    if (slides[currentSlide].type === "video" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [currentSlide]);

  return (
    <div className="hero">
      {/* Background Media */}
      {slides[currentSlide].type === "video" ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="slide-media"
          onCanPlay={() => setIsVideoReady(true)}
          style={{ opacity: isVideoReady ? 1 : 0 }}
        >
          <source src={slides[currentSlide].src} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="slide-media" 
          style={{ 
            backgroundImage: `url(${slides[currentSlide].src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Black Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
        <button className="shop-btn">Shop Now</button>
      </div>

      {/* Navigation */}
      <button className="prev-btn" onClick={prevSlide}>❮</button>
      <button className="next-btn" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Hero;
