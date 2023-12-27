import { Link } from "react-router-dom";
import { IBlog } from "../../types";
import { MdArrowOutward } from "react-icons/md";

import "./BlogCard.scss";

const BlogCard = ({
  title,
  author,
  categories,
  description,
  image,
  publish_date,
  id,
}: IBlog) => {
  const descriptionLimit = (desc: string) => {
    if (desc.length > 73) {
      return desc.slice(0, 73) + "...";
    } else {
      return desc;
    }
  };

  return (
    <article className="blog">
      <div className="blog__imgWrapper">
        <img src={image} alt="blog_image" />
      </div>
      <div className="blogDescription">
        <div className="blogDescription__releaseInfo">
          <h3>{author}</h3>
          <span>{publish_date}</span>
        </div>
        <h3>{title}</h3>
        <ul>
          {categories.map((item) => (
            <li
              key={item.id}
              style={{
                backgroundColor: item.background_color,
                color: item.text_color,
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
        <p>{descriptionLimit(description)}</p>
        <Link to={`/blog/${id}`}>
          <button>
            სრულად ნახვა <MdArrowOutward />
          </button>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
