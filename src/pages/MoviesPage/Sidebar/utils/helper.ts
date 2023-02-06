import classNames from "classnames/bind";
import styles from "../Sidebar.module.css";

export const getSidebarStyles = (isPageScrolledDown: boolean): string => {
  const cn = classNames.bind(styles);

  const sidebarContainerClassNames = cn(
    'sidebarContainer',
    { 'sidebarContainer__scrollDown': isPageScrolledDown }
  )

  return sidebarContainerClassNames;
}
