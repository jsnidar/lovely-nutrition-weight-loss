import React, { useState } from "react";
import { Container, Row, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CheckInCard from "./CheckInCard";
import GoalChart from "./GoalChart";
import GoalCard from "./GoalCard";

const Home = ({currentUser, deleteCheckIn, deleteGoal}) => {

  const [showCheckIns, setShowCheckins] = useState(false)
  const [showGoals, setShowGoals] = useState(false)


  console.log("currentUser: ",currentUser)

  const renderCheckIns = currentUser.check_ins.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(checkIn => <CheckInCard key={checkIn.id} checkInInfo={checkIn} deleteCheckIn={deleteCheckIn} />)

  const renderGoals = currentUser.goals.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(goal => {

    const year = (date) => date.slice(0,4)
    const month = (date) => parseInt(date.slice(5,7)) - 1
    const day = (date) => date.slice(8,10)

    const startDate = new Date(
      year(goal.goal_start_date),
      month(goal.goal_start_date),
      day(goal.goal_start_date)
    )
  
    const endDate = new Date(
      year(goal.goal_end_date),
      month(goal.goal_end_date),
      day(goal.goal_end_date)
    )
    
    let goalCheckIns = []

    currentUser.check_ins.forEach(checkIn => {
      const checkInDate = new Date(year(checkIn.date),month(checkIn.date),day(checkIn.date))
      if(checkInDate.valueOf() >= startDate.valueOf() && checkInDate.valueOf() <= endDate.valueOf()){
        goalCheckIns.push(checkIn)
      }
    })

    goalCheckIns = goalCheckIns.sort(function(a,b){
      return new Date(a.date.valueOf()) - new Date(b.date.valueOf());
    })
    return <GoalCard key={goal.id} goalInfo={goal} deleteGoal={deleteGoal} checkIns={goalCheckIns} />
    })


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
        {currentUser.goals.length > 0 ? <h5>Current Goal</h5> : null}
      </Row>
      <Row>
        {currentUser.goals.length > 0 ? <GoalChart currentUser={currentUser} deleteGoal={deleteGoal}/> : null}
      </Row>
      <Row>
        <Link to="/goals/new">Create a Goal</Link>
      </Row>
      <Row>
        {currentUser.goals.length > 0 ? <Button variant="warning" onClick={() => setShowGoals(!showGoals)}>
          {showGoals ? "Hide Goals" : "Show Goals" }
        </Button> : null}
      </Row>
      <Row>
        {showGoals ? renderGoals : null }
      </Row>
      <Row>
        <h3>Check Ins</h3>
      </Row>
      <Row>
        {currentUser.check_ins.length > 0 ? <Button variant="warning" onClick={() => setShowCheckins(!showCheckIns)}>
          {showCheckIns ? "Hide Check Ins" : "Show Check Ins" }
        </Button> : null}
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