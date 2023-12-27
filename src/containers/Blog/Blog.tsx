import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchWithToken } from "../../utils/fetchData";
import { IBlog } from "../../types";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BlogCard } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Blog.scss";
import "swiper/css";

const initialBlogState: IBlog = {
  author: "",
  categories: [],
  description: "",
  id: 0,
  image: "",
  publish_date: "",
  title: "",
  email: "",
};

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog>(initialBlogState);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const data = await fetchWithToken(
          `https://api.blog.redberryinternship.ge/api/blogs/${id}`
        );

        // const filteredData = blogs.filter((item) =>
        //   blog.categories.length
        //     ? item.categories.some((category) =>
        //         blog.categories.includes(category.id)
        //       ) && new Date(item.publish_date) <= new Date()
        //     : new Date(item.publish_date) <= new Date()
        // );

        setBlog(data);
      })();
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  }, [id]);

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

  return (
    <div className="individualBlog">
      <section>
        <article className="blogArticle">
          {blog.image && <img src={blog.image} alt="blog_image" />}
          <div className="blogArticle__publisher">
            <h3>{blog.author}</h3>
            <p>
              {blog.publish_date} {blog.email && <span>• {blog.email}</span>}
            </p>
          </div>
          <h2 className="blogArticle__title">{blog.title}</h2>
          <ul className="blogArticle__categories">
            {blog.categories.map((item) => (
              <button key={item.id}>
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
          <p className="blogArticle__description">{blog.description}</p>
        </article>
      </section>
      <section className="similarBlogs">
        <header>
          <h2>მსგავსი სტატიები</h2>
          <div>
            <button></button>
            <button></button>
          </div>
        </header>
        <Swiper
          className="similarBlogs__blogs"
          mousewheel
          direction="horizontal"
          slidesPerView={3}
        >
          {blogs.map((item) => (
            <SwiperSlide key={item.id}>
              text
              {/* <BlogCard {...item} /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Link to="/">
        <button type="button" className="individualBlog__backBtn">
          <FaChevronLeft />
        </button>
      </Link>
    </div>
  );
};

export default Blog;
