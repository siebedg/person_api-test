import { tv } from "tailwind-variants";

interface HeaderProps {
  size: "small" | "medium" | "large";
  color: "blue" | "red" | "green" | "yellow";
}

const header = tv({
  base: "text-3xl",
  variants: {
    size: {
      small: "text-xl",
      medium: "text-2xl",
      large: "text-3xl",
    },
    color: {
      blue: "bg-blue-500",
      red: "bg-red-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
    },
  },
});
const Header = ({ size, color }: HeaderProps) => {
  return <div className={header({ size, color })}>Search for a person</div>;
};

export default Header;
