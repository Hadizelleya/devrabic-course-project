import ProductCard from "../../components/product-card/ProductCard";
import { products } from "../../utils/products";
import { useContext } from "react";
import MainContext from "../../utils/context";
export default function Products() {
  const { user, loading, filteredProducts } = useContext(MainContext);
  return loading ? (
    <div className="cart__message">Loading...</div>
  ) : (
    <div className="products-container">
      {user
        ? filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
