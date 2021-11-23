import router from "next/router";
import { useContext } from "react";
import { ArticleProps } from "../../pages";
import StoreContext from "../Store/Context";
import styles from './styles/ArticleMenu.module.scss';

export function ArticleMenuItem({ thumbnail, title, author, id, content }: ArticleProps) {
  const { setArticleId, setArticleContent } = useContext(StoreContext);
  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(
          { pathname: `/article/[id]` }, `/article/${id}`,
          { shallow: true }
        );
        setArticleContent(content);
        setArticleId(id);
      }}
    >
      <img src={thumbnail} alt="articleImage" className={styles.thumbnail} />
      <div>
        <p>{title}</p>
        <small>{author.name}</small>
      </div>
    </div>
  )
}