import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      console.log("Product ID requested:", id);
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product: ", err);
    }
  };

  fetchProduct();
}, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </div>
  );
}

export default ProductPage;
