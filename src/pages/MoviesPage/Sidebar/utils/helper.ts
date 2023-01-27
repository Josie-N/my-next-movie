import classNames from "classnames/bind";
import styles from "../Sidebar.module.css";

export const getSidebarStyles = (isPageScrolledDown: boolean): string => {
  const cn = classNames.bind(styles);

  console.log(isPageScrolledDown, 'isPageScrolledDown');

  const sidebarContainerClassNames = cn(
    'sidebarContainer',
    { 'sidebarContainer__scrollDown': isPageScrolledDown }
  )

  return sidebarContainerClassNames;
}
