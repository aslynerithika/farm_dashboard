import LandPlotSelect from '../AppComponenets/LandPlotSelectFolder/LandPlotSelect.js';
import Chart from '../AppComponenets/ChartFolder/Chart.js';
import Home from './Home.js';
import '../../src/CSS/landplots.css';
import React, {useState} from 'react';
export const selectedLandPlotContext = React.createContext(0);

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
  maxWidth: "900px"
}
const section_1 = {
  height: "200px",
  marginTop: "30px"
}
const section_2 = {
  height: "600px",
  marginTop: "30px"
}
function LandPlots() {
  const [selectedLandPlot, setSelectedLandPlot] = useState(1);
  return(
    <>
      <selectedLandPlotContext.Provider value={{selectedLandPlot: selectedLandPlot, setSelectedLandPlot: setSelectedLandPlot}}>
        <div class="section" style={section_1}>
          <div style={LandPlotSelectStyle} class="page_box border_none">
            <LandPlotSelect></LandPlotSelect>
          </div>
        </div>
        <div class="section" style={section_2}>
          <div style={ChartStyle} class="page_box">
            <Chart></Chart>
          </div>
        </div>
        <Home disableAdjustSoilCon="true" mode="landPlot"></Home>
      </selectedLandPlotContext.Provider>
    </>
  );
}

export default LandPlots;
