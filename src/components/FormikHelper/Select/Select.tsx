import { useField } from "formik";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import { ICategories } from "../../../types";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import "./Select.scss";

interface ISelect {
  name: string;
  label: string;
  setFieldValue?: (field: string, value: number[]) => void;
}

const Select = ({ name, label, setFieldValue }: ISelect) => {
  const [field] = useField(name);
  const [showOptions, setShowOptions] = useState(false);
  const [touched, setTouched] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategories[]>(
    JSON.parse(sessionStorage.getItem("categories")!) || []
  );

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(selectedCategories));
  }, [selectedCategories, name]);

  const handleCategories = (category: ICategories) => {
    const exists = selectedCategories.some(
      (selectedCategory) => selectedCategory.id === category.id
    );

    if (!exists) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        category,
      ]);
    }

    if (!field.value.includes(category)) {
      setFieldValue!(name, [...field.value, category]);
    }
  };

  const handleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleRemoveCategory = (id: number) => {
    const filteredCategories = selectedCategories.filter(
      (item) => item.id !== id
    );

    setSelectedCategories(filteredCategories);

    setFieldValue!(
      name,
      field.value.filter((item: ICategories) => item.id !== id)
    );
    setTouched(true);
  };

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

  const hasError = field.value.length <= 0 && touched;

  return (
    <div className="selectWrapper">
      <h3>{label}</h3>
      <div
        className={
          hasError
            ? "select select-invalid"
            : field.value.length > 0
            ? "select select-valid"
            : "select"
        }
        onClick={handleOptions}
      >
        {selectedCategories.length === 0
          ? "შეიყვნეთ სათაური"
          : field.value.map((item: ICategories) => (
              <div
                key={`selected_category_${item.id}`}
                style={{
                  backgroundColor: item.background_color,
                  color: item.text_color,
                }}
                className="select__category"
              >
                {item.title}
                <IoIosClose onClick={() => handleRemoveCategory(item.id)} />
              </div>
            ))}
        <div
          className="select__btnWrapper"
          style={{
            backgroundColor: `${hasError ? "rgba(250, 242, 243, 1)" : ""}`,
          }}
        >
          <IoIosArrowDown />
        </div>
      </div>
      {showOptions && (
        <div className="select__options">
          {categories.map((item) => (
            <label
              key={item.id}
              style={{
                backgroundColor: item.background_color,
                color: item.text_color,
              }}
              onClick={() => handleCategories(item)}
            >
              {item.title}
              <input
                name={name}
                id={item.id.toString()}
                type="radio"
                value={item.id}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
