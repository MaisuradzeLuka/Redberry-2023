import "./Button.scss";

interface IButton {
  children: string;
  type: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, type, className, onClick }: IButton) => {
  return (
    <button className={`btn ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
