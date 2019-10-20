import React from 'react';

const styles = require('./card.scss');

interface CardProps {
  children: any;
}

export function Card(props: CardProps){
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

interface SectionProps {
  children: any;
  borderTop?: boolean;
  borderBottom?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  alignStart?: boolean;
}

export function Section(props: SectionProps) {
  const classes = [
    styles.section,
    props.borderTop ? styles._border__top : undefined,
    props.borderBottom ? styles._border__bottom : undefined,
    props.alignStart ? styles._align__start : undefined,
    props.alignCenter ? styles._align__center : undefined,
    props.alignEnd ? styles._align__end : undefined
  ];

  return (
    <div className={classes.join(' ')}>
      {props.children}
    </div>
  );
}

interface ContentGroupProps {
  children: any;
  alignCenter?: boolean;
  alignEnd?: boolean;
  alignStart?: boolean;
}

export function ContentGroup(props: ContentGroupProps) {
  const classes = [
    styles.contentGroup,
    props.alignStart ? styles._align__start : undefined,
    props.alignCenter ? styles._align__center : undefined,
    props.alignEnd ? styles._align__end : undefined
  ];

  return (
    <div className={classes.join(' ')}>
      {props.children}
    </div>
  );
}

export default Card;