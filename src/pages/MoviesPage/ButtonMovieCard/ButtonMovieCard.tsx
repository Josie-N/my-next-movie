import Button from "../../../components/generic/Button/Button";
import React from "react";


type Props = {
  name: string,
  icon: string,
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  hasPrimaryActionButtons?: boolean
}

// ActionButton
export function ButtonMovieCard({ name, icon, handleButtonClick, handleMouseEnter, handleMouseLeave, hasPrimaryActionButtons }: Props) {
  const buttonStyle = hasPrimaryActionButtons ? 'contained' : 'contained-secondary';

  return (
     <Button variant={buttonStyle}
             type="button"
             hasIcon icon={icon}
             handleButtonClick={handleButtonClick}
             handleButtonMouseEnter={handleMouseEnter}
             handleButtonMouseLeave={handleMouseLeave}
     >
     {name}
     </Button>
  );
}
