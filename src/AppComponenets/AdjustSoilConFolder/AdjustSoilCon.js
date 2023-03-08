import './AdjustSoilCon.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Gradient from "javascript-color-gradient";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MoistDefaultValue = 30;
const phDefaultValue = 7;
const SunlightDefaultValue = 30;
const TempDefaultValue = 23;

//const requestURL = 'https://sampledata.elancoapps.com/data';

// let headers = new Headers();

// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');

// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// //headers.append('Access-Control-Allow-Credentials', 'true');

// headers.append('GET', 'POST', 'OPTIONS');

// headers.append('Authorization', 'Basic ');

// fetch(requestURL, {
//     //mode: 'no-cors',
//     //credentials: 'include',
//     method: 'GET',
//     headers: headers
//   })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(error => console.log('Authorization failed : ' + error.message));

// fetch(requestURL, {
//   headers: {
//     Accept: "application/json",
//   },
//   method: "GET"
// })

//const requestURL = 'https://sampledata.elancoapps.com/data';

// async function getData() {
//   const response = await fetch(requestURL, { 
//     method: 'GET', 
//   })
// }

// const url = 'https://sampledata.elancoapps.com/data';
// async function getData() {
//     const response = await fetch(url);
//     const data = await response.json()
//     console.log(data);
// }
// getData();


// var request = new XMLHttpRequest()
// request.open('GET', requestURL, true)
// request.onload = function () {
//   // begin accessing JSON data here
// }
// request.send()


// fetch(requestURL)
//    .then(response => response.json())
//    .then(json => console.log(JSON.stringify(json)))

// var landPlotMinData = {"PH":0, "Temp_C":0, "AVG_Humidity__":0, "AVG_Light__":0};
// var landPlotMaxData = {"PH":0, "Temp_C":0, "AVG_Humidity__":0, "AVG_Light__":0};

// let PHvalues  = landPlotsData.map(function(v) {
//   return v.PH;
// });
// var min = Math.min.apply( null, PHvalues );
// console.log(min)

const minAndMaxValues = {
  1 : {"min":0, "max":100},
  2 : {"min":1, "max":14},
  3 : {"min":0, "max":100},
  4 : {"min":0, "max":50}
}

window.addEventListener("resize", function() {
  var sliders = document.getElementsByClassName("MuiSlider-root");
  var sliderInputs = document.getElementsByClassName("MuiInputBase-input");
  if (!window.matchMedia("(min-width: 900px)").matches){
    for(var i = 0; i < sliders.length; i++){
      var slider = sliders[i];
      var markLabels = slider.querySelectorAll(".MuiSlider-markLabel");
      var markPoints = slider.querySelectorAll(".MuiSlider-mark");
      
      var count = 0;
      markLabels.forEach(function(){
        if(count % 2 != 0){
          markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
          markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
        }
        count++;
      });
    }
  }else{
    for(var i = 1; i < sliderInputs.length+1; i++){
      onChangeFunc(i, parseFloat(sliderInputs[i-1].value));
    }
  }
})
window.addEventListener("load", (event) => {
  var sliderInputs = document.getElementsByClassName("MuiInputBase-input");
  //var sliders = document.getElementsByClassName("MuiSlider-root");
  for(var i = 1; i < sliderInputs.length+1; i++){
    onChangeFunc(i, parseFloat(sliderInputs[i-1].value));
  }

  // for(var i = 0; i < sliderInputs.length; i++){
  //   console.log(i);
  //   sliderInputs[i].value = 0;
  //   //onChangeFunc(i+1, 0);
  // }
});

const tempGradient = new Gradient()
  .setColorGradient("#00d3ff", "#8200ff", "#ff0000")
  .setMidpoint(50);
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
  if(!sliderValue || sliderValue <= 0){
    colorSliderValue = (minAndMaxValues[slideNum]["min"] <= 0? 1 : minAndMaxValues[slideNum]["min"]);
  }
  if(slideNum == 1){
    slider.style.color = moistGradient.getColor(colorSliderValue);
  }else if(slideNum == 2){
    slider.style.color = phGradient.getColor(colorSliderValue);
  }else if(slideNum == 3){
    slider.style.color = sunlightGradient.getColor(colorSliderValue);
  }else if(slideNum == 4){
    slider.style.color = tempGradient.getColor(colorSliderValue);
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
      // MOST RECENT markLabels[count].setAttribute("style","bottom:"+sliderMarks[slideNum][count].value.toString()+"%; "+"visibility: visible !important");
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

      //markLabels[count].style.setProperty("visibility","visible","!important");
    }else{
      //markLabels[count].style.setProperty("visibility","hidden","!important");
      //markLabels[count].setAttribute("style",markLabels[count].style+" visibility: hidden !important");
      markLabels[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
      markPoints[count].setAttribute("style","bottom:"+markLabels[count].style.bottom+"; "+"visibility: hidden !important");
    }
    count++;
  });
};

function AdjustSoilCon(){
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
  const sliderMarks = {
    1 : [{value: 2,label: '0%',},
    {value: 20,label: '20%',},
    {value: 40,label: '40%',},
    {value: 60,label: '60%',},
    {value: 80,label: '80%',},
    {value: 95,label: '100%',}],
  
    2 : [{value: 1.3,label: '1pH',},
    {value: 3.6,label: '3.6pH',},
    {value: 6.3,label: '6.3pH',},
    {value: 9,label: '9pH',},
    {value: 11.3,label: '11.3pH',},
    {value: 13.5,label: '14pH',}],
  
    3 : [{value: 2,label: '0%',},
    {value: 20,label: '20%',},
    {value: 40,label: '40%',},
    {value: 60,label: '60%',},
    {value: 80,label: '80%',},
    {value: 95,label: '100%',}],
  
    4 : [{value: 1.3,label: '0°C',},
    {value: 10,label: '10°C',},
    {value: 20,label: '20°C',},
    {value: 30,label: '30°C',},
    {value: 40,label: '40°C',},
    {value: 48,label: '50°C',}]
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
          min={minAndMaxValues[i]["min"]}
          max={minAndMaxValues[i]["max"]}
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
              min: minAndMaxValues[i]["min"],
              max: minAndMaxValues[i]["max"],
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </div>
      </>
    );
    
    SlidersTitles.push(
      <>
        <div class="slider_input_container">
          <img src={"/Images/App/"+sliderImgSrc[i]+".png"}></img>
          <a class="slider_title">{sliderTitles[i]}</a>
        </div>
      </>
    );
  }

  return(
    <>
      <div class="adjust_soil_box fill_in_box">
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
