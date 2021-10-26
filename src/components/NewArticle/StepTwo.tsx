import styles from '../../../styles/NewArticle.module.scss';

export function StepTwo() {
  return (
    <>
      <div className={styles.stepTwo}>
        <h2>Step Two</h2>
        <input
          className={styles.inputFile}
          placeholder="Title"
          type="file"
        />
      </div>
    </>
  )
}