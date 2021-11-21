import { ContentType, ContentTypeProps } from "../ContentType"
import styles from '../../../styles/NewArticle.module.scss';
import { Content } from "../../pages/new_article";

type ContentTypesProps = {
  isTopic?: boolean,
  content: any[],
  handleContentClick?: any,
}

export function ContentTypes({content, handleContentClick, isTopic}: ContentTypesProps) {
  return (
    <>
    {content.length !== 0 ? content.map((item: Content) => 
      <div
        key={item.id}
        id={item.id}
        className={styles.marginItems}
        onClick={() => handleContentClick(item)}>
          <ContentType type={isTopic === true ? "topic" : ""} name={item.name} />
      </div>) : <small>Empty list</small>}
    </>
  )
}