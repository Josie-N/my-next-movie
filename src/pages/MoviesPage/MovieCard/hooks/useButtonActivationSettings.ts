import { useState } from "react";

type HighlightStyle = "primary" | "secondary" | "none";

export default function useButtonActivationSettings() {
  const [ buttons, setButtons ] = useState({
    isPrimaryButtonDisplayed: false,
    isSecondaryButtonDisplayed: false,
    isSecondaryButtonPressed: false,
    highlightStyle: "none" as HighlightStyle
  });

  return {
    isPrimaryButtonDisplayed: () => buttons.isPrimaryButtonDisplayed,
    isSecondaryButtonDisplayed: () => buttons.isSecondaryButtonDisplayed,
    highlightStyle: () => buttons.highlightStyle,

    onButtonMouseEnter: (role: string) => {
      if (role === "primary") {
        // show primary button
        setButtons({
          ...buttons,
          isPrimaryButtonDisplayed: true,
          highlightStyle: "primary"
        });

        // hide secondary button
        if (buttons.isSecondaryButtonDisplayed) {
          setButtons({
            ...buttons,
            isSecondaryButtonDisplayed: false
          });
        }

        return;
      }

      if (role === "secondary") {
        // show secondary button
        setButtons({
          ...buttons,
          isSecondaryButtonDisplayed: true,
          highlightStyle: "secondary"
        });

        // hide primary button
        if (buttons.isPrimaryButtonDisplayed) {
          setButtons({
            ...buttons,
            isPrimaryButtonDisplayed: false
          });
        }

        return;
      }

      throw new Error(`Invalid role to display button: ${role}`);
    },

    onButtonMouseLeave: (role: string) => {
      if(role === "primary") {
        if(buttons.isSecondaryButtonPressed) {
          setButtons({
            ...buttons,
            highlightStyle: "secondary"
          });
        }

        setButtons({
          ...buttons,
          isPrimaryButtonDisplayed: false,
          highlightStyle: "none"
        });
      }

      if(role === "secondary") {
        if(buttons.isSecondaryButtonPressed) {
          setButtons({
            ...buttons,
            highlightStyle: "secondary"
          });
        }

        setButtons({
          ...buttons,
          isSecondaryButtonDisplayed: false,
          highlightStyle: "none"
        });
      }
    },

    onSecondaryButtonToggle: () => {
      if (buttons.isSecondaryButtonPressed) {
        setButtons({
          ...buttons,
          isSecondaryButtonPressed: false,
          isSecondaryButtonDisplayed: false,
          highlightStyle: "none"
        });
      } else {
        setButtons({
          ...buttons,
          isSecondaryButtonPressed: true,
          isSecondaryButtonDisplayed: true,
          highlightStyle: "secondary"
        });
      }
    },

    onPrimaryButtonClick: () => {
        setButtons({
          ...buttons,
          isSecondaryButtonPressed: false,
          highlightStyle: "none"
        });
    },

    // isPrimaryState: () => buttons.isPrimaryButtonDisplayed
    // isSecondaryState: () => buttons.isSecondaryButtonDisplayed || buttons.isSecondaryButtonPressed,
  }};
