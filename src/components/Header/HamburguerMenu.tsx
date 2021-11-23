import Link from "next/link";
import React from "react";
import styles from './styles/Header.module.scss';

interface HamburguerMenuProps {
  isLogged: boolean,
}

export function HamburguerMenu({isLogged}: HamburguerMenuProps) {
  return (
      <ul className={styles.hamburguerMenu}>
        {isLogged === false && <li><a href="auth">Sign In</a></li>}
        <li><a href="new_article">New Article</a></li>
        <li><a href="profile">Profile</a></li>
      </ul>
  )
}