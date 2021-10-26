import React from 'react';
import styles from './styles/Topic.module.scss';
export interface ContentTypeProps {
  id?: string,
  name: string
  type?: string,
}

export function ContentType({name, type}: ContentTypeProps){
  return <div className={styles.container}>
    { type === "topic" ? <h5>#{name}</h5> : <h5>{name}</h5>}
  </div>
}