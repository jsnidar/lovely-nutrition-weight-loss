import React from "react";
import { Container, Row } from 'react-bootstrap';

const Home = ( {currentUser}) => {

  console.log(currentUser)
  return (
    <Container>
      <Row>
        <h1>
          {currentUser.name} Welcome to the Lovely Nutrition Weight Loss Tracker 
        </h1>
      </Row>
    </Container>
  );
}

export default Home;