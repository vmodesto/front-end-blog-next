import React from 'react';
import styles from '../../../styles/NewArticle.module.scss';
import { ArticleProps } from '../../pages';
import { ContentType, ContentTypeProps } from '../ContentType';

interface StepOneProps {
  openModal: () => void
  articleTopics: ContentTypeProps[]
  title: string
  handleTitleChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export function StepOne({title, handleTitleChange, openModal, articleTopics}: StepOneProps) {
  console.log(title)
  return (
    <>
    <div className={styles.stepOne}>
          <h2>Step One</h2>
          <input
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <div className={styles.topics}>
            <div className={styles.chooseTopics}>
              <button onClick={openModal}>Add</button>
              <small className={styles.customSmall}>Choose one topic or more...</small>
            </div>
            {articleTopics.length !== 0 && <div className={styles.contentType}>
              {articleTopics.map((topic) => 
              <div key={topic.id} className={styles.marginItems}>
                  <ContentType type="topic" name={topic.name}/>
              </div>)}
            </div>}
          </div>
        </div>
    </>
  )
}