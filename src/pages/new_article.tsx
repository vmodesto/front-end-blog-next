import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import styles from '../../styles/NewArticle.module.scss';
import { Header } from "../components/Header";
import api from "../api/api";
import { StepOne } from "../components/NewArticle/StepOne";
import { StepTwo } from "../components/NewArticle/StepTwo";
import { StepThree } from "../components/NewArticle/StepThree";
import { ClipLoader } from "react-spinners";
import { NewArticleModal } from "../components/NewArticle/NewArticleModal";
import StoreContext from "../components/Store/Context";

export interface Content {
  id: string,
  name: string,
}

const NewArticle: NextPage = () => {
  const {userData} = useContext<any>(StoreContext);//with bug, but still using
  const [pageIndex, setPageIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = useState<Content[]>([]);
  const [topics, setTopics] = useState<Content[]>([]);
  const [subjects, setSubjects] = useState<Content[]>([]);
  const [articleTopics, setArticleTopics] = useState<Content[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
  const [topicErrorMessage, setTopicErrorMessage] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [contentErrorMessage, setContentErrorMessage] = useState('');
  const [image, setImage] = useState<File>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('http://54.83.70.8/articles-api/courses/list')
      .then(function (response: any) {
        setCourses(response.data);
      })
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCourseClick = async (course: Content) => {
    const url = "http://54.83.70.8/articles-api/subjects/list-by-course-id/" + course.id;
    await api.get(url)
      .then((response: any) => {
        setSubjects(response.data);
      })
  }

  const handleSubjectClick = (subject: Content) => {
    const url = "http://54.83.70.8/articles-api/topics/list-by-subject-id/" + subject.id;
    api.get(url)
      .then((response: any) => {
        setTopics(response.data);
      })
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value)
    console.log(description)
  }

  const handleArticleTopicAdd = (item: Content) => {
    for (var i = 0; i < articleTopics.length; i++) {
      if (articleTopics[i].id === item.id) {
        setErrorMessage('This topic has already been added');
        return;
      }
    }
    setErrorMessage('');
    const newTopics = [...articleTopics, { id: item.id, name: item.name }]
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
    const url = "http://54.83.70.8/articles-api/articles/create";
    if (title === "" || title.length < 6) {
      return setTitleErrorMessage("Type a better article name");
    }
    console.log(description.length)
    if (description.length < 30) {
      
      return setDescriptionErrorMessage("Type a longer description")
    }
    if (articleTopics.length === 0) {
      return setTopicErrorMessage("Choose a topic");
    }
    setTitleErrorMessage('');
    setTopicErrorMessage('');
    const topicsIds = articleTopics.map(topic => topic.id);
    try {
    const response = await api.post(url,
    { 
      title: title,
      topic_ids: [topicsIds[0]],
      description: description
    }, {headers: { Authorization: `Bearer ${userData?.token}` }})
    } catch (error: any) {
      console.log(error.response.data)
    }
    setLoading(false)
    setPageIndex(1);
    
  }

  const handleStepTwoClick = async () => {
    const formData = new FormData();
    if (!image) {
      return setImageErrorMessage('An image must be submitted');
    } else {
      if (image.name.endsWith('.jpg')
        || image.name.endsWith('.jpeg')
        || image.name.endsWith('.png')) {
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
      if (content.length < 10) {
        return setContentErrorMessage('The article must be at least 500 words.');
      } else {
        setContentErrorMessage('');
        setLoading(true);
        const file = new Blob([content], { type: 'text/md' })
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
              description={description}
              titleErrorMessage={titleErrorMessage}
              descriptionErrorMessage={descriptionErrorMessage}
              topicErrorMessage={topicErrorMessage}
              articleTopics={articleTopics}
              handleArticleTopicDeletion={handleArticleTopicDeletion}
              handleTitleChange={handleTitleChange}
              handleDescriptionChange={handleDescriptionChange}
              openModal={openModal}
            />
            {loading === false
              ?
              <button
                className={styles.nextButton}
                onClick={handleStepOneClick}>Next
              </button> :
              <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading} />
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
                onClick={() => { setPageIndex(0); setErrorMessage('') }}>
                Back
              </button>
              {loading === false
                ?
                <button
                  className={styles.nextButton}
                  onClick={handleStepTwoClick}>Create
                </button> :
                <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading} />
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
                onClick={() => { setPageIndex(1); setErrorMessage('') }}>
                Back
              </button>

              {loading === false
                ?
                <button
                  className={styles.nextButton}
                  onClick={handleStepThreeClick}>Create
                </button> :
                <ClipLoader css="margin-top: 2rem;" color="#fca311" loading={loading} />
              }
            </div>
          </>
        }
      </div>
      <NewArticleModal 
        closeModal={closeModal}
        courses={courses}
        errorMessage={errorMessage}
        handleArticleTopicAdd={handleArticleTopicAdd}
        handleCourseClick={handleCourseClick}
        handleSubjectClick={handleSubjectClick}
        modalIsOpen={modalIsOpen}
        subjects={subjects}
        topics={topics}
      />
    </>
  )
}

export default NewArticle;