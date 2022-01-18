import { Container, Row } from 'react-bootstrap';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {enGB} from 'date-fns/locale';

ChartJS.register(...registerables);

const GoalChart = ({day, month, year, currentUser}) => {

  const currentGoal = currentUser.goals.sort(function(a,b){
    return new Date(
      year(a.goal_end_date),
      month(a.goal_end_date),
      day(a.goal_end_date)
    ) - new Date(
      year(b.goal_end_date),
      month(b.goal_end_date),
      day(b.goal_end_date)
    );
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

  let goalCheckIns = []
  currentUser.check_ins.forEach(checkIn => {
    const checkInDate = new Date(
      year(checkIn.date),
      month(checkIn.date),
      day(checkIn.date)
    )

    if(
      checkInDate.valueOf() >= startDate.valueOf() && 
      checkInDate.valueOf() <= endDate.valueOf()
    ){
      goalCheckIns.push({x: checkIn.date, y: checkIn.weight})
    }
  })
  
  goalCheckIns = goalCheckIns.sort(function(a,b){
    return new Date(a.x.valueOf()) - new Date(b.x.valueOf());
  }).map(checkIn => { 
    return {x: checkIn.x, y: checkIn.y}
    }
  )
  
  let currentWeight = goalCheckIns.length > 0 ? 
    goalCheckIns[0].y : 
    currentUser.check_ins.sort(function(a,b){
      return new Date(
        year(a.date),
        month(a.date),
        day(a.date)
      ).valueOf() - new Date(
        year(b.date),
        month(b.date),
        day(b.date)
      ).valueOf();
    })[currentUser.check_ins.length -1].weight

  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        title: {display: true, text: "Weight in lbs"}
      },
      x: {
        adapters: {
          date: {locale: enGB},
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
        data: [{x: startDate, y: currentWeight}, {x: endDate, y: currentGoal.goal_weight}],
        borderColor: '#FFCE0E',
        backgroundColor: '#FFCE0E',
        borderDash: [3]
      }
    ],
  };

  return(
    <Container className="border border-secondary">
      <Row>
        <Line
          options={options}
          data={data}
          style={{vh:50}}
          datasetIdKey="id"
        />
      </Row>
    </Container>
  )
}

export default GoalChart; 