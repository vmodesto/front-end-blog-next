import React, { useContext, useState } from "react"
import styles from "./Header.module.scss";
import StoreContext from "../Store/Context";
import Link from 'next/link'

export function Header(){
  const [menuActive, setMenuActive] = useState(false)
  const {userData} = useContext<any>(StoreContext);

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
        {userData === null && <li className={styles.item}><a href="auth">Auth</a></li>}
        <li className={styles.item}><a href="/">Home</a></li>
        <li className={styles.item}><a href="new_article">New Article</a></li>
        <li className={styles.item}><a href="profile">Profile</a></li>
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