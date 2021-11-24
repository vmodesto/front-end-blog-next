import type { NextPage } from 'next';

import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import styles from '../../styles/Home.module.scss';
import api from '../api/api';
import { Article } from '../components/Article';
import { ArticleMenu } from '../components/ArticleMenu';
import { Header } from '../components/Header';
import StoreContext from '../components/Store/Context';
import { blogArticleUrl } from '../shared/api_endpoints';
import timeout from '../utils/timeout';

export interface ArticleProps {
  author: {
    id: string,
    name: string,
    avatar: string,
  },
  id: string,
  thumbnail: string,
  title: string,
  content?: string,
  description: string,
  createdAt: string,
  topics: string[]
}

const Home: NextPage = () => {
  const { userData } = useContext<any>(StoreContext);
  const { articleId } = useContext(StoreContext);
  const [haveVisitedArticle, setHaveVisitedArticles] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [lastArticleVisited, setLastArticleVisisted] = useState<ArticleProps>({
    author: {avatar: "", id: "", name: ""},
    createdAt: "",
    content: "",
    description: "",
    id: "",
    thumbnail: "",
    title: "",
    topics: []
  });
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [articlesFound, setArticlesFound] = useState<ArticleProps[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    userVisitedArticles();
    getArticles();
    getLastArticleVisited();
  }, []);

  const userVisitedArticles = () => {
    if(articleId !== null) {
      setHaveVisitedArticles(true);
    }
  }

  const getArticles = () => {
    api.get(blogArticleUrl + '/articles/list-approved')
      .then(function (response: any) {
        const data: ArticleProps[] = response.data;
        setArticles(data);
      })
  }

  const getLastArticleVisited = async () => {
    try{
      const response: any = 
      await api.get(`${blogArticleUrl}/articles/show/${articleId}`)
      setLastArticleVisisted(response.data);
    } catch (error) {
      setHaveVisitedArticles(false);
    }
  }

  const handleSearchInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  }

  const handleSearchIconClick = async () => {
    const response: any = await api.get(
    `${blogArticleUrl}/articles/search?most_clap=false&searching=${searchInput}`)
    setArticlesFound(response.data);
    setIsShowing(true);
    return;
  }

  const handleKeyPress = async (e:any) => {
    if(e.key === 'Enter'){
      const response: any = await api.get(
      `${blogArticleUrl}/articles/search?most_clap=false&searching=${searchInput}`)
      setArticlesFound(response.data);
      setIsShowing(true);
    }
  }

  const handleArticleMenuClose = () => {
    setIsShowing(false);
  }

  return (
    
    <>
      {/* {userData === null && pageIndex === 0 &&
          <div>
            <div className={styles.introductionContainer}>
              <h1 className={styles.introductionTitle}>Blog</h1>
              <div>
                <img src="/images/person.svg" />
                <div>
                  <h1>
                    Busque conteúdos que vão ajudar no desenvolvimento de seus
                    estudos. Clique em explorar e encontre diversos artigos,
                    tópicos, matérias e cursos.
                  </h1>
                  <button
                    className={styles.nextButton}
                    onClick={() => setPageIndex(1)}
                  >
                    Explorar
                  </button>
                </div>
              </div>
            </div>
          </div>
        } */}

        {/* { 
        pageIndex === 1 || userData !== null &&
          <> */}
          <Header />
          <div className={styles.container}>
            <div className={styles.searchBarGroup}>
              <div className={styles.searchBar}>
                <input
                  placeholder="Search for a article..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={(e: any) => handleKeyPress(e)}
                />
                <AiOutlineSearch 
                  className={styles.searchIcon}
                  onClick={() => handleSearchIconClick()}
                />
              </div>
              <ArticleMenu
                isShowing={isShowing}
                articlesFound={articlesFound}
                closeArticleMenu={handleArticleMenuClose}
              />
            </div>
            {haveVisitedArticle === true &&
              <div className={styles.articlesContainer}>
                <h1>Last article visited</h1>
                <Article
                  key={lastArticleVisited.id}
                  id={lastArticleVisited.id}
                  content={lastArticleVisited.content}
                  author={lastArticleVisited.author}
                  thumbnail={lastArticleVisited.thumbnail}
                  title={lastArticleVisited.title}
                  description={lastArticleVisited.description}
                  topics={lastArticleVisited.topics}
                  createdAt={lastArticleVisited.createdAt}
                />
              </div>
            }
            <div className={styles.articlesContainer}>
              <h1>Featured articles</h1>
              {articles.length !== 0 ? articles.map((article) => <Article
                key={article.id}
                id={article.id}
                content={article.content}
                author={article.author}
                thumbnail={article.thumbnail}
                title={article.title}
                description={article.description}
                topics={article.topics}
                createdAt={article.createdAt}
              />)
              : 
              <ClipLoader 
                css="margin-top: 2rem;"
                color="#fca311"
                loading={true}
              />
              }

              
            </div>
          </div>
        {/* </>
      } */}
    </>
  )
}

export default Home
