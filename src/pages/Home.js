import AdjustSoilCon from '../AppComponenets/AdjustSoilConFolder/AdjustSoilCon.js';
import SuitableCrops from '../AppComponenets/SuitableCropsFolder/SuitableCrops.js';
import '../../src/CSS/index.css';

const AdjustSoilConBoxStyle = {
  marginLeft: "auto"
}
const SuitableCropsBoxStyle = {
  minWidth: "400px",
  maxWidth: "800px",
  minHeight: "400px",
  maxHeight: "600px",
  marginRight: "auto"
}
function Home(parms){
  return(
    <>
      <div class="page_content">
        <div style={AdjustSoilConBoxStyle} class="page_box">
          <AdjustSoilCon disableAdjustSoilCon={parms.disableAdjustSoilCon !== "true"? "false" : "true"}></AdjustSoilCon>
        </div>
        <div style={SuitableCropsBoxStyle} class="page_box">
          <SuitableCrops></SuitableCrops>
        </div>
      </div>
    </>
  );
}

export default Home;
