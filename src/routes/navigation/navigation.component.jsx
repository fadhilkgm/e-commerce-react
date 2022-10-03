import { useContext } from "react";
import { Outlet} from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from "./navigation.styles";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "./../../components/Cart/cart-icon/CartIcon";
import CartDropdown from "./../../components/Cart/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../store/user/user.selector";



const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
