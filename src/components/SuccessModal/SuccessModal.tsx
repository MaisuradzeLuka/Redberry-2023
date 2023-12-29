import { Button } from "..";
import { IoMdClose } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "./SuccessModal.scss";

interface IUserLogin {
  handleShowModal: (value: boolean) => void;
}

const UserLogin = ({ handleShowModal }: IUserLogin) => {
  return (
    <div className="overlay">
      <form className="successModal">
        <IoMdClose
          className="successModal__close"
          onClick={() => handleShowModal(false)}
        />

        <div className="successModal__info">
          <FaCircleCheck />
          <h2>ჩანაწერი წარმატებით დაემატა</h2>
        </div>

        <Link to="/">
          <Button type="button" onClick={() => handleShowModal(false)}>
            მთავარ გვერდზე დაბრუნება
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default UserLogin;
