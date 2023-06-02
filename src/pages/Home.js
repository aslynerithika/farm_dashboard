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
  var pageContentHeight;
  if(parms.mode == "landPlot" && parms.switch){
    pageContentHeight = "900px";
  }else if(parms.mode == "landPlot" && !parms.switch){
    pageContentHeight = "700px";
  }else if(parms.mode != "landPlot"){
    pageContentHeight = "900px";
  }
  return(
    <>
      <div style={{height: pageContentHeight}} class={parms.mode == "landPlot" && parms.switch? "page_content": "page_content smallerPageContent"}>
        <div style={AdjustSoilConBoxStyle} class="page_box border_none">
          <AdjustSoilCon disableAdjustSoilCon={parms.disableAdjustSoilCon !== "true"? "false" : "true"} mode={parms.mode}></AdjustSoilCon>
        </div>
        <div style={SuitableCropsBoxStyle} class="page_box border_none">
          <SuitableCrops></SuitableCrops>
        </div>
      </div>
    </>
  );
}

export default Home;
