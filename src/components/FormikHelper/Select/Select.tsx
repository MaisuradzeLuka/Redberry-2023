import { Field } from "formik";
import "./Select.scss";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import { ICategories } from "../../../types";

interface ISelect {
  id: string;
  name: string;
  label: string;
}

const Select = ({ id, name, label }: ISelect) => {
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await fetchData(
          "https://api.blog.redberryinternship.ge/api/categories"
        );

        setCategories(data);
      })();
    } catch (error) {
      throw new Error(`Something went wrong ${error}`);
    }
  }, []);
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <Field name={name} id={id} as="select">
        {categories.map((item, index) => (
          <option
            value={index}
            key={item.id}
            style={{
              backgroundColor: item.background_color,
              color: item.text_color,
            }}
          >
            {item.title}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default Select;
