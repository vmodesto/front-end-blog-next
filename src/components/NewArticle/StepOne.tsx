import styles from '../../../styles/NewArticle.module.scss';
import { AiFillCloseCircle } from "react-icons/ai";
import { ContentType, ContentTypeProps } from '../ContentType';

interface StepOneProps {
  openModal: () => void,
  articleTopics: ContentTypeProps[],
  titleErrorMessage: string,
  descriptionErrorMessage: string,
  topicErrorMessage: string,
  title: string,
  description: string,
  handleTitleChange: (e: React.FormEvent<HTMLInputElement>) => void,
  handleDescriptionChange: (e: React.FormEvent<HTMLTextAreaElement>) => void,
  handleArticleTopicDeletion: (topicId: any) => void,
}

export function StepOne({
  title,
  description,
  titleErrorMessage,
  descriptionErrorMessage,
  topicErrorMessage,
  handleTitleChange,
  handleDescriptionChange,
  openModal,
  articleTopics,
  handleArticleTopicDeletion
}: StepOneProps) {
  return (
    <>
      <div className={styles.stepOne}>
        <h2>Step One</h2>
        <p>Add a title and one or more topics to your article!</p>
        <input
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        {
          titleErrorMessage !== '' &&
          <small
            className={styles.errorMessage}>{titleErrorMessage}
          </small>}
        <textarea
          className={styles.description}
          placeholder="Description..."
          value={description}
          onChange={handleDescriptionChange}
        />
        {
          descriptionErrorMessage !== '' &&
          <small
            className={styles.errorMessage}>{descriptionErrorMessage}
          </small>
        }
        <div className={styles.topics}>
          <div className={styles.chooseTopics}>
            <button onClick={openModal}>Add</button>
            <small
              className={styles.customSmall}
            >
              Choose one topic or more...
            </small>
          </div>
          {articleTopics.length !== 0 && <div className={styles.contentType}>
            {articleTopics.map((topic) =>
              <div key={topic.id} className={styles.marginItems}>
                <ContentType type="topic" name={topic.name} />
                <AiFillCloseCircle
                  className={styles.removeTopicButton}
                  id={topic.id}
                  onClick={handleArticleTopicDeletion}
                />
              </div>)}
          </div>}
        </div>
        {
          topicErrorMessage !== '' &&
          <small
            className={styles.errorMessage}>{topicErrorMessage}
          </small>}
      </div>
    </>
  )
}