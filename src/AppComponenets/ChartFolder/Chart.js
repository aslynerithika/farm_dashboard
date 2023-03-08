import './Chart.css';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function ChartDisplay(){
  return(null)
   
}

//export default ChartDisplay;

       
const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  const data = {
    labels: labels,
    datasets: [
      {
        
        label: "Temperature",
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgb(255, 99, 235)",
        data: [5, 10, 5, 2, 20, 30, 45, 40, 35, 20, 15, 25],
        borderWidth: 1

      },
    ],
  };
  return (
    <div className = "barChart">
      <Bar data={data} />
    </div>
  );
};

  
export default BarChart;