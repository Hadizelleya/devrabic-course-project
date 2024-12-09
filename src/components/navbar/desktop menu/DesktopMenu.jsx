import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isStoreSelected, isCartSelected } from "../../../utils/cheeckRoutes";
import MainContext from "../../../utils/context";
import { TailSpin } from "react-loader-spinner";
import { useContext } from "react";
import { signOutUser } from "../../../utils/fireBaseFunctions";
export default function DesktopMenu() {
  const navigate = useNavigate();
  const { user, loading, cartProducts } = useContext(MainContext);
  const loc = useLocation();
  const signOut = async () => {
    await signOutUser();
  };
  return (
    <>
      <Link
        to="/"
        className={`navbar__right-side__item ${
          isStoreSelected(loc.pathname) && "navbar__right-side__item--selected"
        }`}
      >
        Store
      </Link>
      <Link
        to="/cart"
        className={`navbar__right-side__item ${
          isCartSelected(loc.pathname) && "navbar__right-side__item--selected"
        }`}
      >
        Cart
        {user && cartProducts.length > 0 ? (
          <span className="navbar__right-side__item__cartCount">
            {cartProducts.length}
          </span>
        ) : null}
      </Link>

      {loading ? (
        <TailSpin
          height="30"
          width="30"
          radius="1"
          visible={true}
          color="#3b4142"
          ariaLabel="tail-spin-loading"
          wrapperClass=""
          wrapperStyle={{}}
        />
      ) : user ? (
        <button onClick={signOut} className="navbar__right-side__button">
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/auth");
          }}
          className="navbar__right-side__button"
        >
          Login
        </button>
      )}
    </>
  );
}
