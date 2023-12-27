import { Field, useField } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import { useEffect } from "react";
import "./Date.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

const Date = ({ id, name, label, placeholder }: IDate) => {
  const [field, meta] = useField(name);

  useEffect(() => {
    sessionStorage.setItem(name, field.value);
  }, [field.value, name]);

  const hasError = meta.error && meta.touched;

  return (
    <div className="date">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {() => {
          return (
            <div
              className={`${
                hasError
                  ? "dateWrapper--invalid"
                  : field.value !== ""
                  ? "dateWrapper--valid"
                  : ""
              }`}
            >
              <input type="date" placeholder={placeholder} id={id} {...field} />
              {meta.touched && meta.error && (
                <p>
                  <span>
                    <IoIosInformationCircle />
                  </span>
                  {meta.error}
                </p>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Date;
