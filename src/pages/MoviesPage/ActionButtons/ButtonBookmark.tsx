import React, {useState} from "react";

import {ButtonLabel, Emoji} from "../../../constants/constants";
import useBookmarkStore from "../../../store/bookmarkStore";

import Button from "../../../components/generic/Button/Button";

interface ButtonBookmarkProps {
  role?: 'primary' | 'secondary',
  bookmarkId?: string,
  buttonActivationSettings?: {
    onButtonMouseEnter: (role: string) => void,
    onButtonMouseLeave: (role: string) => void,
    isSecondaryButtonLabelDisplayed: () => boolean,
    isSecondaryButtonPressed: () => boolean,
    onSecondaryButtonToggle: () => void,
  }
}

export function ButtonBookmark({role, buttonActivationSettings, bookmarkId} : ButtonBookmarkProps) {
  if(!role) {
    throw new Error("If role comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if (!bookmarkId) throw new Error("bookmarkId is undefined.")

  const [isCardBookmarked, setCardBookmarked] = useState(false);
  const {storeBookmarkId, removeBookmarkId} = useBookmarkStore();
  const bookmarkButtonStyle = buttonActivationSettings?.isSecondaryButtonLabelDisplayed() ? "contained" : "contained-secondary";

  const handleMouseEnter = () => buttonActivationSettings?.onButtonMouseEnter(role);
  const handleMouseLeave = () => buttonActivationSettings?.onButtonMouseLeave(role);

  const handleClickButtonBookmark = () => {
    //  Bug: The card can be bookmarked, but doesn't always get unbookmarked

    //  Reproduce the bug:
    //  - hover inside the bookmark button, click
    //  - leave the button surface with your cursor, then click the button again to unbookmark

    //  When it works as expected:
    //  - hover inside the bookmark button, click
    //  - stay inside the button surface with your cursor, click the button again to unbookmark

    isCardBookmarked ? removeBookmarkId(bookmarkId) : storeBookmarkId(bookmarkId);

    console.log('isCardBookmarked: ', isCardBookmarked);

    setCardBookmarked(!isCardBookmarked);
    buttonActivationSettings?.onSecondaryButtonToggle();
  };

  return (
    <Button variant={bookmarkButtonStyle}
            type="button"
            hasIcon icon={Emoji.Pin} isIconBold
            handleButtonClick={handleClickButtonBookmark}
            handleButtonMouseEnter={handleMouseEnter}
            handleButtonMouseLeave={handleMouseLeave}
    >
      {buttonActivationSettings?.isSecondaryButtonLabelDisplayed() ?
        <span style={{ marginLeft: '0.25rem' }}>
          {ButtonLabel.Remember}
        </span> : ''
      }
    </Button>
  );
}
