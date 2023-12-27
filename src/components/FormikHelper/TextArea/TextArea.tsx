import { Field, useField } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import { useEffect } from "react";
import "./TextArea.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  info?: string | string[];
}

const TextArea = ({ id, name, label, placeholder, info }: IDate) => {
  const [field, meta] = useField(name);

  useEffect(() => {
    sessionStorage.setItem(name, field.value);
  }, [field.value, name]);

  const hasError =
    (meta.touched && meta.error) ||
    (field.value.length > 0 && field.value.length < 2);

  return (
    <div className="textArea">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {() => {
          return (
            <div
              className={`${
                hasError
                  ? "textAreaWrapper--invalid"
                  : field.value.length >= 2
                  ? "textAreaWrapper--valid"
                  : ""
              }`}
            >
              <textarea placeholder={placeholder} id={id} {...field} />

              <p>
                <span>
                  {meta.touched && meta.error && <IoIosInformationCircle />}
                </span>
                {info}
              </p>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default TextArea;
