import React, { useState } from 'react';
import Button from '@mui/material/Button';
import cropList from '../../CustomHooks/FetchCropInfo';
import './CropInfo.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
 

function CropInfo() {
  const [cropName, setCropName] = useState('Wheat');
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
             <Tooltip class="Tooltip" title="Maintenance Cost" arrow>
               <li> <img src="./Images/App/money-bag-icon.png"></img>{crop.Cost}</li>
             </Tooltip>
             <Tooltip class="Tooltip" title="Yield" arrow>
            <li> <img src="./Images/App/yield-icon.png"></img>{crop.Yield}</li>
             </Tooltip>
            <Tooltip class="Tooltip" title="Growth Time" arrow>
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