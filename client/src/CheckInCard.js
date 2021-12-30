
import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap"

const CheckInCard = ({ checkInInfo, deleteCheckIn }) => {

  const [errors, setErrors] = useState(null)
  const formattedDate = new Date(checkInInfo.date).toString().slice(0, 15);

  const handleDeleteCheckIn = () => {
    debugger
    fetch(`/check_ins/${checkInInfo.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(() => deleteCheckIn(checkInInfo));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Date: {formattedDate}</Card.Title>
        <Row>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Weight</Card.Subtitle>
            <Card.Text>{checkInInfo.weight} lbs.</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Measurements</Card.Subtitle>
            {checkInInfo.left_arm_measurement ? <Card.Text>Left Arm: {checkInInfo.left_arm_measurement} in.</Card.Text> : null }
            {checkInInfo.left_thigh_measurement ? <Card.Text>Left Thigh: {checkInInfo.left_thigh_measurement} in.</Card.Text> : null}
            {checkInInfo.waist ? <Card.Text>Waist: {checkInInfo.waist} in.</Card.Text> : null}
            {checkInInfo.hips ? <Card.Text>Hips: {checkInInfo.hips} in.</Card.Text> : null}
            {checkInInfo.chest ? <Card.Text>Chest: {checkInInfo.chest} in.</Card.Text> : null}
            <Card.Text>Notes: {checkInInfo.notes}</Card.Text>
          </Col>
        </Row>
        <Button onClick={() => handleDeleteCheckIn()} >Delete</Button>
        <Button>Edit</Button>
        {/* <Card.Link href="0">Card Link</Card.Link> */}
      </Card.Body>
    </Card>
  )
}

export default CheckInCard;