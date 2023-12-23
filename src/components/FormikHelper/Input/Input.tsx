import { Field } from "formik";
import "./Input.scss";

interface IInput {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

const Input = ({ id, name, label, placeholder }: IInput) => {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <Field name={name} id={id} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
