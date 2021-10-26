import { ArticleProps } from '../../pages';
import { ContentType } from '../ContentType';
import styles from './Article.module.scss';

export function Article({authorId, authorName, authorImage, image, title, description, topics, date}: ArticleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.authorImage} src={authorImage}/>
        <h4>{authorName}</h4>
      </div>
      <div className={styles.introduction}>
        <img className={styles.postImage} src={image} alt="ReactImage" />
        <div className={styles.introductionText}>
          <h1>{title}</h1>
          <p className={styles.description}>{description}
        </p>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          {/* {topics.map((topic, index) => <ContentType type="topic" key={index} name={topic}/>)} */}
        </div>
        <h5>{date}</h5>
      </div>
    </div>
  )
}