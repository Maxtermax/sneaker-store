import React from 'react';
import { Container, Title, Content, Footer } from './Styles';

export function Card(props = {}) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Content>{props.content}</Content>
      <Footer>{props.footer}</Footer>
    </Container>
  )
}
