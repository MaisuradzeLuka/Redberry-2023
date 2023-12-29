import { Field, useField } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import { useEffect } from "react";
import "./Input.scss";

interface IInput {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  info?: string | string[];
}

interface IRenderListItem {
  text: string;
  regex: RegExp;
}

const Input = ({ id, name, label, placeholder, info }: IInput) => {
  const patterns = {
    mimum: /^.{4,}$/,
    wordCount: /^(\S+\s+\S+)/,
    georgian: /^[\u10A0-\u10FF\s]+$/u,
  };

  const [field, meta] = useField(name);

  useEffect(() => {
    sessionStorage.setItem(name, field.value);
  }, [field.value, name]);

  const renderListItem = ({ text, regex }: IRenderListItem) => {
    const isValid = regex.test(field.value);

    const hasError =
      (meta.touched && !isValid) || (field.value.length > 0 && !isValid);

    return (
      <li
        style={{
          color: hasError
            ? "rgba(234, 25, 25, 1)"
            : isValid
            ? "rgba(20, 216, 28, 1)"
            : "",

          listStyle: "initial",
        }}
      >
        {text}
      </li>
    );
  };

  const handleInfoText = (text: string | string[]) => {
    if (typeof text === "string") {
      const hasError =
        (meta.touched && meta.error) || (field.value.length > 0 && meta.error);
      return (
        <div
          className="infoWrapper"
          style={{
            color: hasError
              ? "rgba(234, 25, 25, 1)"
              : field.value.length >= 2
              ? "rgba(20, 216, 28, 1)"
              : "",
          }}
        >
          <span>{hasError && <IoIosInformationCircle />}</span>
          <p>{text}</p>
        </div>
      );
    } else {
      return (
        <div className="infoWrapper">
          <ul>
            <>{renderListItem({ text: text[0], regex: patterns.mimum })}</>
            <>{renderListItem({ text: text[1], regex: patterns.wordCount })}</>
            <>{renderListItem({ text: text[2], regex: patterns.georgian })}</>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {() => {
          return (
            <div
              className={`inputWrapper ${
                meta.touched && meta.error
                  ? "inputWrapper--invalid"
                  : meta.touched
                  ? "inputWrapper--valid"
                  : ""
              }`}
            >
              <input type="text" placeholder={placeholder} id={id} {...field} />

              {info ? (
                handleInfoText(info)
              ) : (
                <>
                  {meta.touched && meta.error && (
                    <div
                      className="infoWrapper"
                      style={{
                        color:
                          meta.touched && meta.error
                            ? "rgba(234, 25, 25, 1)"
                            : meta.touched && !meta.error
                            ? "rgba(20, 216, 28, 1)"
                            : "",
                      }}
                    >
                      <span>
                        <IoIosInformationCircle />
                      </span>
                      <p>{meta.error}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
