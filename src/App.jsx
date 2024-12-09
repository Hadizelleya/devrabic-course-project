import Navbar from "./components/navbar/Navbar";
import "./App.scss";
import Products from "./pages/products/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Authentication from "./pages/auth/Authentication";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/fireBaseConfig";
import { fetchUser, setupListener } from "./utils/fireBaseFunctions";
import { useEffect, useState } from "react";
import MainContext from "./utils/context";
import { products } from "./utils/products";
function App() {
  const [user, loading] = useAuthState(auth);
  const [cartProducts, setCartProducts] = useState([]);
  const [username, setUsername] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    user && fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      setupListener(user, (data) => {
        const updatedProducts = products.filter((product) => {
          return !data.some((cartProduct) => product.id === cartProduct.id);
        });
        setFilteredProducts(updatedProducts);
        setCartProducts(data);
      });
    }
  }, [loading, user]);

  const fetchUserData = async () => {
    const res = await fetchUser(user);
    if (res.success) {
      setUsername(res.data.username);
      setCartProducts(res.data.cartsProducts);
    } else {
      console.log(res.error);
    }
  };
  return (
    <>
      <MainContext.Provider
        value={{
          user,
          filteredProducts,
          loading,
          username,
          cartProducts,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;
