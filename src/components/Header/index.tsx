import React, { useContext, useEffect, useState } from "react"
import styles from "./styles/Header.module.scss";
import StoreContext from "../Store/Context";
import Link from 'next/link'
import { HamburguerMenu } from "./HamburguerMenu";
import { IoMdClose } from 'react-icons/io';

export function Header(){
  const [menuActive, setMenuActive] = useState(false)
  const {userData} = useContext<any>(StoreContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {userIsNotLogged(); console.log(isLogged)},[])

  const userIsNotLogged = () => {
    if(userData !== null){
      setIsLogged(true);
    }
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
        <h1>Blog</h1>
        <ul className={styles.menu}>
          {isLogged === false && <Link href="auth"><li className={styles.item}>Sign In</li></Link>}
          <Link href="/"><li className={styles.item}>Home</li></Link>
          <li className={styles.item}><a href="new_article">New Article</a></li>
          <li className={styles.item}><a href="profile">Profile</a></li>
        </ul>
        {menuActive !== true
          ? 
          <button onClick={showMenu}/> 
          : 
          <IoMdClose className={styles.closeMenu} onClick={() => setMenuActive(false)}/> 
        }
      </div>
      {menuActive === true  &&
        <HamburguerMenu isLogged={isLogged}/>
      }
    </>
  )
}