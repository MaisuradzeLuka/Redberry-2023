import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Blog, AddBlog } from "./containers";

import "./App.scss";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
};

export default App;
