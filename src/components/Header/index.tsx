import React, { useState } from "react"
import styles from "./Header.module.scss";
import Router from "next/router";

export function Header(){
  const [menuActive, setMenuActive] = useState(false)

  const showMenu = () => {
    if(menuActive === false)
    setMenuActive(true);
    else
      setMenuActive(false)
  }

  return (
    <div className={styles.container}>
      <h1>Blog</h1>
      <ul className={styles.menu}>
        <li className={styles.item}><a href="/">Home</a></li>
        <li className={styles.item}><a href="/new_article">New Article</a></li>
        <li className={styles.item}>Profile</li>
      </ul>
      <button onClick={showMenu}/>
      {menuActive === true  && 
      <ul>
        <li>Home</li>
        <li>Novo artigo</li>
        <li>Perfil</li>
      </ul>
      }
    </div>
  )
}