import React, { useContext, useEffect, useState } from "react"
import styles from "./styles/Header.module.scss";
import StoreContext from "../Store/Context";
import Link from 'next/link'
import { HamburguerMenu } from "./HamburguerMenu";
import { IoMdClose } from 'react-icons/io';
import { blogArticleUrl } from "../../shared/api_endpoints";
import api from "../../api/api";

export function Header(){
  const [menuActive, setMenuActive] = useState(false)
  const {userData} = useContext<any>(StoreContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    userIsNotLogged();
    userIsReviewer();
    setToken(userData?.token)
    console.log(userData)
  },[])

  const userIsNotLogged = () => {
    if(userData !== null){
      setIsLogged(true);
    }
  }

  const userIsReviewer = () => {
    if(userData !== null){
      setIsReviewer(userData?.user.isReviewer)
    }
  }

  const becomeProofreader = () => {
    api.post(`${blogArticleUrl}/reviewers/create`, {headers: {Authorization: token}})
  }

  const showMenu = () => {
    if(menuActive === false)
    setMenuActive(true);
    else
      setMenuActive(false)
  }
  return (
    <>
      <div className={styles.container}>
        <Link href="/"><h1>Blog</h1></Link>
        <ul className={styles.menu}>
          {isLogged === false && <Link href="/auth"><li className={styles.item}>Sign In</li></Link>}
          {isLogged === true && isReviewer === false && <li className={styles.item}>Become proofreader</li>}
          <Link href="/new_article"><li className={styles.item}>New Article</li></Link>
          <Link href="/profile"><li className={styles.item}>Profile</li></Link>
        </ul>
        {menuActive !== true
          ? 
          <button onClick={showMenu}/> 
          : 
          <IoMdClose className={styles.closeMenu} onClick={() => setMenuActive(false)}/> 
        }
      </div>
      {menuActive === true  &&
        <HamburguerMenu 
          isLogged={isLogged}
          isReviewer={isReviewer}
          token={token}
          becomeProofreader={becomeProofreader}
        />
      }
    </>
  )
}