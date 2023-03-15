import './SuitableCrops.css';
import React, { useEffect, useState } from 'react';


let lowerPHLimit;
let upperPHLimit;
let lowerTempLimit;
let upperTempLimit;
let lowerHumidityLimit;
let upperHumidityLimit;
let LowerLightLimit;
let upperLightLimit;
let costAndMaintainance;
let cropYield;
let growthTime;
let name;
let cropScore

const Crop =
    (name,
     lowerPHLimit,
     upperPHLimit,
     lowerTempLimit,
     upperTempLimit,
     lowerHumidityLimit,
     upperHumidityLimit,
     lowerLightLimit,
     upperLightLimit,
     costAndMaintainance,
     cropYield,
     growthTime,
     cropScore) => { return { name: name, lowerPHLimit: lowerPHLimit, upperPHLimit: upperPHLimit, lowerTempLimit: lowerTempLimit,
        upperTempLimit:upperTempLimit, lowerHumidityLimit: lowerHumidityLimit, upperHumidityLimit:upperHumidityLimit,
        lowerLightLimit: lowerLightLimit, upperLightLimit: upperLightLimit, costAndMaintainance: costAndMaintainance, cropYield: cropYield,
        growthTime: growthTime, cropScore: cropScore
    }}

const wheat = Crop('Wheat','6','6.8','20','30','40',
    '60','35','65','100','450','45','3');

const rice = Crop('Rice', '6', '6.7', '20', '27', '45',
    '75','50','70', '50', '250', '30','4')

const corn = Crop('Corn', '5.5', '7', '26', '30', '50',
    '80', '35', '85','75','400','90', '1')

const barley = Crop('Barley','6.5','7','14','20','30',
    '60','20','50','150','500','60', '2')

const oats = Crop('Oats','6.2','6.6','15','25','25',
    '75','10','40','80','300','30','5')

const cropArray= [wheat, rice, corn, barley, oats];
let bestCropArray = cropArray;

function GetBestCrops(moisture, ph, sunlight, temperature){
    
    ScoreCrops(moisture,ph,sunlight,temperature);
    
    bestCropArray.sort((b,a) => b.cropScore - a.cropScore);

    for (let i = 0; i < bestCropArray.length; i++) {
        console.log(bestCropArray[i].cropScore, bestCropArray[i].name);
    }
    
    return bestCropArray;
}

function ScoreCrops(moisture, ph, sunlight, temperature){
    for (let i = 0; i < 5; i++) {
        let score = 0;
        if ((moisture >= cropArray[i].lowerHumidityLimit) && (moisture <= cropArray[i].upperHumidityLimit)) {
            score ++
        }
        if ((ph >= cropArray[i].lowerPHLimit) && (moisture <= cropArray[i].upperPHLimit)) {
            score ++
        }
        if ((sunlight >= cropArray[i].lowerLightLimit) && (moisture <= cropArray[i].upperLightLimit)) {
            score ++
        }
        if ((temperature >= cropArray[i].lowerTempLimit) && (moisture <= cropArray[i].upperTempLimit)) {
            score ++
        }
        cropArray[i].cropScore = score;
    }
}
function CreateCropInfoBox(crop, key){

    return(
        <>
            <div className ="cropInfoBox">

                <div className="column cropRank">
                    <h3 className = "cropRankValue">{key + 1}</h3>
                    <p> £{crop.cropYield}</p>
                </div>
                <div className="column cropImage">
                    <img src="#" alt={crop.name}></img>
                </div>
                <div className="column cropInfo">
                    <p className="cropInfo">
                        {crop.name}<br></br>
                        PH: {crop.lowerPHLimit} - {crop.upperPHLimit} | Humidity: {crop.lowerHumidityLimit}%
                        - {crop.upperHumidityLimit} | {crop.lowerTempLimit}°C - {crop.upperTempLimit}°C
                    </p>

                </div>


            </div>
        </>
    );
}
function SuitableCrops(){

    const [moistValue, setmoistValue] = useState(30);
    const [phValue, setphValue] = useState(7);
    const [sunlightValue, setsunlightValue] = useState(30);
    const [tempValue, settempValue] = useState(23);

    useEffect(() => {
        const setSoilVariableArray = [
            setmoistValue, setphValue, setsunlightValue, settempValue
        ];

        const search_crops_btn = document.getElementById("search_crops_btn");
        const [moisture, pH, sunlight, temp] = document.getElementsByTagName("input");

        search_crops_btn.addEventListener("click", () => {
            var SoilVariableArray = [
                moisture.value, pH.value, sunlight.value, temp.value
            ];
            setSoilVariableArray.map((setSoilVar, indexNum) => {setSoilVar(SoilVariableArray[indexNum])})
        });
    }, []);

    const bestCropArray = GetBestCrops(moistValue,phValue,sunlightValue,tempValue);

  return(
    <>
      <div class="suitable_crops_box fill_in_box">
        <a></a>
          {bestCropArray.map((crop, key) =>(CreateCropInfoBox(crop, key)))}

          
      </div>
    </>

  );
}

  export default SuitableCrops;
