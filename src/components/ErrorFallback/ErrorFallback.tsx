import Heading from "../generic/Heading/Heading";
import styles from "../../components/ErrorFallback/ErrorFallback.module.css";

type Props = {
  error: {
    message: string
  }
}

const ErrorFallback = ({ error }: Props) => {
  return (
    <div className={styles.errorContainer}>
      <iframe
        title="Cutting branch from underneath you"
        src="https://giphy.com/embed/eNhLtFS7jYhrPg7SSm"
        style={{ width: '100%', height: 380, overflow: 'auto' }}
        frameBorder="0"
      />
      <Heading level="h3" styling={styles.mainError}>Sorry. Something went wrong.</Heading>
      <Heading level="h4" styling={styles.genericError}>{error.message}</Heading>
      <p className={styles.errorAdvice}>Reload the page, check your internet connection or wait a few minutes.</p>
      <p className={styles.errorAdvice}>If that doesn't help, contact us at:
        <span className={styles.email}> josie@truetaleof.com</span>
      </p>
    </div>
  )
}

export default ErrorFallback;
