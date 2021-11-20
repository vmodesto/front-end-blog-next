import ReactModal from "react-modal";
import { Content } from "../../pages/new_article";
import { ContentTypes } from "./ContentTypes";
import styles from "./styles/NewArticleModal.module.scss";

type NewArticleModalProps = {
  modalIsOpen: boolean,
  closeModal: any,
  courses: Content[],
  subjects: Content[],
  topics: Content[],
  handleCourseClick: any,
  handleSubjectClick: any,
  handleArticleTopicAdd: any,
  errorMessage: string,
}

export function NewArticleModal(props: NewArticleModalProps) {
  return (
    <>
    <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        className={styles.topicModal}
        ariaHideApp={false}
      >
        <div className={styles.content}>
          <h1>Choose topics</h1>
          <div>
            <h2>Choose course</h2>
            <div className={styles.contentType}>
              <ContentTypes
                content={props.courses}
                handleContentClick={props.handleCourseClick}
              />
            </div>
          </div>
          <div>
            <h2>Choose subjects</h2>
            <div className={styles.contentType}>
              {props.subjects.length == 0 ?
                <small
                  className={styles.customSmall}>
                  choose a course first
                </small>
                :
                <ContentTypes
                  content={props.subjects}
                  handleContentClick={props.handleSubjectClick}
                />}
            </div>
          </div>
          <div>
            <h2>Choose topics</h2>
            <div className={styles.contentType}>
              {props.topics.length == 0 ?
                <small
                  className={styles.customSmall}>
                  choose a subject first
                </small>
                :
                <ContentTypes isTopic={true} content={props.topics} handleContentClick={props.handleArticleTopicAdd} />}
            </div>
            <small className={styles.errorMessage}>{props.errorMessage}</small>
          </div>
          <button className={styles.nextButton} onClick={props.closeModal}>Close</button>
        </div>
      </ReactModal>
      </>
  )
}