import LandPlotSelect from '../AppComponenets/LandPlotSelectFolder/LandPlotSelect.js';
import Chart from '../AppComponenets/ChartFolder/Chart.js';
import Home from './Home.js';
import '../../src/CSS/landplots.css';

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
  return(
    <>
      <div class="section" style={section_1}>
        <div style={LandPlotSelectStyle} class="page_box">
          <LandPlotSelect></LandPlotSelect>
        </div>
      </div>
      <div class="section" style={section_2}>
        <div style={ChartStyle} class="page_box">
          <Chart></Chart>
        </div>
      </div>
      <Home></Home>
    </>
  );
}

export default LandPlots;
