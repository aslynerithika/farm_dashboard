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

var fetchedData = null;

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
var valuesToDisplay = []
var clicked = false;
function Chart(params){

  const monthLabels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  const weekLabels = [];
  const [labels, setLabels] = useState(monthLabels);
  // Initializes states for selected outcomes
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
  const {selectedDate, setSelectedDate} = useContext(selectedDateContext);
  const [selectedOutcome, setSelectedOutcome] = useState('Temperature');
  const [selectedChartType, setSelectedChartType] = useState('Bar');


  const [valuesToPlotState, setValuesToPlotState] = useState([2,2,2,2,2,2,2,2,2,2,2,2]);
  var valuesToPlot = [2,2,2,2,2,2,2,2,2,2,2,2];
  
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

  useEffect(() => {
    fetchLandPlotsData.then((successData) => {
      fetchedData = successData;
      var plotdata = getPlotData(successData, selectedLandPlot);
      for(var i=1; i<=12; i++){
        var monthIndex = i < 10? "0"+i : i.toString();
        var plotMonthData = getMonthDataFromPlot(plotdata, [monthIndex]);
        var plotMonthSoilVarAvgs = getSoilVarsAvg(plotMonthData);
        months[monthIndex].avgVals = plotMonthSoilVarAvgs;
      }
      var monthsSoilVar = [];
      for(var i = 1; i<=12; i++){
        var monthIndex = i < 10? "0"+i : i.toString();
        monthsSoilVar.push(months[monthIndex].avgVals[selectedSoilVarIndex]);
        valuesToDisplay = monthsSoilVar;
        valuesToPlot = valuesToDisplay;
        setValuesToPlotState(valuesToDisplay);
      }
    });
  }, []);

  if(params.refresh === "true"){
    if(fetchedData && clicked == false){
      console.log("hey");

      var plotdata = getPlotData(fetchedData, selectedLandPlot);
      for(var i=1; i<=12; i++){
        var monthIndex = i < 10? "0"+i : i.toString();
        var plotMonthData = getMonthDataFromPlot(plotdata, [monthIndex]);
        var plotMonthSoilVarAvgs = getSoilVarsAvg(plotMonthData);
        months[monthIndex].avgVals = plotMonthSoilVarAvgs;
      }
      var monthsSoilVar = [];
      for(var i = 1; i<=12; i++){
        var monthIndex = i < 10? "0"+i : i.toString();
        monthsSoilVar.push(months[monthIndex].avgVals[selectedSoilVarIndex]);
        valuesToDisplay = monthsSoilVar;
        valuesToPlot = valuesToDisplay;
      }
    }else{

    }
  }
  console.log(valuesToPlot);

  const handleOutcomeChange = (event) => {
    setSelectedOutcome(event.target.value); // Update the outcome when user changes dropdown
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value); // Updates the type of chart shown when user changes the outcome
  }
  
  // Array.from(months).forEach((month, key) => {
  //   var monthsSoilVar = [];
  //   monthsSoilVar.push(month[1][selectedSoilVarIndex]);
  //   console.log(monthsSoilVar);
  //   valuesToDisplay = monthsSoilVar;
  // });

  const ChartComponent = selectedChartType === 'Bar' ? Bar : Line;

  const chartRef = useRef();
  const onClick = (event) => {
    clicked = true;
    var chartIndex = getElementsAtEvent(chartRef.current, event)[0].index + 1;
    //console.log(getElementsAtEvent(chartRef.current, event)[0].index);
    var monthIndex = chartIndex < 10? "0"+chartIndex : chartIndex.toString();
    var plotdata = getPlotData(fetchedData, selectedLandPlot);
    var plotMonthData = getMonthDataFromPlot(plotdata, [monthIndex]);

    //console.log(plotMonthData.length);
    var monthDayUpper = 0;
    //console.log(plotMonthData);
    for(var i = 0; i < plotMonthData.length; i++){
      var dayNum = parseInt(plotMonthData[i]["Date"].value.split("-")[2]);
      if(dayNum > monthDayUpper){
        monthDayUpper = dayNum;
      }
    }
    //console.log(monthDayUpper);

    //Initialize the the weeks array that will have days pushed into
    var weekCount = monthDayUpper/7;
    var monthDays = [];
    // for(var i=1; i <= weekCount.length; i++){
    //   var newWeek = [];
    //   monthDays.push(newWeek);
    // }
    //console.log(monthDays);

    const SOIL_VARS = {
      1:"moisture",
      2:"PH", 
      3:"sunlight", 
      4:"temp"
    };    

    for(var i = 0; i < plotMonthData.length; i++){
      var dayNum = parseInt(plotMonthData[i]["Date"].value.split("-")[2]);
      var daySoilVars = []
      Object.keys(API_SOIL_VARS).forEach((index, key) => {
        daySoilVars.push(plotMonthData[i][API_SOIL_VARS[index]]);
      });
      monthDays.push({"day":dayNum, "soilVars":{"moisture":daySoilVars[0],"PH":daySoilVars[1],"sunlight":daySoilVars[2],"temp":daySoilVars[3]}});
    }
    var sortedMonthDays = monthDays.sort((a,b)=>(a.day-b.day));
    //console.log(sortedMonthDays);
    //console.log(weekCount);
    var weeks = [];
    var c = 0;
    for(var i = 0; i < monthDays.length; i++){
      if(!weeks[c]){
        weeks.push([]);
      }
      //console.log(weeks);
      weeks[c].push(monthDays[i]);
      if((i+1)%7 == 0){
        c++;
      }
    }
    
    var weekAvgs = [];
    for(var i=0; i<weeks.length; i++){
      var soilVarsTotal = {
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0
      }
      weekLabels.push("Week "+(i+1));
      Object.keys(weeks[i]).forEach((day, key) => {
        Object.keys(soilVarsTotal).forEach((value, index) => {
          //console.log(weeks[i][day].soilVars[SOIL_VARS[value]]);
          soilVarsTotal[value] += weeks[i][day].soilVars[SOIL_VARS[value]];
        });
      });

      Object.keys(soilVarsTotal).forEach((value,index) =>{
        var avgVal = soilVarsTotal[value]/weeks[i].length;
        if(value != 2){
          soilVarsTotal[value] = Math.trunc(avgVal);
        }else{
          soilVarsTotal[value] = parseFloat(avgVal.toFixed(1));
        }
      });
      var soilVarsTotalArr = [soilVarsTotal[1], soilVarsTotal[2], soilVarsTotal[3], soilVarsTotal[4]];
      weekAvgs.push(soilVarsTotalArr[selectedSoilVarIndex-1]);
    }
    console.log(weekAvgs);
    setValuesToPlotState(weekAvgs);
    setLabels(weekLabels);
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
        data={{
          labels: labels,
          datasets: [
            {
              label: `Temperature - Plot ${selectedLandPlot}`, 
              backgroundColor: 'rgba(54, 162, 235, 1)',
              borderColor: "rgba(54, 162, 235, 1)",
              data: fetchedData && clicked == false? valuesToPlot : valuesToPlotState,
              borderWidth: 2
            },
          ],
        }}
        onClick={onClick}
        ref = {chartRef}
       />
    </div>
  );

};

  
export default Chart;