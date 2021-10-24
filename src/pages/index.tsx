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
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    api.get('api/articles').then(function (response: any){
      const data: ArticleProps[] = response.data.articles;
      setArticles(data)
    })
  },[]);

  return (
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
  )
}

export default Home
