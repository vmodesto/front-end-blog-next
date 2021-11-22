import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { blogArticleUrl } from "../../shared/api_endpoints";
import styles from '../../../styles/FullArticle.module.scss';
import ReactMarkdown from "react-markdown";
import { Header } from "../../components/Header";
import StoreContext from "../../components/Store/Context";

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
  const [contentConverted, setContentConverted] = useState('');
  const {content} = useContext(StoreContext);
  const {articleId} = useContext(StoreContext);
  const [article, setArticle] = useState<FullArticle>({
    author: {
      name: "",
      avatar: "",
      id: ""
    },
    topics: [],
    content: "",
    createdAt: "",
    description: "",
    id: "",
    thumbnail: "",
    title: ""
  });
  const {query}: any = useRouter();

  useEffect(() => {
      getArticle();
      getContent();
  }, [])

  const getArticle = async () => {
    await api.get(
      `${blogArticleUrl}/articles/show/${articleId}`)
      .then(function(response: any) {
        setArticle(response.data);
    })
  }
  const getContent = async () => {
    await api.get(content) 
    .then((response: any) => setContentConverted(response.data))
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img 
          src={article?.thumbnail}
          alt="Thumbnail"
          id={styles.thumbnail}
        />

        <div className={styles.author}>
          <img src={article.author.avatar} className={styles.avatar}/>
          <h2 className={styles.authorName}>{article.author.name}</h2>
        </div>
        <div className={styles.markdownContainer}>
          <ReactMarkdown
            className={styles.content}
            children={contentConverted}
          />
        </div>
      </div>
    </>
  )
}