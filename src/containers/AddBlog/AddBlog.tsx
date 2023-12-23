import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Button, FormikHelper } from "../../components";
// import { fetchData } from "../../utils/fetchData";
import { IInitialValues } from "../../types";
import "./AddBlog.scss";

const initialValues: IInitialValues = {
  author: "",
  title: "",
  desc: "",
  releaseDate: "",
  categories: [1, 2],
  email: "",
  image: { name: "", url: "" },
};

const AddBlog = () => {
  const handleSubmit = () => {
    // e.preventDefault();
    // postBlog();
  };

  const postBlog = async (values: IInitialValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.desc);
    formData.append("image", values.image.url);

    formData.append("publish_date", values.releaseDate);
    formData.append("author", values.author);

    formData.append("categories", JSON.stringify([...values.categories]));

    formData.append("email", values.email);

    try {
      await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ee8383422d2845f39494dad39c16b758fc271dd640659c77e5bcc13ad277f09b`,
        },
        body: formData,
      });
    } catch (error) {
      console.error("Could not create blog", error);
      return false; // Blog creation failed
    }
  };

  const handleClick = (img: string) => {
    postBlog(img);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(props) => {
        // console.log(props.values);

        return (
          <form className="addBlog">
            <h2>ბლოგის დამატება</h2>

            <FormikHelper
              control="image"
              name="image"
              id="image"
              label="ატვირთეთ ფოტო"
            />

            <div className="addBlog__inputWrapper">
              <FormikHelper
                control="input"
                id="author"
                name="author"
                label="ავტორი*"
                placeholder="შეიყვნეთ ავტორი"
              />
              <FormikHelper
                control="input"
                id="title"
                name="title"
                label="სათაური*"
                placeholder="შეიყვნეთ სათაური"
              />
            </div>

            <FormikHelper
              control="textarea"
              name="desc"
              id="desc"
              label="აღწერა*"
              placeholder="შეიყვნეთ აღწერა"
            />

            <div className="addBlog__inputWrapper">
              <FormikHelper
                control="date"
                id="releaseDate"
                name="releaseDate"
                label="გამოქვეყნების თარიღი*"
              />
              <FormikHelper
                control="select"
                id="categories"
                name="categories"
                label="კატეგორია"
              />
            </div>

            <FormikHelper
              control="input"
              id="email"
              name="email"
              label="ელ-ფოსტა"
              placeholder="Example@redberry.ge"
            />

            <Button
              type="button"
              className="addBlog__submitBtn"
              dissabled={false}
              onClick={() => handleClick(props.values)}
            >
              ბლოგის დამატება
            </Button>

            <Link to="/">
              <button type="button" className="addBlog__backBtn">
                <FaChevronLeft />
              </button>
            </Link>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddBlog;
