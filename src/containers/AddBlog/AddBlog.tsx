import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { Button, FormikHelper } from "../../components";
import * as Yup from "yup";
import { IInitialValues } from "../../types";
import { postWithToken } from "../../utils/fetchData";
import "./AddBlog.scss";

const initialValues: IInitialValues = {
  author: sessionStorage.getItem("author") || "",
  title: sessionStorage.getItem("title") || "",
  desc: sessionStorage.getItem("desc") || "",
  releaseDate: sessionStorage.getItem("releaseDate") || "",
  categories: JSON.parse(sessionStorage.getItem("categories")!) || [],
  email: sessionStorage.getItem("email") || "",
  image: JSON.parse(sessionStorage.getItem("image")!) || { name: "", url: "" },
};

const AddBlog = () => {
  const validationSchema = Yup.object({
    author: Yup.string().required("Skill is required field"),
    releaseDate: Yup.date().required("გამოქვეყნების თარიღი სავალდებულოა"),
    title: Yup.string().required().min(2),
    desc: Yup.string().required().min(2),
    image: Yup.object().shape({
      name: Yup.string().required("Image name is required"),
      url: Yup.mixed().required("Image URL is required"),
    }),
    email: Yup.string().test(
      "is-valid-email",
      "მეილი უნდა მთავრდებოდეს @redberry.ge-ით",
      function (value) {
        if (!value) {
          return true;
        }
        return Yup.string()
          .email()
          .matches(/@redberry\.ge$/)
          .isValidSync(value);
      }
    ),
  });

  const onSubmit = (
    values: IInitialValues,
    { resetForm }: FormikHelpers<IInitialValues>
  ) => {
    postBlog(values);

    // resetForm();
  };

  const convertImageToBlob = (image: string) => {
    const blob = dataUrlToBlob(image);
    const file = new File([blob], "myFileName", { type: "image/png" });
    function dataUrlToBlob(image: string) {
      const parts = image.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const byteCharacters = atob(parts[1]);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const byteArray = new Uint8Array(byteArrays);
      return new Blob([byteArray], { type: contentType });
    }
    return file;
  };

  const postBlog = async (values: IInitialValues) => {
    const categoryIds = values.categories.map((item) => item.id);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.desc);

    const imageFile = convertImageToBlob(values.image.url);

    formData.append("image", imageFile);

    formData.append("publish_date", values.releaseDate);
    formData.append("author", values.author);

    formData.append("categories", JSON.stringify([...categoryIds]));

    values.email && formData.append("email", values.email);

    try {
      await postWithToken(
        "https://api.blog.redberryinternship.ge/api/blogs",
        formData
      );
    } catch (error) {
      console.error("Could not create blog", error);
      return false;
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(props) => {
        const isValid = props.isValid && props.values.categories.length > 0;

        console.log(props.values.categories);

        return (
          <Form className="addBlog">
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
                info={"მინიმუმ 2 სიმბოლო"}
              />
            </div>

            <FormikHelper
              control="textarea"
              name="desc"
              id="desc"
              label="აღწერა*"
              placeholder="შეიყვნეთ აღწერა"
              info={"მინიმუმ 2 სიმბოლო"}
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
                setFieldValue={props.setFieldValue}
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
              type="submit"
              className="addBlog__submitBtn"
              dissabled={!isValid || props.isSubmitting}
            >
              ბლოგის დამატება
            </Button>

            <Link to="/">
              <button type="button" className="addBlog__backBtn">
                <FaChevronLeft />
              </button>
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddBlog;
