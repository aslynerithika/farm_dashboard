import AdjustSoilCon from '../src/AppComponenets/AdjustSoilConFolder/AdjustSoilCon.js';
import SuitableCrops from '../src/AppComponenets/SuitableCropsFolder/SuitableCrops.js';
import NavHeader from '../src/AppComponenets/NavHeaderFolder/NavHeader.js';


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
function App() {
  return(
    <>
      <NavHeader></NavHeader>
      <div class="page_content">
        <div style={AdjustSoilConBoxStyle} class="page_box">
          <AdjustSoilCon></AdjustSoilCon>
        </div>
        <div style={SuitableCropsBoxStyle} class="page_box">
          <SuitableCrops></SuitableCrops>
        </div>
      </div>
    </>
  );
}

export default App;
