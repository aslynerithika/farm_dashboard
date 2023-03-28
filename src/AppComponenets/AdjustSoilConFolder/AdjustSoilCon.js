import './AdjustSoilCon.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Gradient from "javascript-color-gradient";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fetchLandPlotsData from '../../CustomHooks/FetchData.js';
import { selectedLandPlotContext } from '../../pages/LandPlots';
import { selectedDateContext } from '../../pages/LandPlots';
import { getPlotData, getSoilVarsAvg, getMaxAndMinValues, getMonthDataFromPlot } from './FilterData';
import CROP_DATA from '../CropInfoFolder/CropData';

const MoistDefaultValue = 30;
const phDefaultValue = 7;
const SunlightDefaultValue = 30;
const TempDefaultValue = 23;

// window.addEventListener("resize", function() {
//   var sliders = document.getElementsByClassName("MuiSlider-root");
//   var sliderInputs = document.getElementsByClassName("MuiInputBase-input");
//   if (!window.matchMedia("(min-width: 900px)").matches){
//     for(var i = 0; i < sliders.length; i++){
//       var slider = sliders[i];
//       var markLabels = slider.querySelectorAll(".MuiSlider-markLabel");
//       var markPoints = slider.querySelectorAll(".MuiSlider-mark");
      
//       var count = 0;
//       markLabels.forEach(function(){
//         if(count % 2 != 0){
//           markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
//           markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
//         }
//         count++;
//       });
//     }
//   }else{
//     for(var i = 1; i < sliderInputs.length+1; i++){
//       onChangeFunc(i, parseFloat(sliderInputs[i-1].value));
//     }
//   }
// })

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

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    slider_1: {
      main: moistGradient.getColor(MoistDefaultValue),
      contrastText: '#fff',
    },
    slider_2: {
      main: phGradient.getColor(phDefaultValue),
      contrastText: '#fff',
    },
    slider_3: {
      main: sunlightGradient.getColor(SunlightDefaultValue),
      contrastText: '#fff',
    },
    slider_4: {
      main: tempGradient.getColor(TempDefaultValue),
      contrastText: '#fff',
    }
  },
});

const Input = styled(MuiInput)`width: 42px;`;
var fetchedData = null;

const API_SOIL_VARS = {
  1:"AVG_Humidity__",
  2:"PH", 
  3:"AVG_Light__", 
  4:"Temp_C"
};

function onChangeFunc(slideNum, sliderValue, minAndMaxValues, markLabelsArray){
  var slider = document.getElementById("slider_"+slideNum);
  var sliderValue = parseFloat(sliderValue);
  var colorSliderValue = sliderValue;

  if(sliderValue <= 0){
    colorSliderValue = 1;
  }
  try{
    if(slideNum == 1){
      slider.style.color = moistGradient.getColor(colorSliderValue);
    }else if(slideNum == 2){
      slider.style.color = phGradient.getColor(colorSliderValue);
    }else if(slideNum == 3){
      slider.style.color = sunlightGradient.getColor(colorSliderValue);
    }else if(slideNum == 4){
      slider.style.color = tempGradient.getColor(colorSliderValue);
    }
  }catch{
    console.log("colorslidervalue: '" + colorSliderValue + "'");
  }
  var markLabels = slider.querySelectorAll(".MuiSlider-markLabel");
  var markPoints = slider.querySelectorAll(".MuiSlider-mark");
  var count = 0;
  markLabels.forEach(function(markLabel){
    var markLabelNum = markLabelsArray && markLabelsArray[slideNum][count]? markLabelsArray[slideNum][count]["value"] : markLabel.textContent.match(/\d+/g);
    if(markLabelNum[1]){
      markLabelNum = markLabelNum[0]+"."+markLabelNum[markLabelsArray? 2 : 1];
    }
    if(parseFloat(markLabelNum) <= sliderValue){
      markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
      markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
    }else{
      markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
      markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
    }
    count++;
  });

  var maxdiff = minAndMaxValues[slideNum].max - minAndMaxValues[slideNum].min;
  var sliderRail = slider.querySelector(".MuiSlider-rail");
  //console.log(sliderValue + " / " + maxdiff + " = " + ((sliderValue - minAndMaxValues[slideNum].min)/maxdiff));
  var sliderValuePrecentage = ((sliderValue - minAndMaxValues[slideNum].min)/maxdiff)*100;
  if(sliderValuePrecentage <= 10 && sliderValuePrecentage >= 5){
    sliderRail.setAttribute("style", "border-radius: 20px 20px 20px 20px !important;");
  }else if(sliderValuePrecentage < 5){
    sliderRail.setAttribute("style", "border-radius: 20px 20px 0px 0px !important;");
  }else{
    sliderRail.setAttribute("style", "border-radius: 20px 20px 40px 40px !important;");
  }
};

