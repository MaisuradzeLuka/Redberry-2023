import { Button } from "../";
import { IUserLogin } from "../../types";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";

import "./Navbar.scss";

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
            <Link to="/">
              <Button
                type="button"
                onClick={handleLoggedChange}
                className="logout"
              >
                გამოსვლა
              </Button>
            </Link>
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
