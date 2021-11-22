import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function Article() {
  const [contentConverted, setContentConverted] = useState<string>('');
  const [article, setArticle] = useState<FullArticle>({
    author: {
      name: "",
      avatar: "",
      id: ""
    },
    topics: [],
    content: '',
    createdAt: "",
    description: "",
    id: "",
    thumbnail: "",
    title: ""
  });
  const {query}: any = useRouter();

  useEffect(() => {
      getArticle();
  }, [])

  const getArticle = () => {
    api.get(
      `${blogArticleUrl}/articles/show/939e06cc-9cdb-478b-8caf-0e66c2eaaa80`)
      .then((response: any) => setArticle(response.data));
  }

  const getContent = () => {
    api.get(article.content) 
    .then((response: any) => setContentConverted(response.data))
  }
  getContent();
  return (
    <>
      <Header />

      <div className={styles.container}>
        <img 
          src={article?.thumbnail}
          alt="Thumbnail"
          id={styles.thumbnail}
        />
        <div>
          <ReactMarkdown
            className={styles.content}
            children={contentConverted}
          />
        </div>
      </div>
    </>
  )
}