import { ArticleProps } from "../../pages";
import styles from  './styles/ArticleMenu.module.scss';

export function ArticleMenuItem({thumbnail, title, author}: ArticleProps) {
  return (
  <div className={styles.container}>
    <img src={thumbnail} alt="articleImage" className={styles.thumbnail}/>
    <div>
      <p>{title}</p>
      <small>{author.name}</small>
    </div>
  </div>
)
}