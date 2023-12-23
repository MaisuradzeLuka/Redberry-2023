import { Field } from "formik";
import "./TextArea.scss";

interface ITextAres {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

const TextArea = ({ id, name, label, placeholder }: ITextAres) => {
  return (
    <div className="textarea">
      <label htmlFor={id}>{label}</label>
      <Field name={name} id={id} as="textarea" placeholder={placeholder} />
    </div>
  );
};

export default TextArea;
