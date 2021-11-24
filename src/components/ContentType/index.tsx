import React from 'react';
import styles from './styles/ContentType.module.scss';
export interface ContentTypeProps {
  id?: string,
  name: string
  type?: string,
}

export function ContentType({name, type}: ContentTypeProps){
  return <div className={styles.container}>
    { type === "topic"
    ? 
    <h5 className={styles.text}>#{name}</h5>
    :
    <h5 className={styles.text}>{name}</h5>}
  </div>
}