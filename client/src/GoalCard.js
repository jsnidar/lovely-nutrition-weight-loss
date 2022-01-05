
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Card, Row, Col, Button } from "react-bootstrap"

const GoalCard = ({ goalInfo, deleteGoal }) => {

  const [errors, setErrors] = useState(null)
  const formattedDate = (givenDate) => new Date(givenDate.date).toString().slice(0, 15);
  let navigate = useNavigate();


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
        </Row>
        <Row>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Starting weight: </Card.Subtitle>
            <Card.Text>
              {/* {formattedDate(goalInfo.goal_start_date)} to {formattedDate(goalInfo.goal_end_date)} */}
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Final Weight: </Card.Subtitle>
            <Card.Text>
              {/* {formattedDate(goalInfo.goal_start_date)} to {formattedDate(goalInfo.goal_end_date)} */}
            </Card.Text>
          </Col>
        </Row>
        <Button variant='warning' onClick={() => handleDeleteGoal()}>Delete</Button>
        <Button variant='warning' onClick={() => navigate(`/gooals/${goalInfo.id}/edit`)}>Edit</Button>
        {/* <Card.Link href="0">Card Link</Card.Link> */}
      </Card.Body>
    </Card>
  )
}

export default GoalCard;