import React from "react";

import Button from "../../../components/generic/Button/Button";
import {ButtonLabel, Emoji} from "../../../constants/constants";

interface ButtonSendBackProps {
  role?: 'primary' | 'secondary',
  buttonStyle?: "contained" | "contained-secondary",
  buttonActivationSettings?: {
    onButtonMouseEnter: (role: string) => void,
    onButtonMouseLeave: (role: string) => void,
  }
}

export function ButtonSendBack({role, buttonStyle, buttonActivationSettings} : ButtonSendBackProps) {
  if(!buttonStyle) {
    throw new Error("If buttonStyle comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!role) {
    throw new Error("If role comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  const handleMouseEnter = () => buttonActivationSettings?.onButtonMouseEnter(role);
  const handleMouseLeave = () => buttonActivationSettings?.onButtonMouseLeave(role);

  return (
    <Button variant={buttonStyle}
            type="button"
            hasIcon icon={Emoji.PointingLeft}
            handleButtonClick={() => {}}
            handleButtonMouseEnter={handleMouseEnter}
            handleButtonMouseLeave={handleMouseLeave}
    >
      {ButtonLabel.Back}
    </Button>
  )
}
