import React, { useState } from "react";
import { Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CheckInCard from "./CheckInCard";
import GoalChart from "./GoalChart";

const Home = ({currentUser, deleteCheckIn}) => {

  const [showCheckIns, setShowCheckins] = useState(false)

  console.log(currentUser)

  const renderCheckIns = currentUser.check_ins.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(checkIn => <CheckInCard key={checkIn.id} checkInInfo={checkIn} deleteCheckIn={deleteCheckIn} />)


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
        <GoalChart currentUser={currentUser}/>
      </Row>
      <Row>
        Create a Goal
      </Row>
      <Row>
        Check Ins
      </Row>
      <Row>
        <Button variant="warning" onClick={() => setShowCheckins(!showCheckIns)}>
          {showCheckIns ? "Hide Check Ins" : "Show Check Ins" }
        </Button>
      </Row>
      <Row>
        {showCheckIns ? renderCheckIns : null }
      </Row>
      <Row>
        <br></br>
        <Link to="/check-ins/new">Create a New Check In</Link>
        <br></br>
      </Row>
      <br></br>
      <br></br>
    </Container>
  );
}

export default Home;