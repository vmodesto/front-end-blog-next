import Link from "next/link";
import React from "react";
import styles from './styles/Header.module.scss';

export function HamburguerMenu() {
  return (
      <ul className={styles.hamburguerMenu}>
        <li><a href="auth">Sign In</a></li>
        <li><a href="/">Home</a></li>
        <li><a href="new_article">New Article</a></li>
        <li><a href="profile">Profile</a></li>
      </ul>
  )
}