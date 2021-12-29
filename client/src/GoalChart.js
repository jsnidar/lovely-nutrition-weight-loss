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

const GoalChart = ({currentUser}) => {
  const currentGoal = currentUser.goals[currentUser.goals.length - 1]
  let goalCheckIns = []
  currentUser.check_ins.forEach(checkIn => {
    if(new Date(checkIn.date) >= new Date(currentGoal.goal_start_date) && new Date(checkIn.date) <= new Date(currentGoal.goal_end_date)) {
      goalCheckIns.push({x: checkIn.date, y: checkIn.weight})
    }
  })

  goalCheckIns = goalCheckIns.sort(function(a,b){
    return new Date(a.x) - new Date(b.x);
  })
  console.log(goalCheckIns)
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
        data: [{x: currentGoal.goal_start_date, y: goalCheckIns[0].y}, {x: currentGoal.goal_end_date, y:currentGoal.goal_weight}],
        borderColor: '#FFCE0E',
        backgroundColor: '#FFCE0E',
      }
    ],
  };

  return(
    <Line
      options={options}
      data={data}
      style={{vh:50}}
    />
  )
}

export default GoalChart; 