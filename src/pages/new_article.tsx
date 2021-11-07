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
import { ClipLoader } from "react-spinners";

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
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [topicErrorMessage, setTopicErrorMessage] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [contentErrorMessage, setContentErrorMessage] = useState('');
  const [image, setImage] = useState<File>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleArticleTopicAdd = (e: React.MouseEvent<HTMLElement>) => {
    for(var i = 0; i < articleTopics.length; i++){
      if(articleTopics[i].id === e.currentTarget.id){
        setErrorMessage('This topic has already been added');
        return;
      }
    }
    setErrorMessage('');
    const newTopics = [...articleTopics, {id: e.currentTarget.id, name: e.currentTarget.title}]
    setArticleTopics(newTopics)
    closeModal() 
  }

  const handleArticleTopicDeletion = (e: React.MouseEvent<HTMLElement>) => {
    const newTopics = articleTopics.filter(topic => topic.id !== e.currentTarget.id);
    setArticleTopics(newTopics);
  } 

  const handleImageFileChange = (e: any) => {
    setImage(e.target.files[0]);
  }

  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  }

  const handleStepOneClick = async () => {
    if(title === "" || title.length < 6){
      return setTitleErrorMessage("Type a better article name");
    }
    if(articleTopics.length === 0){
      return setTopicErrorMessage("Choose a topic");
    } else {
      setTitleErrorMessage('');
      setTopicErrorMessage('');
      setLoading(true)
      await api.post('api/articles', {title: title, topicId: articleTopics[0].id})
      setLoading(false)
      setPageIndex(1); 
    }
  }

  const handleStepTwoClick = async () => {
    const formData = new FormData();
    if(!image) {
      return setImageErrorMessage('An image must be submitted');
    } else {
      if(image.name.endsWith('.jpg') 
      || image.name.endsWith('.jpeg')
      || image.name.endsWith('.png')){
        formData.append("article_image", image);
        formData.append("name", "test");
        setLoading(true);
        await api.post("api/images", formData).then((response => console.log(response)))
        setLoading(false);
        return setPageIndex(2);
      } else {
        setImageErrorMessage('Fyle type not accepted')
      }
    }
  }

  const handleStepThreeClick = async () => {
    if (image) {
      if(content.length < 10) {
        return setContentErrorMessage('The article must be at least 500 words.');
      } else {
        setContentErrorMessage('');
        setLoading(true);
        const file = new Blob([content], {type: 'text/md'})
        await api.post('api/content', file)
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {pageIndex === 0 && 
        <>
          <StepOne
            title={title}
            titleErrorMessage={titleErrorMessage}
            topicErrorMessage={topicErrorMessage}
            articleTopics={articleTopics}
            handleArticleTopicDeletion={handleArticleTopicDeletion}
            handleTitleChange={handleTitleChange}
            openModal={openModal}
        />
        {loading === false 
          ? 
          <button
            className={styles.nextButton}
            onClick={handleStepOneClick}>Next
          </button> :
            <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading}/>
          }
        </>
        
        }
        {pageIndex === 1 &&
        <>
          <StepTwo
            imageErrorMessage={imageErrorMessage}
            handleImageFileChange={handleImageFileChange}
          />
          <div className={styles.pageButtons}>
            <button
              className={styles.nextButton}
              onClick={() => {setPageIndex(0); setErrorMessage('')}}>
              Back
            </button>
            {loading === false 
              ? 
              <button
                className={styles.nextButton}
                onClick={handleStepTwoClick}>Create
              </button> :
                <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading}/>
            }
          </div>
        </>
        }
        
      </div>
      <div className={styles.contentContainer}>
        {pageIndex === 2 && 
          <>
            <StepThree
              contentErrorMessage={contentErrorMessage}
              content={content}
              handleContentChange={handleContentChange}
            />
            <div className={styles.pageButtons}>
              <button
                className={styles.nextButton}
                onClick={() => {setPageIndex(1); setErrorMessage('')}}>
                Back
              </button>
              
              {loading === false 
              ? 
              <button
                className={styles.nextButton}
                onClick={handleStepThreeClick}>Create
              </button> :
                <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading}/>
              }
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
                id={topic.id}
                title={topic.name}
                key={topic.id}
                className={styles.marginItems}
                onClick={handleArticleTopicAdd}>
                <ContentType type="topic" name={topic.name} />
              </div>)}
            </div>
            <small className={styles.errorMessage}>{errorMessage}</small>
          </div>
          <button className={styles.nextButton} onClick={closeModal}>Close</button>
        </div>
      </ReactModal>
    </>
  )
}

export default NewArticle;