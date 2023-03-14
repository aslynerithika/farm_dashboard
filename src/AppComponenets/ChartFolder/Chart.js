import './Chart.css';
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useState } from 'react';
import fetchLandPlotsData from '../../CustomHooks/FetchData.js';

//export default ChartDisplay;

       
const BarChart = () => {
  //console.log(fetchLandPlotsData);
  const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  
  const [selectedOutcome, setSelectedOutcome] = useState('Temperature'); 
  const [selectedChartType, setSelectedChartType] = useState('Bar') // Initializes states for selected outcomes
  
  const dataForTemperature = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature', 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: [5, 10, 5, 2, 20, 30, 45, 40, 35, 20, 15, 25],
        borderWidth: 2
      },
    ],
  };

  const dataForMoisture = {
    labels: labels,
    datasets: [
      {
        label: 'Moisture', 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: [5, 10, 5, 2, 20, 30, 45, 40, 35, 20, 15, 25],
        borderWidth: 2
      },
    ],
  };

  const dataForPHLevel = {
    labels: labels,
    datasets: [
      {
        label: 'PH Level', 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: [5, 10, 5, 2, 20, 30, 45, 40, 35, 20, 15, 25],
        borderWidth: 2
      },
    ],
  };

  const dataForSunlight = {
    labels: labels,
    datasets: [
      {
        label: 'Sunlight', 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: [5, 10, 5, 2, 20, 30, 45, 40, 35, 20, 15, 25],
        borderWidth: 2
      },
    ],
  };

  const handleOutcomeChange = (event) => {
    setSelectedOutcome(event.target.value); // Update the outcome when user changes dropdown
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value); // Updates the type of chart shown when user changes the outcome
  }

  let data = {}; // Define a data variable based on the selected outcome

  if (selectedOutcome === 'Temperature') {
    data = dataForTemperature;
  } else if (selectedOutcome === 'Moisture') {
    data = dataForMoisture;
  } else if (selectedOutcome === 'PH Level') {
    data = dataForPHLevel;
  } else if (selectedOutcome === 'Sunlight') {
    data = dataForSunlight;
  }

  const ChartComponent = selectedChartType === 'Bar' ? Bar : Line;

  return (
    <div className = "chart">
      <div className="dropdowns">
        <select value={selectedOutcome} onChange={handleOutcomeChange}>
          <option value="Temperature">Temperature</option>
          <option value="Moisture">Moisture</option>
          <option value="PH Level">PH Level</option>
          <option value="Sunlight">Sunlight</option>
        </select>
        <select value={selectedChartType} onChange={handleChartTypeChange}>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>
      <ChartComponent data={data} />
    </div>
  );

};

  
export default BarChart;