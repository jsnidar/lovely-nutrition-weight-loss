import { Row, Container, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalChart from "./GoalChart";
import GoalCard from "./GoalCard";

const GoalsContainer = ({ month, day, year, currentUser, deleteGoal, }) => {
  
  const [selectedGoal, setSelectedGoal] = useState(
    currentUser.goals.sort(function(a,b){
      return new Date(year(a.goal_end_date),month(a.goal_end_date),day(a.goal_end_date)) - new Date(year(b.goal_end_date),month(b.goal_end_date),day(b.goal_end_date));
    })[currentUser.goals.length -1]
  )
  const [showGoals, setShowGoals] = useState(false)
  let navigate = useNavigate()

  const selectGoal = (goal) => setSelectedGoal(goal)
  
  let renderGoals = currentUser.goals.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })
  
  renderGoals = renderGoals.map(goal => {
    
    const goalCheckIns = goal.goal_check_ins.sort(
      function(a,b){
        return new Date(a.date.valueOf()) - new Date(b.date.valueOf());
      }
    )

    return <GoalCard 
      key={goal.id} 
      goalInfo={goal} 
      deleteGoal={deleteGoal} 
      checkIns={goalCheckIns}
      day={day}
      month={month}
      year={year}
      selectGoal={selectGoal}
      
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
              selectedGoal={selectedGoal}
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
