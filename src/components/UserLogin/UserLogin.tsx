import React, { useState } from "react";
import { Button } from "..";
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { fetchData } from "../../utils/fetchData";
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

  const loginUser = async (token: string) => {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: value }),
      }
    );

    setTouched(true);

    if (response.status === 204) {
      handleLoggedChange();
    } else {
      throw new Error("Network response was not ok");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { token } = await fetchData(
        "https://api.blog.redberryinternship.ge/api/token"
      );
      await loginUser(token);
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
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
