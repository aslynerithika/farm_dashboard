import './Chart.css';
import "chart.js/auto";
import { Bar, Line, getElementsAtEvent } from "react-chartjs-2";
import { useState, useEffect, useContext, useRef } from 'react';
import { selectedLandPlotContext } from '../../pages/LandPlots';
import { selectedDateContext } from '../../pages/LandPlots';
import fetchLandPlotsData from '../../CustomHooks/FetchData.js';
import { getPlotData, getMonthDataFromPlot, getSoilVarsAvg } from '../AdjustSoilConFolder/FilterData.js';
import React from 'react';

const API_SOIL_VARS = {
  1:"AVG_Humidity__",
  2:"PH", 
  3:"AVG_Light__", 
  4:"Temp_C"
};

function Chart(){

  const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  
  // Initializes states for selected outcomes
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
  const {selectedDate, setSelectedDate} = useContext(selectedDateContext);
  const [selectedOutcome, setSelectedOutcome] = useState('Temperature'); 
  const [selectedChartType, setSelectedChartType] = useState('Bar') 

  var months = {
    "01": {monthName:"January", avgVals:{}},
    "02": {monthName:"February", avgVals:{}},
    "03": {monthName:"March", avgVals:{}},
    "04": {monthName:"April", avgVals:{}},
    "05": {monthName:"May", avgVals:{}},
    "06": {monthName:"June", avgVals:{}},
    "07": {monthName:"July", avgVals:{}},
    "08": {monthName:"August", avgVals:{}},
    "09": {monthName:"September", avgVals:{}},
    "10": {monthName:"October", avgVals:{}},
    "11": {monthName:"November", avgVals:{}},
    "12": {monthName:"December", avgVals:{}}
  }

  var valuesToDisplay = [

  ]

  fetchLandPlotsData.then((successData) => {
    var plotdata = getPlotData(successData, selectedLandPlot);
    for(var i=1; i<12; i++){
      var monthIndex = i < 10? "0"+i : i.toString();
      var plotMonthData = getMonthDataFromPlot(plotdata, [monthIndex]);
      var plotMonthSoilVarAvgs = getSoilVarsAvg(plotMonthData);
      months[monthIndex].avgVals = plotMonthSoilVarAvgs;
    }
    console.log(months);
  });

  const handleOutcomeChange = (event) => {
    setSelectedOutcome(event.target.value); // Update the outcome when user changes dropdown
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value); // Updates the type of chart shown when user changes the outcome
  }

  var selectedSoilVarIndex;
  if (selectedOutcome === 'Temperature') {
    selectedSoilVarIndex = 4;
  } else if (selectedOutcome === 'Moisture') {
    selectedSoilVarIndex = 1;
  } else if (selectedOutcome === 'PH Level') {
    selectedSoilVarIndex = 2;
  } else if (selectedOutcome === 'Sunlight') {
    selectedSoilVarIndex = 3;
  }

  var monthsSoilVar = [];
  for(var i = 1; i<12; i++){
    var monthIndex = i < 10? "0"+i : i.toString();
    console.log(months[monthIndex]); // months[monthIndex][1] dont work?!
    monthsSoilVar.push(months[monthIndex].avgVals[selectedSoilVarIndex]);
    valuesToDisplay = monthsSoilVar;
    console.log(valuesToDisplay);
  }
  
  // Array.from(months).forEach((month, key) => {
  //   var monthsSoilVar = [];
  //   monthsSoilVar.push(month[1][selectedSoilVarIndex]);
  //   console.log(monthsSoilVar);
  //   valuesToDisplay = monthsSoilVar;
  // });

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Temperature - Plot ${selectedLandPlot}`, 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: valuesToDisplay,
        borderWidth: 2
      },
    ],
  };

  const ChartComponent = selectedChartType === 'Bar' ? Bar : Line;

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementsAtEvent(chartRef.current, event)[0]);
  };

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
      <ChartComponent 
        data={data}
        onClick={onClick}
        ref = {chartRef}
       />
    </div>
  );

};

  
export default Chart;