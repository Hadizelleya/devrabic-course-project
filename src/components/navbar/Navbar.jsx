import { Link } from "react-router-dom";
import useWindowSize from "../../utils/useWindowSize";
import MobileMenu from "./mobile-menu/MobileMenu";
import DesktopMenu from "./desktop menu/DesktopMenu";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { width } = useWindowSize();
  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  useEffect(() => {
    if (width > 800) {
      setIsMenuOpened(false);
    }
  }, [width]);

  return (
    <div>
      <div className="navbar">
        <div className="navbar__left-side">
          <Link to="/">
            <div className="navbar__left-side__logo">
              <span className="navbar__left-side__logo__text">
                DEVRABIC <b>ECOM</b> STORE
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar__right-side">
          {width < 800 ? (
            isMenuOpened ? (
              <IoCloseSharp
                className="navbar__right-side__icon"
                onClick={toggleMenu}
              />
            ) : (
              <GiHamburgerMenu
                className="navbar__right-side__icon"
                onClick={toggleMenu}
              />
            )
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>
      {isMenuOpened && <MobileMenu toggleMenu={toggleMenu} />}
    </div>
  );
}
