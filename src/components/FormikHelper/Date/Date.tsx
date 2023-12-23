import { Field } from "formik";
import "./Date.scss";

interface IDate {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

const Date = ({ id, name, label, placeholder }: IDate) => {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <Field name={name} id={id} type="date" placeholder={placeholder} />
    </div>
  );
};

export default Date;
