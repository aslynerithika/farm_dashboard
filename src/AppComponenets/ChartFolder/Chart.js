import './Chart.css';
import "chart.js/auto";
import { Bar, Line, getElementsAtEvent } from "react-chartjs-2";
import { useState, useEffect, useContext, useRef } from 'react';
import { selectedLandPlotContext } from '../../pages/LandPlots';
import { selectedDateContext } from '../../pages/LandPlots';
import fetchLandPlotsData from '../../CustomHooks/FetchData.js';
import { getPlotData, getMonthDataFromPlot, getSoilVarsAvg, getMaxAndMinValues } from '../AdjustSoilConFolder/FilterData.js';
import React from 'react';
import Gradient from "javascript-color-gradient";

const API_SOIL_VARS = {
  1:"AVG_Humidity__",
  2:"PH", 
  3:"AVG_Light__", 
  4:"Temp_C"
};

var fetchedData = null;

// var monthsBluePrint = {
//   "01": {monthName:"January", avgVals:{}, weeks:{}},
//   "02": {monthName:"February", avgVals:{}, weeks:{}},
//   "03": {monthName:"March", avgVals:{}, weeks:{}},
//   "04": {monthName:"April", avgVals:{}, weeks:{}},
//   "05": {monthName:"May", avgVals:{}, weeks:{}},
//   "06": {monthName:"June", avgVals:{}, weeks:{}},
//   "07": {monthName:"July", avgVals:{}, weeks:{}},
//   "08": {monthName:"August", avgVals:{}, weeks:{}},
//   "09": {monthName:"September", avgVals:{}, weeks:{}},
//   "10": {monthName:"October", avgVals:{}, weeks:{}},
//   "11": {monthName:"November", avgVals:{}, weeks:{}},
//   "12": {monthName:"December", avgVals:{}, weeks:{}}
// }

function createMonths(){
  return {
    "months": {
      "01": {monthName:"January", avgVals:{}, weeks:{}},
      "02": {monthName:"February", avgVals:{}, weeks:{}},
      "03": {monthName:"March", avgVals:{}, weeks:{}},
      "04": {monthName:"April", avgVals:{}, weeks:{}},
      "05": {monthName:"May", avgVals:{}, weeks:{}},
      "06": {monthName:"June", avgVals:{}, weeks:{}},
      "07": {monthName:"July", avgVals:{}, weeks:{}},
      "08": {monthName:"August", avgVals:{}, weeks:{}},
      "09": {monthName:"September", avgVals:{}, weeks:{}},
      "10": {monthName:"October", avgVals:{}, weeks:{}},
      "11": {monthName:"November", avgVals:{}, weeks:{}},
      "12": {monthName:"December", avgVals:{}, weeks:{}}
    }
  }
}
var plots_of_land = [];
 // 1 : {months : Object.create(monthsBluePrint)},

function reOrganizeDays(plotMonthData){
  var monthDays = [];
  for(var i = 0; i < plotMonthData.length; i++){
    var dayNum = parseInt(plotMonthData[i]["Date"].value.split("-")[2]);
    var daySoilVars = []
    Object.keys(API_SOIL_VARS).forEach((index, key) => {
      daySoilVars.push(plotMonthData[i][API_SOIL_VARS[index]]);
    });
    monthDays.push({"day":dayNum, "soilVars":{"moisture":daySoilVars[0],"PH":daySoilVars[1],"sunlight":daySoilVars[2],"temp":daySoilVars[3]}});
  }
  monthDays = monthDays.sort((a,b) => (a.day > b.day) ? 1 : -1);
  return monthDays;
}

function createWeeks(monthDays){
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
  return weeks;
}
 
