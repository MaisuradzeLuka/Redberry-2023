import "./Button.scss";

interface IButton {
  children: string;
  type: "submit" | "reset" | "button";
  className?: string;
  dissabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type,
  className,
  onClick,
  dissabled = false,
}: IButton) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={dissabled}
    >
      {children}
    </button>
  );
};

export default Button;
