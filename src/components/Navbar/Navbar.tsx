import logo from "../../assets/LOGO.png";

import { Button } from "../";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navBar">
      <img src={logo} alt="logo" />
      <div>
        <Button type="button">შესვლა</Button>
      </div>
    </nav>
  );
};

export default Navbar;
