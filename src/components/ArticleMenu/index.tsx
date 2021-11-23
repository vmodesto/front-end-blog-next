import ReactModal from "react-modal";
import { ArticleProps } from "../../pages"
import { ArticleMenuItem } from "./ArticleMenuItem";
import styles from  './styles/ArticleMenu.module.scss';

type ArticleMenuProps = {
  articlesFound: ArticleProps[]
  isShowing: boolean,
  closeArticleMenu: () => void
}

export function ArticleMenu(props: ArticleMenuProps) {
  return (

      <ReactModal
        isOpen={props.isShowing}
        onRequestClose={props.closeArticleMenu}
        ariaHideApp={false}
        className={styles.menu}
        style={{overlay: {overflow: 'hidden', background: 'none'}}}
      >
        {props.articlesFound.length !== 0 ? props.articlesFound.map((article) =>
          <ArticleMenuItem
            key={article.id}
            id={article.id}
            content={article.content}
            author={article.author}
            thumbnail={article.thumbnail}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            topics={article.topics}
          />
        ) : <h5 className={styles.articleNotFound}> Article Not found</h5>}
        
      </ReactModal>

  )
}