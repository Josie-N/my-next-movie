import React from "react";
import helperStyles from "src/assets/stylesheets/helper.module.css";

interface HeadingProps {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
  children: React.ReactNode,
  styling?: string | null,
  dataTestID?: string
}

// Hidden visually, but provided to screen readers
interface hideTextVisually extends HeadingProps {
  hideTextVisually?: boolean,
  hideFromScreenReader?: never
}

// Hidden for screen readers, but not visually (aria-hidden)
interface hideTextFromScreenReader extends HeadingProps {
  hideFromScreenReader?: boolean,
  hideTextVisually?: never
}

// Headings can (potentially) be hidden either to sighted users or
// to the screen reader, but never both at the same time
// https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/
type Props = hideTextVisually | hideTextFromScreenReader;

export function Heading({
                          level: headingLevel = "p",
                          hideTextVisually = false,
                          children,
                          styling = null,
                          hideFromScreenReader,
                          dataTestID
                        }: Props) {
  const safeHeading = headingLevel ? headingLevel.toLowerCase() : "";
  const validHeadingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const HeadingTag = validHeadingLevels.includes(safeHeading) ? safeHeading : "p";

  const headingStyle = hideTextVisually ? helperStyles.visuallyHidden : styling;

  // To avoid displaying aria-hidden="false" on every single heading that doesn't need aria-hidden
  const isAriaHidden = hideFromScreenReader ? hideFromScreenReader : null;

  return (
    React.createElement(
      HeadingTag,
      {className: headingStyle, "aria-hidden": isAriaHidden, "data-testid": dataTestID},
      children
    )
  );
}
