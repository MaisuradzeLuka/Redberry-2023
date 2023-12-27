import { FaFolderPlus } from "react-icons/fa6";
import { BsImage } from "react-icons/bs";
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";
import { Field, FieldProps, useField } from "formik";
import "./ImageInput.scss";
import { useEffect } from "react";

interface IImageInput {
  name: string;
  id: string;
  label: string;
}

const ImageInput = ({ name, label, id }: IImageInput) => {
  const [field, meta] = useField(name);

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(field.value));
  }, [field.value, name]);

  const fileSelectorHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: { name: string; url: string }) => void
  ) => {
    const imageData = e.target.files?.[0];

    if (imageData) {
      const reader = new FileReader();
      reader.readAsDataURL(imageData);

      reader.onload = () => {
        // const file = convertImageToBlob(reader.result as string);

        setFieldValue("image", {
          name: imageData.name,
          url: reader.result as string,
        });
      };
    }
  };

  const removeFileHandler = (
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue("image", "");
  };

  return (
    <>
      <Field name={name}>
        {(props: FieldProps) => {
          if (props.field.value.url) {
            return (
              <div className="addedImg">
                <BsImage />
                <p>{props.field.value.name}</p>
                <button
                  type="button"
                  onClick={() => removeFileHandler(props.form.setFieldValue)}
                  className="addedImg__closeBtn"
                >
                  <IoMdClose />
                </button>
              </div>
            );
          } else {
            return (
              <>
                <div className="imgWrapper">
                  <label htmlFor="image" className="imgWrapper__imageLabel">
                    {label}
                  </label>
                  {}
                  <label
                    htmlFor={id}
                    className={`${
                      meta.touched && meta.error
                        ? "imgWrapper__inputWrapper invalid"
                        : "imgWrapper__inputWrapper"
                    }`}
                  >
                    <FaFolderPlus />
                    <p>ჩააგდეთ ფაილი აქ ან აირჩიეთ ფაილი</p>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        fileSelectorHandler(e, props.form.setFieldValue)
                      }
                      accept="image/*"
                      id={id}
                    />
                  </label>
                </div>
                {meta.touched && meta.error && (
                  <p>
                    <span>
                      <IoIosInformationCircle />
                    </span>
                    {"ფოტო აუცილებელია"}
                  </p>
                )}
              </>
            );
          }
        }}
      </Field>
    </>
  );
};

export default ImageInput;
