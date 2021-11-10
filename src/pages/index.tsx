import type { NextPage } from 'next'

import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import api from '../api/api'
import { Article } from '../components/Article'
import { Header } from '../components/Header'

export interface ArticleProps {
  authorId: string,
  authorImage: string,
  authorName: string,
  image: string,
  title: string,
  description: string,
  date: string,
  topics: string[]
}

const Home: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    api.get('mock_api/articles').then(function (response: any){
      console.log(response.data.articles)
      const data: ArticleProps[] = response.data.articles;
      setArticles(data)
    })
  },[]);
  console.log('articles var:')
  console.log(articles)
  return (
    <>
    {pageIndex === 0 &&
      <div>
        <div className={styles.introductionContainer}>
          <h1 className={styles.introductionTitle}>Blog</h1>
          <div>
            <img src="/images/person.svg"/>
            <div>
              <h1>
                Busque conteúdos que vão ajudar no desenvolvimento de seus 
                estudos. Clique em explorar e encontre diversos artigos, tópicos, 
                matérias e cursos.
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
    }
    { pageIndex === 1 &&
    <>
    <Header/>
    <div className={styles.container}>
      <div className={styles.featuredArticles}>
        <h1>Featured articles</h1>
      
        {articles.map((article, index) => <Article
          key={index}
          authorId={article.authorId}
          authorImage={article.authorImage}
          authorName={article.authorName}
          image={article.image}
          title={article.title}
          description={article.description}
          topics={article.topics}
          date={article.date}
        />)}
    </div>
    </div>
    </>
    }
    </>
  )
}

export default Home
