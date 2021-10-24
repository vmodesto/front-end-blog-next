import React from 'react';
import styles from './styles/Topic.module.scss'

export interface ContentTypeProps {
  name: string
}

export function ContentType(props: ContentTypeProps){
  return <div className={styles.container}>
    <h5>#{props.name}</h5>
  </div>
}