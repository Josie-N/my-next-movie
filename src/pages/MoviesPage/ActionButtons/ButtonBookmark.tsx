import React, {useState} from "react";

import {ButtonLabel, Emoji} from "../../../constants/constants";
import useBookmarkStore from "../../../store/bookmarkStore";

import Button from "../../../components/generic/Button/Button";

interface ButtonBookmarkProps {
  role?: 'primary' | 'secondary',
  buttonStyle?: "contained" | "contained-secondary",
  bookmarkId?: string,
  buttonActivationSettings?: {
    onButtonMouseEnter: (role: string) => void,
    onButtonMouseLeave: (role: string) => void,
    isSecondaryButtonLabelDisplayed: () => boolean,
    isSecondaryButtonPressed: () => boolean,
    onSecondaryButtonToggle: () => void,
  }
}

export function ButtonBookmark({role, buttonStyle, buttonActivationSettings, bookmarkId} : ButtonBookmarkProps) {
  if(!buttonStyle) {
    throw new Error("If buttonStyle comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!role) {
    throw new Error("If role comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if (!bookmarkId) throw new Error("bookmarkId is undefined.")

  const [isCardBookmarked, setCardBookmarked] = useState(false);
  const {storeBookmarkId, removeBookmarkId} = useBookmarkStore();

  const handleMouseEnter = () => buttonActivationSettings?.onButtonMouseEnter(role);
  const handleMouseLeave = () => buttonActivationSettings?.onButtonMouseLeave(role);

  const handleClickButtonBookmark = () => {
    isCardBookmarked ? removeBookmarkId(bookmarkId) : storeBookmarkId(bookmarkId);

    setCardBookmarked(!isCardBookmarked);
    buttonActivationSettings?.onSecondaryButtonToggle();
  };

  return (
    <Button variant={buttonStyle}
            type="button"
            // TO DO: We need the noto emoji for the bookmark
            hasIcon icon={Emoji.Pin}
            handleButtonClick={handleClickButtonBookmark}
            handleButtonMouseEnter={handleMouseEnter}
            handleButtonMouseLeave={handleMouseLeave}
    >
      {buttonActivationSettings?.isSecondaryButtonLabelDisplayed() ? ButtonLabel.Remember : ''}
    </Button>
  );
}
