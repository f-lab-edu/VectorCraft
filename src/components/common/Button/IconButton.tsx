import { IconButtonProps } from "@/types/components/button";

export const IconButton = ({
  icon,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button className={` ${className}`} {...props}>
      {icon}
    </button>
  );
};
