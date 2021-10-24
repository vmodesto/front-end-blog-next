import styles from '../../../styles/NewArticle.module.scss';
import { ArticleProps } from '../../pages';
import { ContentType, ContentTypeProps } from '../ContentType';

interface StepOneProps {
  openModal: () => void
  articleTopics: ContentTypeProps[]
}

export function StepOne({openModal, articleTopics}: StepOneProps) {
  return (
    <>
    <div className={styles.stepOne}>
          <h2>Step One</h2>
          <input
            className={styles.input}
            placeholder="Title"
          />
          <div className={styles.topics}>
            <div className={styles.chooseTopics}>
              <button onClick={openModal}>Add</button>
              <small className={styles.customSmall}>Choose one topic or more...</small>
            </div>
            <div className={styles.contentType}>
              {articleTopics.map((topic) => <div className={styles.marginItems}><ContentType name={topic.name}/></div>)}
            </div>
          </div>
        </div>
    </>
  )
}