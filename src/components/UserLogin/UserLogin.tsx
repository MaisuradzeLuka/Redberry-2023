import React, { useState } from "react";
import { Button } from "..";
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { postUserLogin } from "../../utils/fetchData";
import "./UserLogin.scss";

interface IUserLogin {
  loggedIn: boolean;
  handleShowModal: () => void;
  handleLoggedChange: () => void;
}

const UserLogin = ({
  handleShowModal,
  handleLoggedChange,
  loggedIn,
}: IUserLogin) => {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await postUserLogin(value);

    setTouched(true);

    if (response.status === 204) {
      handleLoggedChange();
    } else {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <div className="overlay">
      <form className="userLogin" onSubmit={handleSubmit}>
        {!loggedIn && <h2>შესვლა</h2>}
        <IoMdClose className="userLogin__close" onClick={handleShowModal} />
        <div className="userLogin__inputWrapper">
          {!loggedIn ? (
            <>
              <label htmlFor="email">ელ-ფოსტა</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Example@redberry.ge"
                value={value}
                onChange={handleChange}
                className={touched && !loggedIn ? "error" : ""}
              />
              {touched && !loggedIn && (
                <p>
                  <MdError />
                  ელ-ფოსტა არ მოიძებნა
                </p>
              )}
            </>
          ) : (
            <div>
              <FaCircleCheck />
              <h2>წარმატებული ავტორიზაცია</h2>
            </div>
          )}
        </div>
        {loggedIn ? (
          <Button type="button" onClick={handleShowModal}>
            კარგი
          </Button>
        ) : (
          <Button type="submit">შესვლა</Button>
        )}
      </form>
    </div>
  );
};

export default UserLogin;
