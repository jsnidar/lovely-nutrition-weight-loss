import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GoalChart = ({currentUser, deleteGoal}) => {
  let navigate = useNavigate()
  const [errors, setErrors] = useState(null)


  const currentGoal = currentUser.goals.sort(function(a,b){
    return new Date(a.goal_end_date) - new Date(b.goal_end_date);
  })[currentUser.goals.length -1]

  const handleDeleteGoal = () => {
    fetch(`/goals/${currentGoal.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(() => deleteGoal(currentGoal));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  let goalCheckIns = []
  currentUser.check_ins.forEach(checkIn => {
    if(
      (new Date(checkIn.date).getTime() >= new Date(currentGoal.goal_start_date).getTime() && new Date(checkIn.date).getTime() <= new Date(currentGoal.goal_end_date).getTime())){
      goalCheckIns.push({x: checkIn.date, y: checkIn.weight})
    }
  })

  goalCheckIns = goalCheckIns.sort(function(a,b){
    return new Date(a.x) - new Date(b.x);
  })

  let currentWeight = goalCheckIns.length > 0 ? goalCheckIns[0].y : currentUser.check_ins.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  })[currentUser.check_ins.length -1].weight

  console.log('goalCheckins: ', goalCheckIns)
  const options = {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {
        display: true,
        text: currentGoal.goal_name,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Check-Ins',
        data: goalCheckIns,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Goal',
        data: [{x: currentGoal.goal_start_date, y: currentWeight}, {x: currentGoal.goal_end_date, y:currentGoal.goal_weight}],
        borderColor: '#FFCE0E',
        backgroundColor: '#FFCE0E',
      }
    ],
  };

  return(
    <>
      <Line
        options={options}
        data={data}
        style={{vh:50}}
      />
      <Button variant='warning' onClick={() => navigate(`/goals/${currentGoal.id}/edit`)}>Edit Current Goal</Button>
      <Button variant='warning' onClick={() => handleDeleteGoal()}>Delete Current Goal</Button>
    </>


  )
}

export default GoalChart; 