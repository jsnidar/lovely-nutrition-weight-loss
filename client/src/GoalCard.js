
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Card, Row, Col, Button } from "react-bootstrap"

const GoalCard = ({ goalInfo, deleteGoal, checkIns }) => {

  const [errors, setErrors] = useState(null)

  const year = (date) => date.slice(0,4)
  const month = (date) => parseInt(date.slice(5,7)) - 1
  const day = (date) => date.slice(8,10)

  const formattedDate = (givenDate) => new Date(year(givenDate),month(givenDate),day(givenDate)).toDateString();
  let navigate = useNavigate();

  const metGoal = checkIns[checkIns.length -1].weight <= goalInfo.goal_weight

  const handleDeleteGoal = () => {
    fetch(`/goals/${goalInfo.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(() => deleteGoal(goalInfo));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Name: {goalInfo.goal_name}</Card.Title>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">Date Range: </Card.Subtitle>
          <Card.Text>
            {formattedDate(goalInfo.goal_start_date)} to {formattedDate(goalInfo.goal_end_date)}
          </Card.Text>
          <br></br>
        </Row>
        <Row>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Starting weight: </Card.Subtitle>
            <Card.Text>
              {checkIns[0].weight} lbs.
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Goal weight: </Card.Subtitle>
            <Card.Text>
              {goalInfo.goal_weight} lbs.
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Final Weight: </Card.Subtitle>
            <Card.Text>
              {checkIns[checkIns.length -1].weight} lbs.
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Card.Text>{metGoal ? "Congratulations you met your goal!" : `Only ${checkIns[checkIns.length -1].weight - goalInfo.goal_weight} lbs. to go!`}</Card.Text>
        </Row>
        <Button variant='warning' onClick={() => handleDeleteGoal()}>Delete</Button>
        <Button variant='warning' onClick={() => navigate(`/goals/${goalInfo.id}/edit`)}>Edit</Button>
        {/* <Card.Link href="0">Card Link</Card.Link> */}
      </Card.Body>
    </Card>
  )
}

export default GoalCard;