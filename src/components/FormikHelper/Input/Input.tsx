import { Field, FieldProps } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import "./Input.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  info?: string | string[];
}

const Input = ({ id, name, label, placeholder, info }: IDate) => {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {(props: FieldProps) => {
          const { field, meta } = props;

          return (
            <div
              className={`${
                meta.touched && meta.error
                  ? "inputWrapper--invalid"
                  : meta.touched
                  ? "inputWrapper--valid"
                  : ""
              }`}
            >
              <input type="text" placeholder={placeholder} id={id} {...field} />

              <p>
                <span>
                  {meta.touched && meta.error && <IoIosInformationCircle />}
                </span>
                {info ? info : meta.error}
              </p>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
