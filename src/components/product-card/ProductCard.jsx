import { useContext } from "react";
import MainContext from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { updateArrayData } from "../../utils/fireBaseFunctions";

export default function ProductCard({ product }) {
  const { title, price, wasPrice, imageUrl, description } = product;
  const { user } = useContext(MainContext);
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/auth");
  };
  const addToCart = async () => {
    await updateArrayData(product);
  };
  return (
    <div className="product-card">
      <div className="product-card__content">
        <img
          className="product-card__content__image"
          src={imageUrl}
          alt="product"
        ></img>
        <div className="product-card__content__title">{title}</div>
        <div className="product-card__content__price">
          {price}
          <span className="product-card__content__price__slash">
            {wasPrice}
          </span>
        </div>
        <div className="product-card__content__desc">{description}</div>
      </div>
      <button
        onClick={user ? addToCart : redirect}
        className="product-card__button"
      >
        Add To Cart
      </button>
    </div>
  );
}
