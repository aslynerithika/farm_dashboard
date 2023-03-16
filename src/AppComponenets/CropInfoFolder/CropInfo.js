import React, { useState } from 'react';
import Button from '@mui/material/Button';
import cropList from '../../CustomHooks/FetchCropInfo';
import './CropInfo.css';

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
          <h1>{crop.name}</h1>
          <p>{crop.desc}</p>
          <ul>
            <li>The expenses and upkeep required for cultivating {crop.name}: {crop.Cost} </li>
            <li>The yield potential of {crop.name} crops: {crop.Yield}</li>
            <li>The typical duration of a {crop.name} growth: {crop.GrowTime}</li>
          </ul> 
          <img src={crop.image} alt="Image of wheat"></img> 
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