import { Routes, Route } from "react-router-dom";
import { Navbar, UserLogin } from "./components";
import { Home, Blog, AddBlog } from "./containers";

import "./App.scss";
import { useState } from "react";

const App = () => {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const storedLoggedIn = sessionStorage.getItem("loggedin");
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(storedLoggedIn ?? "false")
  );

  const handleUserLoginChange = () => {
    setShowUserLogin((prev) => !prev);
  };

  const handleLoggedChange = () => {
    setLoggedIn((prev: boolean) => !prev);
    sessionStorage.setItem("loggedin", JSON.stringify(!loggedIn));
  };

  return (
    <>
      {showUserLogin && (
        <UserLogin
          handleLoggedChange={handleLoggedChange}
          handleShowModal={handleUserLoginChange}
          loggedIn={loggedIn}
        />
      )}
      <Navbar
        loggedIn={loggedIn}
        handleShowModal={handleUserLoginChange}
        handleLoggedChange={handleLoggedChange}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
};

export default App;
