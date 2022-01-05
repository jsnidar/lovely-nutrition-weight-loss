import React, { useState } from "react";
import { Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CheckInCard from "./CheckInCard";
import GoalChart from "./GoalChart";
import GoalCard from "./GoalCard";

const Home = ({currentUser, deleteCheckIn, deleteGoal}) => {

  const [showCheckIns, setShowCheckins] = useState(false)
  const [showGoals, setShowGoals] = useState(false)


  console.log(currentUser)

  const renderCheckIns = currentUser.check_ins.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(checkIn => <CheckInCard key={checkIn.id} checkInInfo={checkIn} deleteCheckIn={deleteCheckIn} />)

  const renderGoals = currentUser.goals.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(goal => <GoalCard key={goal.id} goalInfo={goal} deleteGoal={deleteGoal} />)


  return (
    <Container>
      <Row>
        <Image src="JacquelynKPhotography_LovelyNutritionLogo_BLACK.png" />
        <h1>Weight Loss Tracker</h1>
        <br></br>
      </Row>
      <Row>
        <h3>Goals</h3>
        <br></br>
        <h5>Current Goal</h5>
      </Row>
      <Row>
        <GoalChart currentUser={currentUser} deleteGoal={deleteGoal}/>
      </Row>
      <Row>
        <Link to="/goals/new">Create a Goal</Link>
      </Row>
      <Row>
        <Button variant="warning" onClick={() => setShowGoals(!showGoals)}>
          {showGoals ? "Hide Goals" : "Show Goals" }
        </Button>
      </Row>
      <Row>
        {showGoals ? renderGoals : null }
      </Row>
      <Row>
        <h3>Check Ins</h3>
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