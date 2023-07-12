import React from "react";
import styles from "./BadgeAlert.module.css";
import alert from "../../../assets/icons/alert.svg";

interface BadgeAlertProps {
  textMessage: string;
}

export function BadgeAlert({textMessage}: BadgeAlertProps) {
  return (
    <div className={styles.mainContainer}>
      <img className={styles.alertIcon} src={alert} alt=""/>
      <span>{textMessage}</span>
    </div>
  );
}
