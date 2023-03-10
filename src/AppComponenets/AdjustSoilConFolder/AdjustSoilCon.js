import './AdjustSoilCon.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Gradient from "javascript-color-gradient";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useFetchLandPlotsData from '../../CustomHooks/FetchData.js';

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

function onChangeFunc(slideNum, sliderValue){
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
    var markLabelNum = markLabel.textContent.match(/\d+/g);
    if(markLabelNum[1]){
      markLabelNum = markLabelNum[0]+"."+markLabelNum[1];
    }
    if(parseFloat(markLabelNum) <= sliderValue){
      if (!window.matchMedia("(min-width: 900px)").matches){
        if(count % 2 == 0){
          markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
          markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
        }else{
          markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
          markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
        }
      }else{
        markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
        markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: visible !important");
      }
    }else{
      markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
      markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
    }
    count++;
  });
};

function AdjustSoilCon(params){

  const [MoistMaxAndMin, setMoistMaxAndMin] = useState({min:null, max:null});
  const [phMaxAndMin, setphMaxAndMin] = useState({min:null, max:null});
  const [SunlightMaxAndMin, setSunlightMaxAndMin] = useState({min:null, max:null});
  const [TempMaxAndMin, setTempMaxAndMin] = useState({min:null, max:null});

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

  const landPlotsData = useFetchLandPlotsData();
  landPlotsData.then((successData) => {
    var soilVariablesList = {
      1 : {"min" : null, "max" : null},
      2 : {"min" : null, "max" : null},
      3 : {"min" : null, "max" : null},
      4 : {"min" : null, "max" : null}
    };
    const API_SOIL_VARS = {1:"AVG_Humidity__", 2:"PH", 3:"AVG_Light__", 4:"Temp_C"};
    for(var i = 0; i < successData.length; i++){
      for(var j = 1; j <= Object.keys(soilVariablesList).length; j++){
        if(soilVariablesList[j]["max"] == null || successData[i][API_SOIL_VARS[j]] > soilVariablesList[j]["max"]){
          soilVariablesList[j]["max"] = successData[i][API_SOIL_VARS[j]];
        }
        if(soilVariablesList[j]["min"] == null || successData[i][API_SOIL_VARS[j]] < soilVariablesList[j]["min"]){
          soilVariablesList[j]["min"] = successData[i][API_SOIL_VARS[j]];
        }
      }
    }
    //console.log(soilVariablesList);
    for(var soilVarIndex = 1; soilVarIndex <= Object.keys(soilVariablesList).length; soilVarIndex++){
      SetminAndMaxValues[soilVarIndex]({min:soilVariablesList[soilVarIndex]["min"], max:soilVariablesList[soilVarIndex]["max"]});

      //console.log("YAALLL"+soilVariablesList[3]["max"]);
      var markLabelsAmount = 6;
      var markLabelsArray = [];
      for(var markLabelCount = 1; markLabelCount < markLabelsAmount; markLabelCount++){
        //console.log("index:"+ soilVarIndex+ " " +soilVariablesList[soilVarIndex]["max"]+" / "+ markLabelsAmount+" = "+soilVariablesList[soilVarIndex]["max"]/markLabelsAmount);
        var maxdiff = soilVariablesList[soilVarIndex]["max"] - soilVariablesList[soilVarIndex]["min"];
        var numToAdd = (maxdiff/markLabelsAmount)*markLabelCount;
        var markValue = soilVariablesList[soilVarIndex]["min"] + numToAdd;
        if(soilVarIndex != 2){
          markValue = Math.trunc(markValue);
        }else{
          markValue = markValue.toFixed(1);
        }
        var addOnList = {value: markValue, label: markValue+sliderInputUnitMeasure[soilVarIndex]};
        //console.log(i+" num"+minAndMaxValues[i].max);
        markLabelsArray.push(addOnList);
      }
      //console.log(markLabelsArray);
      SetsliderMarks[soilVarIndex](markLabelsArray);
    }
    //console.log(sliderMarks);
    // console.log(minAndMaxValues);
    // for(var i = 1; i <= Object.keys(minAndMaxValues).length; i++){
    //   var markLabelsAmount = 6;
    //   var markLabelsArray = [];
    //   for(var markLabelCount = 1; markLabelCount < markLabelsAmount; markLabelCount++){
    //     var addOnList = {value: (minAndMaxValues[i].max/markLabelsAmount)*markLabelCount, label: (minAndMaxValues[i].max/markLabelsAmount)*markLabelCount+sliderInputUnitMeasure[i]};
    //     //console.log(i+" num"+minAndMaxValues[i].max);
    //     markLabelsArray.push(addOnList);
    //   }
    //   SetsliderMarks[i](markLabelsArray);
    // }
    //console.log(sliderMarks);
  })
  .catch((failMsg) => {
    console.log(failMsg);
  });

  useEffect(() => {
    var sliderInputs = document.getElementsByClassName("MuiInputBase-input");
    for(var i = 1; i < sliderInputs.length+1; i++){
      onChangeFunc(i, parseFloat(sliderInputs[i-1].value));
    }
  });

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

          value={SliderVars[i][0]}
          onChange={(event) => SliderVars[i][1](event.target.value) & onChangeFunc(i, event.target.value)}
        />
      </ThemeProvider>
    );

    SliderInputs.push(
      <>
        <div class="slider_input_container">
          <a>{sliderInputUnitMeasure[i]}</a>
          <Input
            value={SliderVars[i][0]}
            size="small"
            onChange={(event) => SliderVars[i][1](event.target.value) & onChangeFunc(i, event.target.value)}
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
      <div class={"adjust_soil_box fill_in_box" + classToAdd}>
        <h1>Adjust soil conditions</h1>
        <div class="slider_container">
          {SlidersTitles}
          {Sliders}
          {SliderInputs}
        </div>
        <Button variant="contained">Search crops</Button>
      </div>
    </>
  );
}

export default AdjustSoilCon;
