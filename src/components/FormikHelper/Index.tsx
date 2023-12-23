import Input from "./Input/Input";
import TextArea from "./TextArea/TextArea";
import Date from "./Date/Date";
import ImageInput from "./ImageInput/ImageInput";
import Select from "./Select/Select";

interface IFormControlProps {
  control: "input" | "textarea" | "select" | "date" | "image";
  name: string;
  label: string;
  id: string;
  placeholder?: string;
  info?: string[] | string;
  setFieldValue?: (field: string, value: string) => void;
}

const FormikHelper = (props: IFormControlProps) => {
  const { control, ...otherProps } = props;
  switch (control) {
    case "input":
      return <Input {...otherProps} />;
    case "textarea":
      return <TextArea {...otherProps} />;
    case "date":
      return <Date {...otherProps} />;
    case "image":
      return <ImageInput {...otherProps} />;
    case "select":
      return <Select {...otherProps} />;
    default:
      return null;
  }
};

export default FormikHelper;
