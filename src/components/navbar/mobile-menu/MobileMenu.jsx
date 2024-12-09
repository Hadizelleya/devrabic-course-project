import React from "react";
import MainContext from "../../../utils/context";
import { TailSpin } from "react-loader-spinner";
import { useContext } from "react";
import { signOutUser } from "../../../utils/fireBaseFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isStoreSelected, isCartSelected } from "../../../utils/cheeckRoutes";
export default function MobileMenu({ toggleMenu }) {
  const { user, loading, cartProducts } = useContext(MainContext);
  const loc = useLocation();
  const navigate = useNavigate();
  const signOut = async () => {
    await signOutUser();
  };
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__content">
        <Link
          to="/"
          className={`mobile-menu__content__item ${
            isStoreSelected(loc.pathname) &&
            "mobile-menu__content__item--selected"
          }`}
          onClick={toggleMenu}
        >
          Store
        </Link>
        <Link
          to="/cart"
          className={`mobile-menu__content__item ${
            isCartSelected(loc.pathname) &&
            "mobile-menu__content__item--selected"
          }`}
          onClick={toggleMenu}
        >
          Cart
          {user && cartProducts.length > 0 ? (
            <span className="mobile-menu__content__item__cartCount">
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
          <button
            onClick={() => {
              signOut();
              toggleMenu();
            }}
            className="mobile-menu__content__btn"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/auth");
              toggleMenu();
            }}
            className="mobile-menu__content__btn"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
