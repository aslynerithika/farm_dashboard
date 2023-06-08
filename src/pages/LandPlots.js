import LandPlotSelect from '../AppComponenets/LandPlotSelectFolder/LandPlotSelect.js';
import Chart from '../AppComponenets/ChartFolder/Chart.js';
import Home from './Home.js';
import '../../src/CSS/landplots.css';
import React, {useState, useEffect} from 'react';
export const selectedLandPlotContext = React.createContext(0);
export const selectedDateContext = React.createContext([]);

const LandPlotSelectStyle = {
  minHeight: "unset",
  minWidth: "400px",
  maxHeight: "unset",
  maxWidth: "900px"
}
const ChartStyle = {
  minHeight: "unset",
  minWidth: "400px",
  maxHeight: "unset",
  maxWidth: "1000px"
}
const section_1 = {
  height: "200px",
  marginTop: "30px"
}
const section_2 = {
  height: "fit-content",
  marginTop: "30px"
}
const section_3 = {
  height: "0px"
}

function ChartAbove(){
  return(
      <>
          <div class="section" style={section_2}>
            <div style={ChartStyle} class="page_box">
              <Chart refresh="true"></Chart>
            </div>
          </div>
          <div class="section" style={section_3}>
            <div id="switchContainer">
              <img id="switchBtn" src="/Images/App/switch.png"></img>
              <a class="switchToolTip toolTip_MoveLeft">Move chart</a>
              <a class="switchToolTip toolTip_MoveRight">down</a>
            </div>
          </div>
          <Home switch={true} disableAdjustSoilCon="true" mode="landPlot"></Home>
      </>)
}
function ChartUnder(){
  return(
      <>
          <Home switch={false} disableAdjustSoilCon="true" mode="landPlot"></Home>
          <div class="section" style={section_3}>
            <div id="switchContainer" class="switchBtnChartUnder">
              <img id="switchBtn" src="/Images/App/switch.png"></img>
              <a class="switchToolTip toolTip_MoveLeft">Move chart</a>
              <a class="switchToolTip toolTip_MoveRight">up</a>
            </div>
          </div>
          <div class="section" style={section_2}>
            <div style={ChartStyle} class="page_box">
              <Chart refresh="true"></Chart>
            </div>
          </div>
      </>)
}

function SwitchSections(props){
  if (props.switch) {
    return <ChartAbove />;
  }
  return <ChartUnder />;
  // return(
  //     <>
  //     </>)
}
function LandPlots(props) {
  const [selectedLandPlot, setSelectedLandPlot] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [switchBool, setSwitchBool] = useState(props.switch);
  useEffect(() => {
    var switchBtn = document.getElementById("switchBtn");
    switchBtn.addEventListener("click", function() {
      setSwitchBool(switchBool? false : true);
    });
  });

  return(
    <>
      <selectedLandPlotContext.Provider value={{selectedLandPlot: selectedLandPlot, setSelectedLandPlot: setSelectedLandPlot}}>
        <selectedDateContext.Provider value={{selectedDate: selectedDate, setSelectedDate: setSelectedDate}}>
          <div class="section" style={section_1}>
            <div style={LandPlotSelectStyle} class="page_box border_none">
              <LandPlotSelect></LandPlotSelect>
            </div>
          </div>
          <SwitchSections switch={switchBool}></SwitchSections>
        </selectedDateContext.Provider>
      </selectedLandPlotContext.Provider>
    </>
  );
}

export default LandPlots;
