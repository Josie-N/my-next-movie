import { useState } from "react";

export default function useButtonActivationSettings() {
  const [ buttons, setButtons ] = useState({
    isPrimaryButtonHovered: false,
    isSecondaryButtonHovered: false,

    isPrimaryButtonPressed: false,
    isSecondaryButtonPressed: false,

    hasSecondaryButtonJustBeenUnpressed: false,
    isCardHovered: false,
  });

  return {
    isPrimaryButtonDisplayed: () => {
      if (buttons.isSecondaryButtonHovered) {
        return false;
      }
      return buttons.isCardHovered;
    },

    isSecondaryButtonDisplayed: () => {
      return buttons.isCardHovered;
    },

    isSecondaryButtonLabelDisplayed: () => {
      return buttons.isSecondaryButtonHovered;
    },

    isSecondaryButtonPressed: () => buttons.isSecondaryButtonPressed,

    highlightStyle: () => {
      if (buttons.isPrimaryButtonHovered) {
        return "primary";
      }
      // unbookmarking
      if (buttons.hasSecondaryButtonJustBeenUnpressed) {
        return "none";
      }
      // about to bookmark or bookmarking
      if (buttons.isSecondaryButtonPressed || buttons.isSecondaryButtonHovered) {
        return "secondary";
      }
      return "none";
    },

    onCardMouseEnter: () => {
      setButtons({
        ...buttons,
        isCardHovered: true,
      });
    },

    onCardMouseLeave: () => {
      setButtons({
        ...buttons,
        isCardHovered: false,
      });
    },

    onButtonMouseEnter: (role: string) => {
      setButtons(prevButtons => {
        if (role === "primary") {
          return {
            ...prevButtons,
            isPrimaryButtonHovered: true,
          };
        }

        if (role === "secondary") {
          return {
            ...prevButtons,
            isSecondaryButtonHovered: true,
            hasSecondaryButtonJustBeenUnpressed: false
          };
        }

        throw new Error(`Invalid role to display button: ${role}`);
      });
    },

    onButtonMouseLeave: (role: string) => {
      // @ts-ignore
      setButtons(prevButtons => {
        if (role === "primary") {
          return {
            ...prevButtons,
            isPrimaryButtonHovered: false,
          };
        }

        if (role === "secondary") {
          return {
            ...prevButtons,
            isSecondaryButtonHovered: false,
          };
        }
      })
    },

    onSecondaryButtonToggle: () => {
      setButtons(prevButtons => {
        if (prevButtons.isSecondaryButtonPressed) {
          return {
            ...prevButtons,
            isSecondaryButtonPressed: false,
            hasSecondaryButtonJustBeenUnpressed: true,
          };
        } else {
          return {
            ...prevButtons,
            isSecondaryButtonPressed: true,
          };
        }
      });
    },

    onPrimaryButtonClick: () => {
        setButtons({
          ...buttons,
          isPrimaryButtonPressed: true
        });
    },
  }};
