import { Row, Container, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalChart from "./GoalChart";
import GoalCard from "./GoalCard";

const GoalsContainer = ({ month, day, year, currentUser, deleteGoal, }) => {

  const [showGoals, setShowGoals] = useState(false)
  let navigate = useNavigate()


  let renderGoals = currentUser.goals.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })
  
  renderGoals = renderGoals.map(goal => {
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
      const checkInDate = new Date(
        year(checkIn.date),
        month(checkIn.date),
        day(checkIn.date)
      )

      if(
        checkInDate.valueOf() >= startDate.valueOf() && 
        checkInDate.valueOf() <= endDate.valueOf()
      ){
        goalCheckIns.push(checkIn)
      }
    })

    goalCheckIns = goalCheckIns.sort(function(a,b){
      return new Date(a.date.valueOf()) - new Date(b.date.valueOf());
    })

    return <GoalCard 
      key={goal.id} 
      goalInfo={goal} 
      deleteGoal={deleteGoal} 
      checkIns={goalCheckIns}
      day={day}
      month={month}
      year={year}
    />
  })

  return (
    <Container className="border-bottom border-secondary">
        <Row className='p-2'>
          <h3>Goals</h3>
          {currentUser.goals.length > 0 ? <h5>Current Goal</h5> : null}
        </Row>
        <Row>
          {currentUser.goals.length > 0 ? 
            <GoalChart
              day={day}
              month={month}
              year={year}
              currentUser={currentUser} 
              deleteGoal={deleteGoal}
            /> : null
          }
        </Row>
        <Row className="pt-2 d-flex justify-content-around">
          <Button 
            className="w-50 m-2" 
            variant="warning" 
            onClick={() => navigate("/goals/new")}
          >Create a Goal</Button>
        </Row>
        <Row className="d-flex justify-content-around">
          {currentUser.goals.length > 0 ? 
            <Button 
              className="w-50 m-2" 
              variant="warning" 
              onClick={() => setShowGoals(!showGoals)}
            >{showGoals ? "Hide Goals" : "Show Goals" }
            </Button> : 
            null
          }
        </Row>
        <Row className="p-2 mb-2">
          {showGoals ? renderGoals : null }
        </Row>
      </Container>
  )
}

export default GoalsContainer;
