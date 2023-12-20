import { useEffect, useState } from "react";
import blogBg from "../../assets/Blog-bg.png";
import { fetchData, fetchWithToken } from "../../utils/fetchData";

import "./Home.scss";

interface ICategories {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

const Home = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await fetchWithToken(
          "https://api.blog.redberryinternship.ge/api/blogs"
        );

        setBlogs(data);
      })();
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await fetchData(
          "https://api.blog.redberryinternship.ge/api/categories"
        );

        setCategories(data);
      })();
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  }, []);

  const handleCategories = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1>ბლოგი</h1>
        <div>
          <img src={blogBg} alt="background_image" />
        </div>
      </header>
      <section className="home__section">
        <ul className="categories">
          {categories.map((item) => (
            <button
              onClick={() => handleCategories(item.id)}
              key={item.id}
              className={selectedCategories.includes(item.id) ? "active" : ""}
            >
              <li
                style={{
                  color: item.text_color,
                  background: item.background_color,
                }}
              >
                {item.title}
              </li>
            </button>
          ))}
        </ul>
        <div>
          {blogs.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
