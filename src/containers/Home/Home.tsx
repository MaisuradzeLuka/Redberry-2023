import blogBg from "../../assets/Blog-bg.png";
import { useEffect, useState } from "react";
import { fetchData, fetchWithToken } from "../../utils/fetchData";
import { BlogCard } from "../../components";
import { IBlog } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Home.scss";

interface ICategories {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

const Home = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    JSON.parse(sessionStorage.getItem("categories")!) || []
  );
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const filteredBlogs = blogs.filter((item) =>
    selectedCategories.length
      ? item.categories.some((category) =>
          selectedCategories.includes(category.id)
        ) && new Date(item.publish_date) <= new Date()
      : new Date(item.publish_date) <= new Date()
  );

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

  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(selectedCategories));
  }, [selectedCategories]);

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
        <Swiper
          mousewheel
          direction="horizontal"
          pagination={false}
          className="categories"
          spaceBetween={18}
          slidesPerView={"auto"}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "auto" }}>
              <button
                onClick={() => handleCategories(item.id)}
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="home__section__blogs">
          {filteredBlogs.map((item) => (
            <BlogCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
