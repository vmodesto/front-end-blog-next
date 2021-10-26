import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from '../../styles/NewArticle.module.scss';
import { Header } from "../components/Header";
import { ContentType, ContentTypeProps } from "../components/ContentType";
import api from "../api/api";
import ReactModal from "react-modal";
import { StepOne } from "../components/NewArticle/StepOne";
import { StepTwo } from "../components/NewArticle/StepTwo";
import { StepThree } from "../components/NewArticle/StepThree";

export interface Courses {
  id: string,
  name: string,
}

const NewArticle: NextPage = () => {
  const [pageIndex, setPageIndex]= useState(0);
  const [title, setTitle] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [topics, setTopics] = useState<ContentTypeProps[]>([]);
  const [articleTopics, setArticleTopics] = useState<ContentTypeProps[]>([]);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    api.get('api/courses').then(function (response: any) {
      setCourses(response.data.courses);
      console.log(response.data.courses);
    })
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCourseClick = () => {
    api.get("api/topics").then((response: any) => {
      setTopics(response.data.topics)
    })
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  }

  const handleCreateArticleClick = () => {
    topics.map((topic) => {
      console.log(topic)
      api.post("api/articles", {title: title, topic: topic}).then((response) => console.log(response))
    })
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {pageIndex === 0 && 
        <>
          <StepOne 
            title={title}
            articleTopics={articleTopics}
            handleTitleChange={handleTitleChange}
            openModal={openModal}
        />
        <button
          className={styles.nextButton}
          onClick={() => setPageIndex(1)}>Next</button>
        </>
        }
        {pageIndex === 1 &&
        <>
          <StepTwo />
          <div className={styles.pageButtons}>
            <button className={styles.nextButton} onClick={() => setPageIndex(0)}>Back</button>
            <button className={styles.nextButton} onClick={() => {setPageIndex(2); console.log(title)}}>Next</button>
          </div>
        </>
        }
        
      </div>
      <div className={styles.contentContainer}>
        {pageIndex === 2 && 
          <>
            <StepThree 
              content={content}
              handleContentChange={handleContentChange}
            />
            <div className={styles.pageButtons}>
              <button className={styles.nextButton} onClick={() => setPageIndex(1)}>Back</button>
              <button className={styles.nextButton}>Create</button>
            </div>
          </>
          }
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.topicModal}
        ariaHideApp={false}
      >
        <div className={styles.content}>
          <h1>Choose topics</h1>
          <div>
            <h2>Choose course</h2>
            <div className={styles.contentType}>
              {courses.map((course) => 
              <div
                key={course.id}
                className={styles.marginItems}
                onClick={() => handleCourseClick()}>
                  <ContentType  name={course.name} />
              </div>)}
            </div>
          </div>
          <div>
            <h2>Choose topics</h2>
            <div className={styles.contentType}>
            {topics.length == 0 ? 
            <small 
              className={styles.customSmall}>
              choose a course first
            </small> 
            : 
              topics.map((topic) =>
              <div
                key={topic.id}
                className={styles.marginItems} 
                onClick={() => {
                  const newTopics = [...articleTopics, {id: topic.id, name: topic.name}]
                  setArticleTopics(newTopics)
                }}>
                <ContentType type="topic" name={topic.name} />
              </div>)}
            </div>
          </div>
          <button className={styles.nextButton} onClick={closeModal}>Close</button>
        </div>
      </ReactModal>
    </>
  )
}

export default NewArticle;