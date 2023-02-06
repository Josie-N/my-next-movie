import styles from "../../components/ErrorFallback/ErrorFallback.module.css";

type Props = {
  error: {
    message: string
  }
}

export const ErrorFallback = ({ error }: Props) => {
  return (
    <div className={styles.errorContainer}>
      <iframe
        src="https://giphy.com/embed/eNhLtFS7jYhrPg7SSm"
        style={{ width: '100%', height: 380, overflow: 'auto' }}
        frameBorder="0"
      />
      <h3 className={styles.mainError}>Sorry. Something went wrong.</h3>
      <h4 className={styles.genericError}>{error.message}</h4>
      <p className={styles.errorAdvice}>Reload the page, check your internet connection or wait a few minutes.</p>
      <p className={styles.errorAdvice}>If that doesn't help, contact us at:
        <span className={styles.email}> josie@truetaleof.com</span>
      </p>
    </div>
  )
}