class AvgText extends React.Component{
  render(){
    var titleTextHtml = (null);
    if(this.props.enabled){
      var titleText = "Average values*";
      if(this.props.cropView == true){
        titleText += " for ideal soil conditions";
      }
      titleTextHtml = <a>{titleText}</a>;
    }
    return titleTextHtml;
  }
}

var cropAvgSoil = {};

function createMonths(){
  return {
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
}
var plots_of_land = [];

function AdjustSoilCon(params){
  var soil_box_title = "Adjust";

  const selectedCrop = "Rice";
  const {selectedDate, setSelectedDate} = useContext(selectedDateContext);
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);

  const [MoistMaxAndMin, setMoistMaxAndMin] = useState({min:0, max:250});
  const [phMaxAndMin, setphMaxAndMin] = useState({min:0, max:60});
  const [SunlightMaxAndMin, setSunlightMaxAndMin] = useState({min:0, max:250});
  const [TempMaxAndMin, setTempMaxAndMin] = useState({min:0, max:200});

  const minAndMaxValues = {
    1 : MoistMaxAndMin,
    2 : phMaxAndMin,
    3 : SunlightMaxAndMin,
    4 : TempMaxAndMin
  }
  
  const SetminAndMaxValues = {
    1 : setMoistMaxAndMin,
    2 : setphMaxAndMin,
    3 : setSunlightMaxAndMin,
    4 : setTempMaxAndMin
  }

  const [MoistMarks, setMoistMarks] = useState(new Array(6).fill({value:0, label:"1%"}));
  const [phMarks, setphMarks] = useState(new Array(6).fill({value:0, label:"1pH"}));
  const [SunlightMarks, setSunlightMarks] = useState(new Array(6).fill({value:0, label:"1%"}));
  const [TempMarks, setTempMarks] = useState(new Array(6).fill({value:0, label:"1C"}));

  const sliderMarks = {
    1 : MoistMarks,
    2 : phMarks,
    3 : SunlightMarks,
    4 : TempMarks
  }

  const SetsliderMarks = {
    1 : setMoistMarks,
    2 : setphMarks,
    3 : setSunlightMarks,
    4 : setTempMarks
  }

  var cropSoilVars ={
    1 : "PH",
    2 : "moisture",
    3 : "sunlight",
    4 : "temp"
  }
  useEffect(() => {
    const landPlotsData = fetchLandPlotsData;
    //console.log(landPlotsData);

    cropAvgSoil = CROP_DATA;
    //get avg crop data
    if(params.mode === "cropView"){
      Object.keys(cropAvgSoil).forEach((cropName,index) => {
        for(var i=1; i<=4; i++){
          var cropAvgSoilVal;
          console.log(cropAvgSoil[cropName][cropSoilVars[i]]);
          cropAvgSoil[cropName][cropSoilVars[i]].forEach((num, index) => {
            //console.log(num);
            var count = 0;
            count += num;
            if(index+1 == cropAvgSoil[cropName][cropSoilVars[i]].length){
              cropAvgSoilVal = count/2
            }
          })
          cropAvgSoil[cropName][cropSoilVars[i]] = cropAvgSoilVal;
        }
      });
    }

    landPlotsData.then((successData) => {
      fetchedData = successData;

      //get annual avg data
      for(var i=1; i<=10; i++){
        var plotData = getPlotData(fetchedData, i);
        var annualSoilVarsAvg = getSoilVarsAvg(plotData);
        let months = new createMonths();
        plots_of_land.push({"annual_avg":annualSoilVarsAvg, months});

        //get monthly avg data
        for(var j=1; j<=12; j++){
          var monthIndex = j < 10? "0"+j : j.toString();
          var plotMonthData = getMonthDataFromPlot(plotData, monthIndex);
          var plotMonthSoilVarAvgs = getSoilVarsAvg(plotMonthData);
          plots_of_land[i-1].months[monthIndex].avgVals = plotMonthSoilVarAvgs;
        }
      }

      var soilVariablesList = getMaxAndMinValues(fetchedData);

      var sliderMarksList = {
        1 : null,
        2 : null,
        3 : null,
        4 : null
      };
      for(var soilVarIndex = 1; soilVarIndex <= Object.keys(soilVariablesList).length; soilVarIndex++){
        SetminAndMaxValues[soilVarIndex]({min:soilVariablesList[soilVarIndex].min, max:soilVariablesList[soilVarIndex].max});
        var markLabelsArray = [];
        var markLabelsAmount = 6;
        for(var markLabelCount = 1; markLabelCount < markLabelsAmount; markLabelCount++){
          var maxdiff = soilVariablesList[soilVarIndex].max - soilVariablesList[soilVarIndex].min;
          var numToAdd = (maxdiff/markLabelsAmount)*markLabelCount;
          var markValue = soilVariablesList[soilVarIndex].min + numToAdd;
          if(soilVarIndex != 2){
            markValue = Math.trunc(markValue);
          }else{
            markValue = markValue.toFixed(1);
          }
          var addOnList = {value: markValue, label: markValue+sliderInputUnitMeasure[soilVarIndex]};
          markLabelsArray.push(addOnList);
        }
        SetsliderMarks[soilVarIndex](markLabelsArray);
        sliderMarksList[soilVarIndex] = markLabelsArray;
      }

      var sliderInputs = document.getElementsByClassName("MuiInputBase-input");
      for(var i = 1; i < sliderInputs.length+1; i++){
        onChangeFunc(i, parseFloat(sliderInputs[i-1].value), soilVariablesList, sliderMarksList);
      }
      var sliderContainer = document.getElementsByClassName("slider_container")[0];
      sliderContainer.setAttribute("style", "pointer-events: unset !important");
    })
    .catch((failMsg) => {
      console.log(failMsg);
    });
  }, []);

  var classToAdd;
  if(params.disableAdjustSoilCon === "true"){
    classToAdd = " disabled";
  }else{
    classToAdd = "";
  }

  const [MoistValue, setMoistValue] = useState(MoistDefaultValue);
  const [phValue, setphValue] = useState(phDefaultValue);
  const [SunlightValue, setSunlightValue] = useState(SunlightDefaultValue);
  const [TempValue, setTempValue] = useState(TempDefaultValue);


  const SliderVars = {
    1 : [MoistValue, setMoistValue, MoistDefaultValue],
    2 : [phValue, setphValue, phDefaultValue],
    3 : [SunlightValue, setSunlightValue, SunlightDefaultValue],
    4 : [TempValue, setTempValue, TempDefaultValue]
  }
  const inputStepValues = {
    1 : 10,
    2 : 1,
    3 : 10,
    4 : 5
  }
  const sliderStepValues = {
    1 : 1,
    2 : 0.1,
    3 : 1,
    4 : 1
  }
  const sliderImgSrc = {
    1 : "moist",
    2 : "ph",
    3 : "sun",
    4 : "temp"
  }
  const sliderTitles = {
    1 : "Moisture",
    2 : "pH",
    3 : "Sunlight",
    4 : "Temperature"
  }
  const sliderInputUnitMeasure = {
    1 : "%",
    2 : "pH",
    3 : "%",
    4 : "°C"
  }

  const SliderInputs = [];
  const SlidersTitles = [];
  const Sliders = [];

  const SliderVarsLandPlot = {
    1 : {value:30},
    2 : {value:7},
    3 : {value:50},
    4 : {value:20}
  }
  var soilBoxStyle = (null);
  if(params.mode === "landPlot"){
    if(fetchedData){

      soilBoxStyle = {gridTemplateRows: "80px 20px 1fr 100px"};

      soil_box_title = selectedDate? plots_of_land[selectedLandPlot-1].months[selectedDate].monthName : "Annual";
      // const plotData = getPlotData(fetchedData, selectedLandPlot);
      // var soilVarsAvg = getSoilVarsAvg(plotData);
      for(let i = 1; i <= 4; i++){
        if(selectedDate){
          SliderVarsLandPlot[i].value = plots_of_land[selectedLandPlot-1].months[selectedDate].avgVals[i];
        }else{
          SliderVarsLandPlot[i].value = plots_of_land[selectedLandPlot-1].annual_avg[i];
        }
        onChangeFunc(i, SliderVarsLandPlot[i].value, minAndMaxValues, sliderMarks);
      }
    }
  }else if(params.mode === "cropView"){
    if(fetchedData){
      soilBoxStyle = {gridTemplateRows: "80px 20px 1fr 100px"};

      soil_box_title = selectedCrop;

      console.log(cropAvgSoil);
      try{
        for(let i = 1; i <= 4; i++){
          var cropSoilVarIndex;
          if(i==1){
            cropSoilVarIndex = 2;
          }else if(i==2){
            cropSoilVarIndex = 1;
          }else if(i==3){
            cropSoilVarIndex = 3;
          }else if(i==4){
            cropSoilVarIndex = 4;
          }
          //console.log();
          SliderVarsLandPlot[i].value = cropAvgSoil[selectedCrop][cropSoilVars[cropSoilVarIndex]];
          console.log("hye");
          onChangeFunc(i, SliderVarsLandPlot[i].value, minAndMaxValues, sliderMarks);
        }
      }catch(errormsg){
        console.log(errormsg);
      }
    }
  }
  for (let i = 1; i <= 4; i++){
    Sliders.push(
      <ThemeProvider theme={theme}>
        <Slider id={"slider_"+i} 
          orientation="vertical"
          defaultValue={SliderVars[i][2]}
          valueLabelDisplay="auto"
          min={minAndMaxValues[i].min}
          max={minAndMaxValues[i].max}
          step={sliderStepValues[i]}
          color={"slider_"+i}
          marks={sliderMarks[i]}

          value={params.mode === "landPlot" || params.mode === "cropView"? SliderVarsLandPlot[i].value : SliderVars[i][0]}
          onChange={(event) => SliderVars[i][1](event.target.value) & onChangeFunc(i, event.target.value, minAndMaxValues)}
        />
      </ThemeProvider>
    );

    SliderInputs.push(
      <>
        <div class="slider_input_container">
          <a>{sliderInputUnitMeasure[i]}</a>
          <Input
            value={params.mode === "landPlot" || params.mode === "cropView"? SliderVarsLandPlot[i].value : SliderVars[i][0]}
            size="small"
            onChange={(event) => SliderVars[i][1](event.target.value) & onChangeFunc(i, event.target.value, minAndMaxValues)}
            inputProps={{
              step: inputStepValues[i],
              min: minAndMaxValues[i].min,
              max: minAndMaxValues[i].max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </div>
      </>
    );
    
    SlidersTitles.push(
      <>
        <div class={"slider_input_container"}>
          <img src={"/Images/App/"+sliderImgSrc[i]+".png"}></img>
          <a class="slider_title">{sliderTitles[i]}</a>
        </div>
      </>
    );
  }

  return(
    <>
      <div class={"adjust_soil_box fill_in_box" + classToAdd} style={soilBoxStyle}>
        <h1>{soil_box_title} soil conditions</h1>
        <AvgText enabled={params.mode === "landPlot" || params.mode === "cropView"? true : false} cropView = {params.mode === "cropView"? true : false}></AvgText>
        <div class="slider_container">
          {SlidersTitles}
          {Sliders}
          {SliderInputs}
        </div>
        <Button id="search_crops_btn" variant="contained">Search crops</Button>
      </div>
    </>
  );
}

export default AdjustSoilCon;
