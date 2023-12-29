import * as Yup from "yup";

export const validationSchema = Yup.object({
  author: Yup.string()
    .min(4, "მინიმუმ 4 სიმბოლო")
    .test("word-count", "მინიმუმ 2 სიტყვა", (value) =>
      /^(\S+\s+\S+)/.test(value!)
    )
    .test("georgian-characters", "მხოლოდ ქართული სიმბოლოები", (value) =>
      /^[\u10A0-\u10FF\s]+$/u.test(value!)
    )
    .required(),
  releaseDate: Yup.date().required("გამოქვეყნების თარიღი აუცილებელია"),
  title: Yup.string().required("მინიმუმ 2 სიმბოლო").min(2),
  desc: Yup.string().required("მინიმუმ 2 სიმბოლო").min(2),
  image: Yup.object().shape({
    name: Yup.string().required(),
    url: Yup.string().required(),
  }),
  email: Yup.string().test(
    "email validation",
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
