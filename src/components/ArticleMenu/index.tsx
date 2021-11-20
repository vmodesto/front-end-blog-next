import { ArticleProps } from "../../pages"
import { ArticleMenuItem } from "./ArticleMenuItem";
import styles from  './styles/ArticleMenu.module.scss';

type ArticleMenuProps = {
  articlesFound: ArticleProps[]
  isShowing: boolean,
}

export function ArticleMenu(props: ArticleMenuProps) {
  return (
    <div className={props.isShowing === true ? styles.menu : styles.displayNone}>
      {props.articlesFound.map((article) => 
        <ArticleMenuItem
          key={article.id}
          id={article.id}
          author={article.author}
          thumbnail={article.thumbnail}
          title={article.title}
          description={article.description}
          createdAt={article.createdAt}
          topics={article.topics}
        />
      )}
    </div>
  )
}