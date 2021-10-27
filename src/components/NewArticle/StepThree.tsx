import styles from '../../../styles/NewArticle.module.scss';
import ReactMarkdown from 'react-markdown';
interface StepThreeProps {
  contentErrorMessage: string,
  content: string,
  handleContentChange: (e: React.FormEvent<HTMLTextAreaElement>) => void
}

export function StepThree({content, handleContentChange, contentErrorMessage}: StepThreeProps) {
  console.log(contentErrorMessage)
  return (
    <>
    <div className={styles.header}>
        <h2 className={styles.title}>Step Three</h2>
        <p>Write the content of your article</p>
      </div>
    <div className={styles.stepThree}>
      <div className={styles.editorGroup}>
        <h3 className={styles.type}>Editor</h3>
        <textarea
          rows={40}
          cols={40}
          className={styles.editor}
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <span className={styles.border}></span>
        <div className={styles.markdownGroup}>
          <h3 className={styles.type}>Formatted text</h3>
          <ReactMarkdown
            className={styles.markdown}
            children={content}
          />
      </div>
    </div>
      {contentErrorMessage !== '' && <small className={styles.errorMessage}>{contentErrorMessage}</small>}
    </>
  )
}