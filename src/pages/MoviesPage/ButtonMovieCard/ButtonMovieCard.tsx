import Button from "../../../components/generic/Button/Button";
import React from "react";


type Props = {
  name: string,
  icon: string,
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ButtonMovieCard({ name, icon, handleButtonClick }: Props) {
  return (
    <Button variant="contained" type="button"
            hasIcon icon={icon}
            handleButtonClick={handleButtonClick}>
      {name}
    </Button>
  )
}
