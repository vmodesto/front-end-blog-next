import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from '../../styles/NewArticle.module.scss';
import { Header } from "../components/Header";
import { ContentType, ContentTypeProps } from "../components/ContentType";
import api from "../api/api";
import ReactModal from "react-modal";
import { StepOne } from "../components/NewArticle/StepOne";
import { StepTwo } from "../components/NewArticle/StepTwo";

export interface Courses {
  id: number,
  name: string,
}

const NewArticle: NextPage = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [topics, setTopics] = useState<ContentTypeProps[]>([]);
  const [articleTopics, setArticleTopics] = useState<ContentTypeProps[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [pageIndex, setPageIndex]= useState(0);

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

  const handleCourseClick = (id: number) => {
    api.get("api/topics").then((response: any) => {
      setTopics(response.data.topics)
    })
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {pageIndex === 0 && 
        <>
          <StepOne 
          articleTopics={articleTopics}
          openModal={openModal}
        />
        <button className={styles.nextButton} onClick={() => setPageIndex(1)}>Next</button>
        </>
        }
        {pageIndex === 1 &&
          <>
            <StepTwo />
            <div className={styles.pageButtons}>
              <button className={styles.nextButton} onClick={() => setPageIndex(0)}>Back</button>
              <button className={styles.nextButton}>Next</button>
            </div>
          </>
        }
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.topicModal}
      >
        <div className={styles.content}>
          <span onClick={closeModal}>Close</span>
          <h1>Choose topics</h1>
          <div>
            <h2>Choose course</h2>
            <div className={styles.contentType}>
              {courses.map((course) => 
              <div
                className={styles.marginItems}
                onClick={() => handleCourseClick(course.id)}>
                  <ContentType name={course.name} />
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
                className={styles.marginItems} 
                onClick={() => {
                  const newTopics = [...articleTopics, {name: topic.name}]
                  setArticleTopics(newTopics)
                }}>
                <ContentType name={topic.name} />
              </div>)}
            </div>
          </div>
          <button className={styles.nextButton}>Add</button>
        </div>
      </ReactModal>
    </>
  )
}

export default NewArticle;