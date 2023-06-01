import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import cropList from '../../CustomHooks/FetchCropInfo';
import './CropInfo.css';
import Tooltip from '@mui/material/Tooltip';
import { selectedCropContext } from '../../pages/CropView';
// import { blue } from '@mui/material/colors';
// import { padding } from '@mui/system';
 

function CropInfo() {
  const queryParameters = new URLSearchParams(window.location.search)

  const {selectedCrop, setSelectedCrop} = useContext(selectedCropContext);

  //Default is Wheat
  let cropNameURL = 'Wheat'
  /*Checks to see if a crop name has been added into the URL.
  if it has, set the current crop name to the name given in the URL
   */
  if(queryParameters.get("crop") != null){
    cropNameURL = queryParameters.get("crop")
  }
  const [cropName, setCropName] = useState(cropNameURL);
  const crop = cropList[cropName];

  const handlePrevious = () => {
    const cropNames = Object.keys(cropList);
    const currentIndex = cropNames.indexOf(cropName);
    const previousIndex = currentIndex === 0 ? cropNames.length - 1 : currentIndex - 1;
    const previousCropName = cropNames[previousIndex];
    setCropName(previousCropName);
    setSelectedCrop(previousCropName);
    window.history.pushState(null, null, `?crop=${previousCropName}`);


  };

  const handleNext = () => {
    const cropNames = Object.keys(cropList);
    const currentIndex = cropNames.indexOf(cropName);
    const nextIndex = currentIndex === cropNames.length - 1 ? 0 : currentIndex + 1;
    const nextCropName = cropNames[nextIndex];
    setCropName(nextCropName);
    setSelectedCrop(nextCropName);
    window.history.pushState(null, null, `?crop=${nextCropName}`);
  };

  return (
    <div className="CropInfo_box fill_in_box">
      <div className="Cropshow-container"> 
        <div className="Caption"> 
        <div class = "Cropinformation">
        <h1>{crop.name}</h1> 
          <img src={crop.image} alt="Image of Crop"></img> 
          <p>{crop.desc}</p>
          </div> 
          <div class = "Image_icons">

             <Tooltip id="maintenance-cost" placement="top" title="Maintenance Cost" arrow> 
                <img src="./Images/App/repairCost.png"></img></Tooltip>   <p>{crop.Cost}</p>   
              <Tooltip id="Yield" placement="top" title="Yield" arrow> 
             <img src="./Images/App/yieldBlack.png"></img></Tooltip>  <p>{crop.Yield}</p>  

           <Tooltip id="Growth-time" placement="top" title="Growth Time" arrow> 
             <img src="./Images/App/timer.png"></img></Tooltip>  <p>{crop.GrowTime}</p>  
          </div>
        </div>  
        <div className='CropNavigationbtn'>
          <Button variant="contained" size="small" onClick={handlePrevious}>Previous</Button>
          <Button variant="contained" size="small" onClick={handleNext}>Next</Button>
        </div>
      </div> 
    </div>
  );
}

export default CropInfo;