const SOIL_VARS = {
  1:"moisture",
  2:"PH", 
  3:"sunlight", 
  4:"temp"
};    
function getWeekSoilVarAvgs(weeks){
  var weekAvgs = [];

  for(var i=0; i<weeks.length; i++){
    var soilVarsTotal = {
      1 : 0,
      2 : 0,
      3 : 0,
      4 : 0
    }
    Object.keys(weeks[i]).forEach((day, key) => {
      Object.keys(soilVarsTotal).forEach((value, index) => {
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
    weekAvgs.push(soilVarsTotalArr);
  }
  return weekAvgs;
}

var columnColours = [];
var lineColors = [];
const tempGradient = new Gradient()
  .setColorGradient("#00d3ff", "#8200ff", "#ff0000")
  .setMidpoint(30);
const sunlightGradient = new Gradient()
  .setColorGradient("#fff500", "#ff8300")
  .setMidpoint(100);
const phGradient = new Gradient()
  .setColorGradient("#ee1c25", "#f16824","#f8c511","#f5ed1c","#b5d335","#83c241","#4db749","#33a94b","#22b46b","#09bab4","#4690cd","#3853a4","#5a51a2","#63459d")
  .setMidpoint(14);
const moistGradient = new Gradient()
  .setColorGradient("#00e8ff", "#006cff")
  .setMidpoint(100);

var maxAndMinValues;

var selectedSoilVarIndex;
function updateColumnColours(columnValues, selectedChartType){
  columnColours = [];
  if(selectedChartType != "Bar"){
    lineColors = [];
  }
  columnValues.forEach((value,index)=>{
    var colortopush;

    if(value <= 0){
      value = 1;
    }
    if(selectedSoilVarIndex == 1){
      colortopush = moistGradient.getColor(value);
    }else if(selectedSoilVarIndex == 2){
      colortopush = phGradient.getColor(value);
    }else if(selectedSoilVarIndex == 3){
      colortopush = sunlightGradient.getColor(value);
    }else if(selectedSoilVarIndex == 4){
      colortopush = tempGradient.getColor(value);
    }
    columnColours.push(colortopush);
    if(selectedChartType != "Bar"){
      lineColors.push(colortopush);
    }
  });
}

//var weeksAvgs = [];
function Chart(params){

  const monthLabels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  // Initializes states for selected outcomes
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
  const {selectedDate, setSelectedDate} = useContext(selectedDateContext);
  const [selectedOutcome, setSelectedOutcome] = useState('Temperature');
  const [selectedChartType, setSelectedChartType] = useState('Bar');


  const [valuesToPlotState, setValuesToPlotState] = useState([2,2,2,2,2,2,2,2,2,2,2,2]);
  var valuesToPlot = [2,2,2,2,2,2,2,2,2,2,2,2];
  var labels = monthLabels;
  
  if (selectedOutcome === 'Temperature') {
    selectedSoilVarIndex = 4;
  } else if (selectedOutcome === 'Moisture') {
    selectedSoilVarIndex = 1;
  } else if (selectedOutcome === 'pH Level') {
    selectedSoilVarIndex = 2;
  } else if (selectedOutcome === 'Sunlight') {
    selectedSoilVarIndex = 3;
  }

  useEffect(() => {
    fetchLandPlotsData.then((successData) => {
      maxAndMinValues = getMaxAndMinValues(successData);
      fetchedData = successData;
      
      var monthsSoilVar = [];

      //initialize plots of land object
      for(var i=1; i<=10; i++){
        let newMonths = new createMonths();
        plots_of_land.push(newMonths);
      }

      for(var j=1; j<=10; j++){
        var plotdata = getPlotData(successData, j);
        for(var i=1; i<=12; i++){
          var monthIndex = i < 10? "0"+i : i.toString();
          var plotMonthData = getMonthDataFromPlot(plotdata, monthIndex);
          var plotMonthSoilVarAvgs = getSoilVarsAvg(plotMonthData);
          plots_of_land[j-1]["months"][monthIndex].avgVals = plotMonthSoilVarAvgs;

          var monthDays = reOrganizeDays(plotMonthData);
          var weeks = createWeeks(monthDays);
          //debugging purposes
          // if(j==2 && i==12){
          //   console.log(weeks);
          // }
          var weekAvgs = getWeekSoilVarAvgs(weeks);
          plots_of_land[j-1]["months"][monthIndex].weeks = weekAvgs;

          if(j==selectedLandPlot){
            monthsSoilVar.push(plots_of_land[selectedLandPlot-1]["months"][monthIndex].avgVals[selectedSoilVarIndex]);
          }
        }
      }
      //console.log(monthsSoilVar);
      updateColumnColours(monthsSoilVar, selectedChartType);
      setValuesToPlotState(monthsSoilVar);
      //console.log(plots_of_land);
    });
  }, []);

  if(params.refresh === "true"){
    if(fetchedData ){
      console.log("hey");

      //var plotdata = getPlotData(fetchedData, selectedLandPlot);
      if(!selectedDate){
        var monthsSoilVar = [];
        for(var i=1; i<=12; i++){
          var monthIndex = i < 10? "0"+i : i.toString();
          monthsSoilVar.push(plots_of_land[selectedLandPlot-1]["months"][monthIndex].avgVals[selectedSoilVarIndex]);
          //monthsSoilVar.push(months[monthIndex].avgVals[selectedSoilVarIndex]);
        }
        valuesToPlot = monthsSoilVar;
      }else{
        var weekLabels = [];
        var weekAvgSoilVars = [];
        //console.log(plots_of_land[selectedLandPlot-1]["months"][selectedDate].weeks);
        console.log(plots_of_land[selectedLandPlot-1]["months"][selectedDate].weeks);
        plots_of_land[selectedLandPlot-1]["months"][selectedDate].weeks.forEach((value, i) => {
          weekLabels.push("Week "+(i+1));
          weekAvgSoilVars.push(value[selectedSoilVarIndex-1]);
        });
        labels = weekLabels;
        valuesToPlot = weekAvgSoilVars;
      }
      updateColumnColours(valuesToPlot, selectedChartType);
    }
  }
  console.log(valuesToPlot);

  const handleOutcomeChange = (event) => {
    setSelectedOutcome(event.target.value); // Update the outcome when user changes dropdown
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value); // Updates the type of chart shown when user changes the outcome
  }

  const ChartComponent = selectedChartType === 'Bar' ? Bar : Line;

  const chartRef = useRef();
  const onClick = (event) => {

    if(getElementsAtEvent(chartRef.current, event)[0] && selectedDate == null){
      var chartIndex = getElementsAtEvent(chartRef.current, event)[0].index + 1;
      var monthIndex = chartIndex < 10? "0"+chartIndex : chartIndex.toString();

      setSelectedDate(monthIndex);
      //console.log(selectedDate);
      //console.log(weekAvgs);
      //setValuesToPlotState(weekAvgSoilVars);
      //setLabels(weekLabels);

    }else if(selectedDate != null){
      setSelectedDate(null);
      //console.log("here");
    }
  };

  console.log(selectedChartType === 'Bar'? "#36A2EB": lineColors);
  var chartLabel = selectedDate? plots_of_land[selectedLandPlot-1]["months"][selectedDate].monthName : "Annual";
  return (
    <div className = "chart">
      <div className="dropdowns">
        <select value={selectedOutcome} onChange={handleOutcomeChange}>
          <option value="Temperature">Temperature</option>
          <option value="Moisture">Moisture</option>
          <option value="pH Level">pH Level</option>
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
              label: `${selectedOutcome} - ${chartLabel}`, 
              backgroundColor: columnColours,
              borderColor: (selectedChartType === 'Bar'? "rgba(0, 0, 0, 0.1)": lineColors),
              data: fetchedData? valuesToPlot : valuesToPlotState,
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