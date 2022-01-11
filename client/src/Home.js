import { Container, Row, Image } from 'react-bootstrap';
import GoalsContainer from "./GoalsContainer";
import CheckInsContainer from './CheckInsContainer';

const Home = ({ day, month, year, currentUser, deleteCheckIn, deleteGoal}) => {

  return (
    <Container className='m-2 p-2'>
      <Row className='p-2'>
        <Image src="JacquelynKPhotography_LovelyNutritionLogo_BLACK.png" />
        <h1>Weight Loss Tracker</h1>
      </Row>
      <GoalsContainer 
        year={year}
        month={month}
        day={day}
        currentUser={currentUser} 
        deleteGoal={deleteGoal} 
      />
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