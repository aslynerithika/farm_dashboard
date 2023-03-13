import AdjustSoilCon from '../AppComponenets/AdjustSoilConFolder/AdjustSoilCon.js';
import CropInfo from '../AppComponenets/CropInfoFolder/CropInfo.js';
import '../../src/CSS/index.css';

const AdjustSoilConBoxStyle = {
  marginLeft: "auto"
}
const CropInfoBoxStyle = {
  minWidth: "400px",
  maxWidth: "800px",
  minHeight: "400px",
  maxHeight: "600px",
  marginRight: "auto"
}
function CropView() {
  return(
    <>
      <div class="page_content">
        <div style={AdjustSoilConBoxStyle} class="page_box">
          <AdjustSoilCon disableAdjustSoilCon="true"></AdjustSoilCon>
        </div>
        <div style={CropInfoBoxStyle} class="page_box">
          <CropInfo></CropInfo>
        </div>
      </div>
    </>
  );
}

export default CropView;
