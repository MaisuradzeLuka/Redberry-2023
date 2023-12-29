import { Button } from "../";
import { IUserLogin } from "../../types";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/LOGO.png";

import "./Navbar.scss";

const Navbar = ({ loggedIn, handleShowModal }: IUserLogin) => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <nav
      className={`${pathname !== "/addBlog" ? "navBar" : "navBar addBlogNav"}`}
    >
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      {pathname !== "/addBlog" && (
        <div>
          {loggedIn ? (
            <div className="navBar__btnWrapper">
              <Link to="addBlog">
                <Button type="button">დაამატე ბლოგი</Button>
              </Link>
              <Link to="/"></Link>
            </div>
          ) : (
            <Button type="button" onClick={handleShowModal}>
              შესვლა
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
