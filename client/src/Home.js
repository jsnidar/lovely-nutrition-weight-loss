import React from "react";
import { Container, Row, Image } from 'react-bootstrap';

const Home = ( {currentUser}) => {

  console.log(currentUser)
  return (
    <Container>
      <Row>
        <Image src="JacquelynKPhotography_LovelyNutritionLogo_BLACK.png" />
        <h1>
          {currentUser.name} Welcome to the Lovely Nutrition Weight Loss Tracker 
        </h1>
      </Row>
      <Row>
        Current Goal
      </Row>
      <Row>
        Create a Goal
      </Row>
      <Row>
        Check Ins
      </Row>
    </Container>
  );
}

export default Home;