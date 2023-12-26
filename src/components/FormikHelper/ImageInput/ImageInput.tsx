import { FaFolderPlus } from "react-icons/fa6";
import { BsImage } from "react-icons/bs";
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";
import { Field, FieldProps } from "formik";
import "./ImageInput.scss";

interface IImageInput {
  name: string;
  id: string;
  label: string;
}

const ImageInput = ({ name, label, id }: IImageInput) => {
  const fileSelectorHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: { name: string; url: string }) => void
  ) => {
    const imageData = e.target.files?.[0];

    if (imageData) {
      const reader = new FileReader();
      reader.readAsDataURL(imageData);

      reader.onload = () => {
        const file = convertImageToBlob(reader.result as string);

        setFieldValue("image", {
          name: imageData.name,
          url: file as unknown as string,
        });
      };
    }
  };

  const convertImageToBlob = (image: string) => {
    const blob = dataUrlToBlob(image);
    const file = new File([blob], "myFileName", { type: "image/png" });
    function dataUrlToBlob(image: string) {
      const parts = image.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const byteCharacters = atob(parts[1]);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const byteArray = new Uint8Array(byteArrays);
      return new Blob([byteArray], { type: contentType });
    }
    return file;
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
          const { meta, field } = props;

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
