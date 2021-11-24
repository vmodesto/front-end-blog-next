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
import { blogArticleUrl, blogUploadUrl } from "../shared/api_endpoints";
import router from "next/router";

export interface Content {
  id: string,
  name: string,
}

const NewArticle: NextPage = () => {
  const [articleId, setArticleId] = useState("");
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
  const [image, setImage] = useState<any>();
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
    if (title === "" || title.length < 6) {
      return setTitleErrorMessage("Type a better article name");
    }
    if (description.length < 30) {
      
      return setDescriptionErrorMessage("Type a longer description")
    }
    if (articleTopics.length === 0) {
      return setTopicErrorMessage("Choose a topic");
    }
    setLoading(true);
    setTitleErrorMessage('');
    setTopicErrorMessage('');
    const topicsIds = articleTopics.map(topic => topic.id);
    try {
      const response: any = await api.post(blogArticleUrl + "/articles/create",
      { 
        title: title,
        topic_ids: topicsIds,
        description: description
      }, {headers: { Authorization: `Bearer ${userData?.token}` }})
      setArticleId(response.data.id);
      setPageIndex(1);
    } catch (error: any) {
      setErrorMessage(error.response.data);
    }
    setLoading(false);   
  }

  const handleStepTwoClick = async () => {
    const formData = new FormData();
    if (!image) {
      return setImageErrorMessage('An image must be submitted');
    } else {
      if (image.name.endsWith('.jpg')
        || image.name.endsWith('.jpeg')
        || image.name.endsWith('.png')) {
        formData.append("thumbnail", image);
        setLoading(true);
        try {
          const response = await api.patch(blogUploadUrl + '/articles/thumbnail/update/' + articleId,
          formData,
          { headers: { Authorization: `Bearer ${userData?.token}` } })
          console.log(response);
          return setPageIndex(2);
          
        } catch (error: any) {
          console.log(error.response)
        }
        setLoading(false);
      } else {
        setImageErrorMessage('Fyle type not accepted');
      }
    }
  }

  const handleStepThreeClick = async () => {
    const formData = new FormData();
    if (image) {
      if (content.length < 500) {
        return setContentErrorMessage('The article must be at least 500 words.');
      } else {
        setContentErrorMessage('');
        const file = new File([content], "content.md", { type: "text/plain"})
        formData.append("content", file);
        setLoading(true);
        try {
          await api.patch(blogUploadUrl + '/articles/content/update/' + articleId, 
          formData, { headers: { Authorization: `Bearer ${userData?.token}` } })
          router.push('/');
        } catch (error: any) {
          setContentErrorMessage('Failure to add article content');
          setLoading(false);
        }
      }
    }
  }

  const redirectToSignIn = () => {
    router.push('/auth');
  }

  return (
    <>
      {userData === null ? <>{redirectToSignIn()}</> : <>
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
              <ClipLoader
                css="margin-top: 2rem;"
                color="#fca311"
                loading={loading}
              />
            }
          </>
        }
        {pageIndex === 1 &&
          <>
            <StepTwo
              imageErrorMessage={imageErrorMessage}
              handleImageFileChange={handleImageFileChange}
            />
            {loading === false
              ?
              <button
                className={styles.nextButton}
                onClick={handleStepTwoClick}>Create
              </button> :
              <ClipLoader
                css="margin-top: 2rem"
                color="#fca311"
                loading={loading}
              />
            }
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
              {loading === false
                ?
                <button
                  className={styles.nextButton}
                  onClick={handleStepThreeClick}>Create
                </button> :
                <ClipLoader
                  css="margin-top: 2rem;"
                  color="#fca311"
                  loading={loading}
                />
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
    </>}
    </>
  )
}

export default NewArticle;