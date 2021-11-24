import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { blogArticleUrl } from "../../shared/api_endpoints";
import styles from '../../../styles/FullArticle.module.scss';
import ReactMarkdown from "react-markdown";
import { Header } from "../../components/Header";
import StoreContext from "../../components/Store/Context";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

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
  topics: string[],
  amountClaps: number,
}

export default function Article() {
  const [contentConverted, setContentConverted] = useState('');
  const {userData, articleId, articleContent} = useContext<any>(StoreContext);
  const [clap, setClap] = useState<boolean>(false);
  const [clapMessage, setClapMessage] = useState('');
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
    title: "",
    amountClaps: 0,
  });

  useEffect(() => {
      getArticle();
      getContent();
  }, [])

  const getArticle = async () => {
    try {
      await api.get(
        `${blogArticleUrl}/articles/show/${articleId}`)
        .then(function(response: any) {
          setArticle(response.data);
      })
    } catch {
      router.push('/');
    }
  }
  const getContent = async () => {
    await api.get(articleContent)
    .then((response: any) => setContentConverted(response.data))
  }

  const clapArticle = (value: boolean) => {
    setClap(true)
    if(userData === null){
      setClap(false);
      setClapMessage('Sign In or Sign up to like a article');
      return;
    }
    setClapMessage('');
    api.post(
      blogArticleUrl + `/articles/clap`,
      {article_id: articleId, clapped_hands: value},
      {headers: {Authorization: `Bearer ${userData?.token}`}}
    )
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.thumbnailContainer}>
          <img 
            src={article?.thumbnail}
            alt="Thumbnail"
            id={styles.thumbnail}
          />
        </div>

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
        <div className={styles.claps}>
          {clap === false && <AiOutlineLike 
            id={styles.clapIcon}
            onClick={() => {clapArticle(true);}}
          /> 
          }
          { clap === true &&
          <AiFillLike 
            id={styles.clapIcon}
            onClick={() => {clapArticle(false); setClap(false)}}
          />}
          <h3>{article.amountClaps}</h3>
          <small>{clapMessage}</small>
        </div>
      </div>
    </>
  )
}