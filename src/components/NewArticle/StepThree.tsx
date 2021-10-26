import styles from '../../../styles/NewArticle.module.scss';
import ReactMarkdown from 'react-markdown';
interface StepThreeProps {
  content: string,
  handleContentChange: (e: React.FormEvent<HTMLTextAreaElement>) => void
}

export function StepThree({content, handleContentChange}: StepThreeProps) {
  return (
    <>
    <div className={styles.stepThree}>
      <div>
        <h2 className={styles.title}>Editor</h2>
        <textarea
          rows={40}
          cols={40}
          className={styles.editor}
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <span className={styles.border}></span>
        <div>
          <h2 className={styles.title}>Formatted text</h2>
          <ReactMarkdown
            className={styles.markdown}
            children={content}
          />
      </div>
    </div>
    </>
  )
}