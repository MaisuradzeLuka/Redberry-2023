import { useEffect, useState } from "react";
import blogBg from "../../assets/Blog-bg.png";
import { fetchData } from "../../utils/fetchData";

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

  const convertToRgba = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, 0.08)`;
  };

  const fetchWithToken = async (url: string, method = "GET") => {
    const token = await fetchData(
      "https://api.blog.redberryinternship.ge/api/token"
    );

    return fetchData(url, {
      method,
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    });
  };

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

        const newArr = data.filter((item: { id: number }) => item.id <= 6);

        setCategories(newArr);
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
                  background: convertToRgba(item.background_color),
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
