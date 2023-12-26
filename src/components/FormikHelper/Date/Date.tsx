import { Field, FieldProps } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import "./Date.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

const Date = ({ id, name, label, placeholder }: IDate) => {
  return (
    <div className="date">
      <label htmlFor={id}>{label}</label>
      <Field name={name}>
        {(props: FieldProps) => {
          const { field, meta } = props;

          return (
            <div
              className={`${
                meta.error && meta.touched
                  ? "dateWrapper--invalid"
                  : meta.touched
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
