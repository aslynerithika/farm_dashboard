import AdjustSoilCon from '../AppComponenets/AdjustSoilConFolder/AdjustSoilCon.js';
import CropInfo from '../AppComponenets/CropInfoFolder/CropInfo.js';
import '../../src/CSS/index.css';
import React, { useState } from 'react';
export const selectedCropContext = React.createContext("");

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
  const [selectedCrop, setSelectedCrop] = useState("");
  return(
    <>
      <selectedCropContext.Provider value={{selectedCrop: selectedCrop, setSelectedCrop: setSelectedCrop}}>
        <div class="page_content">
          <div style={AdjustSoilConBoxStyle} class="page_box border_none">
            <AdjustSoilCon disableAdjustSoilCon="true" mode="cropView"></AdjustSoilCon>
          </div>
          <div style={CropInfoBoxStyle} class="page_box border_none">
            <CropInfo></CropInfo>
          </div>
        </div>
      </selectedCropContext.Provider>
    </>
  );
}

export default CropView;
