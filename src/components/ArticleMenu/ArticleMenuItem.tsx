import router from "next/router";
import { ArticleProps } from "../../pages";
import styles from  './styles/ArticleMenu.module.scss';

export function ArticleMenuItem({thumbnail, title, author, id}: ArticleProps) {
  return (
  <div className={styles.container}>
    <img src={thumbnail} alt="articleImage" className={styles.thumbnail}/>
    <div onClick={() => router.push(
          {pathname: `/article/[id]`}, `/article/${id}`, {shallow: true}
        )}>
      <p>{title}</p>
      <small>{author.name}</small>
    </div>
  </div>
)
}