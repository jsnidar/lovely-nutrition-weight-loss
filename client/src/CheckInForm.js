
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import ErrorAlert from './ErrorAlert';
import { useNavigate } from 'react-router-dom';

const CheckInForm = () => {

  const measurementDropDownValues = []
  let i = 0
  while( i < 85 ) {
    measurementDropDownValues.push(i)
    i = i + 0.25
  }

  const renderMeasurements = measurementDropDownValues.map(value => <option key={value} value={value}>{value}</option>)
  
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    left_arm: "",
    left_thigh: "",
    waist: "",
    chest: "",
    hips: "",
    notes: ""
  })

  console.log(formData)

  const [errors, setErrors] = useState(null)
  let navigate = useNavigate()

  const handleCheckInSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    fetch('/check-ins', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(checkIn => console.log(checkIn))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  return (
    <Container>
      <br></br>
      <Form>
        <Row>
          <h1>Create a New Check In</h1>
          { errors ? <ErrorAlert errors={errors.errors} /> : null }
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" 
              placeholder="Enter measurement in inches" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight (lbs)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter weight (lbs)"
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: parseInt(e.target.value)})}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="left_arm_measurement">
              <Form.Label>Left Arm (in) </Form.Label>
              <Form.Select 
                value={formData.left_arm}
                onChange={e => setFormData({...formData, left_arm: parseFloat(e.target.value)})}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="left_thigh_measurement">
              <Form.Label>Left Thigh (in)</Form.Label>
              <Form.Select 
                value={formData.left_thigh}
                onChange={e => setFormData({...formData, left_thigh: parseFloat(e.target.value)})}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="waist">
              <Form.Label>Waist (in)</Form.Label>
              <Form.Select 
                value={formData.waist}
                onChange={e => setFormData({...formData, waist: parseFloat(e.target.value)})}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hips">
              <Form.Label>Hips (in)</Form.Label>
              <Form.Select 
                value={formData.hips}
                onChange={e => setFormData({...formData, hips: parseFloat(e.target.value)})}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="chest">
              <Form.Label>Chest (in)</Form.Label>
              <Form.Select 
                value={formData.chest}
                onChange={e => setFormData({...formData, chest: parseFloat(e.target.value)})}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Notes</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter notes here" 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Button 
          variant="warning" 
          type="submit"
          onClick={e => handleCheckInSubmit(e)}
        >
          Submit
        </Button>
      </Form> 
    </Container>
  )
}

export default CheckInForm