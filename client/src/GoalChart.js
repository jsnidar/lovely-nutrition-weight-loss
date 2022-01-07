import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';

ChartJS.register(...registerables);

const GoalChart = ({currentUser, deleteGoal}) => {

  let navigate = useNavigate()
  const [errors, setErrors] = useState(null)

  const year = (date) => date.slice(0,4)
  const month = (date) => parseInt(date.slice(5,7)) - 1
  const day = (date) => date.slice(8,10)

  const currentGoal = currentUser.goals.sort(function(a,b){
    return new Date(year(a.goal_end_date),month(a.goal_end_date),day(a.goal_end_date)) - new Date(year(b.goal_end_date),month(b.goal_end_date),day(b.goal_end_date));
  })[currentUser.goals.length -1]

  const startDate = new Date(
    year(currentGoal.goal_start_date),
    month(currentGoal.goal_start_date),
    day(currentGoal.goal_start_date)
  )

  const endDate = new Date(
    year(currentGoal.goal_end_date),
    month(currentGoal.goal_end_date),
    day(currentGoal.goal_end_date)
  )

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
    const checkInDate = new Date(year(checkIn.date),month(checkIn.date),day(checkIn.date))
    if(checkInDate.valueOf() >= startDate.valueOf() && checkInDate.valueOf() <= endDate.valueOf()){
      goalCheckIns.push({x: checkIn.date, y: checkIn.weight})
    }
  })
  
  goalCheckIns = goalCheckIns.sort(function(a,b){
    return new Date(a.x.valueOf()) - new Date(b.x.valueOf());
  }).map(checkIn => { 
    return {x: checkIn.x, y: checkIn.y}})
  
  let currentWeight = goalCheckIns.length > 0 ? goalCheckIns[0].y : currentUser.check_ins.sort(function(a,b){
    return new Date(year(a.date),month(a.date),day(a.date)).valueOf() - new Date(year(b.date),month(b.date),day(b.date)).valueOf();
  })[currentUser.check_ins.length -1].weight

  console.log('goalCheckins: ', goalCheckIns)

  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Weight in lbs"
        }
      },
      x: {
        adapters: {
          date: {
              locale: de
          }
      },
        type: "time",
        distribution: "linear",
        time: {
          parser: "yyyy-MM-dd",
          unit: "month"
        },
        title: {
          display: true,
          text: "Date"
        }
      }
    },
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
        showLine: true
      },
      {
        label: 'Goal',
        data: [{x: startDate, y: currentWeight}, {x: endDate, y:currentGoal.goal_weight}],
        borderColor: '#FFCE0E',
        backgroundColor: '#FFCE0E',
        borderDash: [3]
      }
    ],
  };

  return(
    <Container style={{
      position: "relative",
      margin: "auto",
      height: "50vh",
      width: "80vw",
      }}>
      <Line
        options={options}
        data={data}
        style={{vh:50}}
        datasetIdKey="id"
      />
      <Button variant='warning' onClick={() => navigate(`/goals/${currentGoal.id}/edit`)}>Edit Current Goal</Button>
      <Button variant='warning' onClick={() => handleDeleteGoal()}>Delete Current Goal</Button>
    </Container>
  )
}

export default GoalChart; 