import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const SignUp = () => {

  const [formData, setFormData ] = useState({
    first_name: '', 
    last_name: '',
    height_feet: 0,
    height_inches: 0,
    email: '',
    email_confirmation: '',
    password: '',
    password_confirmation: ''
  })

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    debugger
  }

  return (
    <Container>
      <br></br>
      <Form>
        <Row>
          <h1>Sign Up</h1>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                value={formData.first_name}
                onChange={e => setFormData({...formData, first_name: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                value={formData.last_name}
                onChange={e => setFormData({...formData, last_name: e.target.value})}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Label>Height</Form.Label>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Feet</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter feet"
                value={formData.height_feet}
                onChange={e => setFormData({...formData, height_feet: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Inches</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter inches"
                value={formData.height_inches}
                onChange={e => setFormData({...formData, height_inches: e.target.value})}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailConfirmation">
          <Form.Label>Confirm email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            value={formData.email_confirmation}
            onChange={e => setFormData({...formData, email_confirmation: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Create Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Create a password" 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm your password" 
            value={formData.password_confirmation}
            onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
          />
        </Form.Group>
        <Button 
          variant="warning" 
          type="submit"
          onClick={e => handleSignUpSubmit(e)}
        >
          Submit
        </Button>
      </Form> 
    </Container>
  );
}

export default SignUp;