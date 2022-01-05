import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ErrorAlert from './ErrorAlert';
import { useNavigate, useParams } from 'react-router-dom';

const GoalForm = ({currentUser, updateGoals }) => {

  let { goalId } = useParams()
  let navigate = useNavigate()

  const [errors, setErrors] = useState(null)

  const [formData, setFormData] = useState({
    goal_name: "",
    goal_start_date: "",
    goal_weight: "",
    goal_end_date: "",
    goal_met: "",
    id: null
  })

  useEffect(() => {
    if(goalId) {
      fetch(`/goals/${goalId}`)
      .then(r => r.json())
      .then(goal => setFormData(goal))
    }
  }, [goalId])
  
  const editGoal = () => {
    fetch(`/goals/${goalId}`, {
      method: "PATCH",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(goal => updateGoals(goal, goalId))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  const createGoal = () => {
    fetch('/goals', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(goal => updateGoals(goal))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  const handleGoalSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    goalId ? editGoal() : createGoal()
  }

  const currentWeight = currentUser.check_ins.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  })[currentUser.check_ins.length -1].weight

  return (
    <Container>
      <br></br>
      <Form>
        <Row>
          { goalId ? <h1>Edit Goal</h1> : <h1>Create a Goal</h1> }
          { errors ? <ErrorAlert errors={errors.errors} /> : null }
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="goalName">
            <Form.Label>Goal Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter a name for your goal here" 
              value={formData.notes}
              onChange={e => setFormData({...formData, goal_name: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Select a start date" 
                value={formData.goal_start_date}
                onChange={e => setFormData({...formData, goal_start_date: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Select an end date" 
                value={formData.goal_end_date}
                onChange={e => setFormData({...formData, goal_end_date: e.target.value})}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            Current Weight: {currentWeight}
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Goal Weight (lbs)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter weight (lbs)"
                value={formData.goal_weight}
                onChange={e => setFormData({...formData, goal_weight: parseInt(e.target.value)})}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="goalName">
            <Form.Label>Goal Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter a name for your goal here" 
              value={formData.notes}
              onChange={e => setFormData({...formData, goal_name: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Button 
          variant="warning" 
          type="submit"
          onClick={e => handleGoalSubmit(e)}
        >
          Submit
        </Button>
      </Form> 
    </Container>
  )
}

export default GoalForm;