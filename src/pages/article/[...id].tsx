import router from "next/router";
import { useEffect } from "react";
import api from "../../api/api";
import { blogArticleUrl } from "../../shared/api_endpoints";
import styles from '../../../styles/FullArticle.module.scss';
import ReactMarkdown from "react-markdown";
import { Header } from "../../components/Header";

interface FullArticle {
  author: {
    id: string,
    name: string,
    avatar: string,
  },
  id: string,
  thumbnail: string,
  title: string,
  content: any,
  description: string,
  createdAt: string,
  topics: string[]
}

export default function Article({
  author,
  content,
  createdAt,
  description,
  id,
  thumbnail,
  title,
  topics,
}: FullArticle) {

  useEffect(() => {
  }, [])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img 
          src="https://blog-thumbnail-article.s3.amazonaws.com/d97869fc322fa4a29991-person.jpeg" 
          alt="Thumbnail"
          id={styles.thumbnail}
        />
        <ReactMarkdown className={styles.content} children={`# Teste`}/>
      </div>
    </>
  )
}