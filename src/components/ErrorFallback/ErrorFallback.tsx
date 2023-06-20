import { Heading } from "../generic/Heading/Heading";
import styles from "../../components/ErrorFallback/ErrorFallback.module.css";
import React from "react";

type Props = {
  error: {
    message: string
  }
}

const ErrorFallback = ({ error }: Props) => {
  return (
    <div className={styles.errorContainer}>
      <iframe
        title="Illustration of someone cutting a branch from underneath them"
        src="https://giphy.com/embed/eNhLtFS7jYhrPg7SSm"
        style={{ width: '100%', height: 380, overflow: 'auto' }}
        frameBorder="0"
      />
      <Heading level="h3" dataTestID="cy-error-title"  styling={styles.mainError}>Sorry. Something went wrong.</Heading>
      <Heading level="h4" dataTestID="cy-error-description"  styling={styles.genericError}>{error.message}</Heading>
      <p className={styles.errorAdvice}>Reload the page, check your internet connection or wait a few minutes.</p>
      <p className={styles.errorAdvice}>If that doesn't help, contact us at:
        <span className={styles.email}> josie@truetaleof.com</span>
      </p>
    </div>
  )
}

export default ErrorFallback;
