import styles from '../../../styles/NewArticle.module.scss';

interface StepTwoProps {
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  imageErrorMessage: string,
}

export function StepTwo({handleImageFileChange, imageErrorMessage}: StepTwoProps) {
  return (
    <>
      <div className={styles.stepTwo}>
        <h2>Step Two</h2>
        <p>Add an image to your article!</p>
        <input
          className={styles.inputFile}
          placeholder="Title"
          type="file"
          onChange={handleImageFileChange}
        />
        {imageErrorMessage !== '' && <small className={styles.errorMessage}>{imageErrorMessage}</small>}
      </div>
    </>
  )
}