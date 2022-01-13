import { Container, Row, Image } from 'react-bootstrap';
import GoalsContainer from "./GoalsContainer";
import CheckInsContainer from './CheckInsContainer';

const Home = ({ day, month, year, currentUser, deleteCheckIn, deleteGoal}) => {

  return (
    <Container className='p-2 d-flex justify-content-around'>
      <Row className='p-2'>
        <Image src="/lovely_logo.png" />
        <h1>Weight Loss Tracker</h1>
      </Row>
      {currentUser.check_ins.length > 0 ? <GoalsContainer 
        year={year}
        month={month}
        day={day}
        currentUser={currentUser} 
        deleteGoal={deleteGoal} 
      /> : null }
      <CheckInsContainer 
        year={year}
        month={month}
        day={day}
        currentUser={currentUser}
        deleteCheckIn={deleteCheckIn}
      />
    </Container>
  );
}

export default Home;