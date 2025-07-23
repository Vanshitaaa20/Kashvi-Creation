import { useNavigate } from "react-router-dom";
import "./Collection.css";

function Collection() {
  const navigate = useNavigate();

  const collections = [
    { name: "Designer Collection", image: "../images/360_F_236948440_HkJa44cIHM2VNqIcxDjmlTIBgAbJFCEN.jpg", type: "Designer" },
    { name: "Bridal Collection", image: "../images/d6bff17c9aac7315344ecd25289d5eef.jpg", type : "Bridal" }
  ];

  return (
    <div className="collection-section">
      <h2>Our Exclusive Collection</h2>
      <div className="collection-grid">
        {collections.map((collection, index) => (
          <div
            className="collection-card"
            onClick={() => navigate(`/catalogue?type=${collection.type}`)}
            key={index}
          >

            <img src={collection.image} alt={collection.name} className="collection-image" />
            <div className="collection-overlay">
              <h3>{collection.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="catalogue-btn-container">
        <button className="catalogue-btn" onClick={() => navigate("/catalogue")}>
          View Catalogue
        </button>
      </div>
    </div>
  );
}

export default Collection;
