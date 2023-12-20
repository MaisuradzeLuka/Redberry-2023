import logo from "../../assets/LOGO.png";

import { Button } from "../";

import "./Navbar.scss";
import { Link } from "react-router-dom";

interface IUserLogin {
  loggedIn: boolean;
  handleShowModal: () => void;
  handleLoggedChange: () => void;
}

const Navbar = ({
  loggedIn,
  handleShowModal,
  handleLoggedChange,
}: IUserLogin) => {
  return (
    <nav className="navBar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div>
        {loggedIn ? (
          <div className="navBar__btnWrapper">
            <Link to="addBlog">
              <Button type="button">დაამატე ბლოგი</Button>
            </Link>
            <Button type="button" onClick={handleLoggedChange}>
              გამოსვლა
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={handleShowModal}>
            შესვლა
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
