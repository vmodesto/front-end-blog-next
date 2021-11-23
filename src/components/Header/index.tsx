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

  useEffect(() => {userIsNotLogged()},[])

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
        <Link href="/"><h1>Blog</h1></Link>
        <ul className={styles.menu}>
          {isLogged === false && <Link href="/auth"><li className={styles.item}>Sign In</li></Link>}
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
        <HamburguerMenu isLogged={isLogged}/>
      }
    </>
  )
}