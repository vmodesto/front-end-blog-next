import { IoMdPerson } from "react-icons/io";
import { ArticleProps } from '../../pages';
import { ContentType } from '../ContentType';
import styles from './Article.module.scss';

export function Article(
  { 
    author,
    thumbnail,
    createdAt,
    description,
    title,
    topics 
  }: ArticleProps
  ) {
  const formattedDate = new Date(createdAt);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {author.avatar !== null
          ?
          <img
            className={styles.authorImage}
            src={author.avatar}
          />
          :
          <div className={styles.defaultAuthorImageContainer}>
            <IoMdPerson className={styles.defaultAuthorImage} />
          </div>
        }
        <h4>{author.name}</h4>
      </div>
      <div className={styles.introduction}>
        <img className={styles.postImage} src={thumbnail} alt="ReactImage" />
        <div className={styles.introductionText}>
          <h2>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          {topics.map((topic: any) => { return <ContentType key={topic.name} type="topic" name={topic?.name} /> })}
        </div>
        <h5>{formattedDate.toDateString()}</h5>
      </div>
    </div>
  )
}