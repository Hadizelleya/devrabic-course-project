import { MdDelete } from "react-icons/md";
import { removeArrayData } from "../../utils/fireBaseFunctions";

export default function CartCard({ product }) {
  const { imageUrl, name, description, price } = product;
  const deleteProduct = async () => {
    await removeArrayData(product);
  };
  return (
    <div className="cart-card">
      <img className="cart-card__image" src={imageUrl} alt="cart-card" />
      <h2 className="cart-card__title">{name}</h2>
      <p className="cart-card__desc">{description}</p>
      <p className="cart-card__price">{price} $ </p>
      <MdDelete onClick={deleteProduct} className="cart-card__icon" />
    </div>
  );
}
