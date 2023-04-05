import React, { useState } from 'react';
import Button from '@mui/material/Button';
import cropList from '../../CustomHooks/FetchCropInfo';
import './CropInfo.css';
import Tooltip from '@mui/material/Tooltip';
import { blue } from '@mui/material/colors';
import { padding } from '@mui/system';
 

function CropInfo() {

  const queryParameters = new URLSearchParams(window.location.search)
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
    setCropName(cropNames[previousIndex]);
  };

  const handleNext = () => {
    const cropNames = Object.keys(cropList);
    const currentIndex = cropNames.indexOf(cropName);
    const nextIndex = currentIndex === cropNames.length - 1 ? 0 : currentIndex + 1;
    setCropName(cropNames[nextIndex]);
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
             <ul> 
             <Tooltip id="maintenance-cost" title="Maintenance Cost">
               <li> <img src="./Images/App/money-bag-icon.png"></img>{crop.Cost}</li>
             </Tooltip>
             <Tooltip id="Yield"  title="Yield" >
            <li> <img src="./Images/App/yield-icon.png"></img>{crop.Yield}</li>
             </Tooltip>
            <Tooltip id="Growth-time" title="Growth Time">
            <li> <img src="./Images/App/timer-icon.png"></img>{crop.GrowTime}</li>
            </Tooltip>
          </ul> 
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