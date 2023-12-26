import { Field, FieldProps } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import "./TextArea.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  info?: string | string[];
}

const TextArea = ({ id, name, label, placeholder, info }: IDate) => {
  return (
    <div className="textArea">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {(props: FieldProps) => {
          const { field, meta } = props;

          return (
            <div
              className={`${
                meta.error && meta.touched
                  ? "textAreaWrapper--invalid"
                  : meta.touched
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
