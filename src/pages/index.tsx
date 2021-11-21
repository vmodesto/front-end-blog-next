import type { NextPage } from 'next';

import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from '../../styles/Home.module.scss';
import api from '../api/api';
import { Article } from '../components/Article';
import { ArticleMenu } from '../components/ArticleMenu';
import { Header } from '../components/Header';
import StoreContext from '../components/Store/Context';
import { blogArticleUrl } from '../shared/api_endpoints';

export interface ArticleProps {
  author: {
    id: string,
    name: string,
    avatar: string,
  },
  id: string,
  thumbnail: string,
  title: string,
  description: string,
  createdAt: string,
  topics: string[]
}

const Home: NextPage = () => {
  const { userData } = useContext<any>(StoreContext);
  const [pageIndex, setPageIndex] = useState(0);
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [articlesFound, setArticlesFound] = useState<ArticleProps[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    api.get(blogArticleUrl + '/articles/list-approved')
      .then(function (response: any) {
        const data: ArticleProps[] = response.data;
        setArticles(data);
      })
  }, []);

  const handleSearchInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  }

  const handleSearchIconClick = async () => {
    try {
    const response: any = await api.get(
    `${blogArticleUrl}/articles/search?most_clap=false&searching=${searchInput}`)
    setArticlesFound(response.data);
    setIsShowing(true);
  } catch (error: any){
    console.log(error.response)
    }
  }

  const handleArticleMenuClose = () => {
    setIsShowing(false);
  }

  return (
    
    <>
    {console.log(articlesFound)}
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
            <div className={styles.featuredArticles}>
              <h1>Featured articles</h1>

              {articles.length !== 0 ? articles.map((article) => <Article
                key={article.id}
                id={article.id}
                author={article.author}
                thumbnail={article.thumbnail}
                title={article.title}
                description={article.description}
                topics={article.topics}
                createdAt={article.createdAt}
              />) : <h2>Empty list</h2>}
            </div>
          </div>
        {/* </>
      } */}
    </>
  )
}

export default Home
