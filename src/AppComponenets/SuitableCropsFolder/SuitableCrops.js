import './SuitableCrops.css';
import React, { useEffect, useState, useContext } from 'react';
import {Container} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import Button from "@mui/material/Button";
import { selectedDateContext } from '../../pages/LandPlots';
import { selectedLandPlotContext } from '../../pages/LandPlots';
import cropList from '../../CustomHooks/FetchCropInfo';
import Gradient from "javascript-color-gradient";

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
let imageURL
//tempGradient.getColor(TempDefaultValue)
const rankColorGradient = new Gradient()
  .setColorGradient("#00ff2a","#f2ff00", "#ff0000")
  .setMidpoint(15);

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
     cropScore,
     imageURL) => { return { name: name, lowerPHLimit: lowerPHLimit, upperPHLimit: upperPHLimit, lowerTempLimit: lowerTempLimit,
        upperTempLimit:upperTempLimit, lowerHumidityLimit: lowerHumidityLimit, upperHumidityLimit:upperHumidityLimit,
        lowerLightLimit: lowerLightLimit, upperLightLimit: upperLightLimit, costAndMaintainance: costAndMaintainance, cropYield: cropYield,
        growthTime: growthTime, cropScore: cropScore, imageURL: imageURL
    }}

const wheat = Crop('Wheat','6','6.8','20','30','40',
    '60','35','65','100','450','45','1', 'Wheat.jpeg');

const rice = Crop('Rice', '6', '6.7', '20', '27', '45',
    '75','50','70', '50', '250', '30','1', 'Rice.jpeg')

const corn = Crop('Corn', '5.5', '7', '26', '30', '50',
    '80', '35', '85','75','400','90', '1', 'Corn.jpeg')

const barley = Crop('Barley','6.5','7','14','20','30',
    '60','20','50','150','500','60', '1','Barley.jpeg')

const oats = Crop('Oats','6.2','6.6','15','25','25',
    '75','10','40','80','300','30','1','Oats.jpeg')

const straw = Crop('Straw','5.8','6.3','18','24','35',
    '64','20','60','50','250','28','1','Straw.jpeg')

const sugarBeat = Crop('Sugar Beet','4.7','7.2','15','22','30',
    '50','25','55','70','280','35','1','Sugar-Beet .jpeg')

const oilseed = Crop('Oilseed','5.0','7.8','20','26','28',
    '68','30','100','85','320','25','1','Oilseed.jpeg')

const peas = Crop('Peas','3.6','5.0','15','20','15',
    '60','25','60','110','370','35','1','Peas.jpeg')

const fieldBeans = Crop('Field Beans','6.7','9.7','20','32','15',
    '80','15','80','100','445','40','1','Field-beans.jpeg')

const vegetables = Crop('Vegetables','3','7.5','18','25','20',
    '55','35','65','75','350','35','1','Vegetables.jpeg')

const fruits = Crop('Fruits','4.8','7.8','15','30','30',
    '70','20','65','60','300','55','1','Fruits.jpeg')

const potatoes = Crop('Potatoes','3.6','6.6','9','29','28',
    '68','20','80','80','360','42','1','Potato.jpeg')

const rye = Crop('Rye','2.8','4.2','10','27','18',
    '48','15','55','65','265','28','1','Rye.webp')

const millet = Crop('Millet','2.3','7.3','13','28','45',
    '85','35','95','85','370','35','1','Millet.jpeg')

const cropArray= [wheat, rice, corn, barley, oats, straw, sugarBeat, oilseed, peas, fieldBeans, vegetables, fruits, potatoes, rye, millet];
let bestCropArray = cropArray;


function GetBestCrops(moisture, ph, sunlight, temperature){

    ScoreCrops(moisture,ph,sunlight,temperature);

    bestCropArray.sort((a,b) => b.cropScore - a.cropScore);

    for (let i = 0; i < bestCropArray.length; i++) {
        console.log(bestCropArray[i].cropScore, bestCropArray[i].name);
    }

    return bestCropArray;
}

function ScoreCrops(moisture, ph, sunlight, temperature){
    console.log("click");
    console.log("moisture = " + moisture + ", PH = " + ph + ", sunlight = " + sunlight + ", Temp = "  +temperature)
    for (let i = 0; i < cropArray.length; i++) {
        let score = 0;
        if ((moisture >= cropArray[i].lowerHumidityLimit) && (moisture <= cropArray[i].upperHumidityLimit)) {
            score ++
            console.log(cropArray[i].name + " humid score")
        }
        if ((ph >= cropArray[i].lowerPHLimit) && (moisture <= cropArray[i].upperPHLimit)) {
            score ++
            console.log(cropArray[i].name + " ph score")
        }
        if ((sunlight >= cropArray[i].lowerLightLimit) && (moisture <= cropArray[i].upperLightLimit)) {
            score ++
            console.log(cropArray[i].name + " light score")
        }
        if ((temperature >= cropArray[i].lowerTempLimit) && (temperature <= cropArray[i].upperTempLimit)) {
            score ++
            console.log(cropArray[i].name + " temp score")
        }
        cropArray[i].cropScore = score;
    }
}

function GetRankExtension(key){
    let extension;

    switch (key){
        case 0:
            extension = "st"
            break;
        case 1:
            extension = "nd"
            break;
        case 2:
            extension = "rd"
            break;
        default:
            extension = "th"
            break;
    }
    return extension
}

function GetOpacity(key){
    let test;

    test = 1 - ((key*100)/25)/50;
    console.log("opacity test" + test);
    if(test > .4) {
        return {opacity: test};
    }
    else{
        return{opacity: .4}
    }
}

const ToolTipStyle = {
    "display":"flex",
    "flex-direction": "row",
    "text-align": "center",
    "grid-area": "2 / span 2",
    "justify-content": "center",
    "height": "fit-content",
    "align-items": "center"
};
const ToolTipStyle2 = {
    "display":"flex",
    "flex-direction": "row",
    "text-align": "center",
    "grid-area": "3 / span 2",
    "justify-content": "center",
    "height": "fit-content",
    "align-items": "center",
};


const CreateCropInfoBox = (crop, key) =>{
    return(
        <>
            <Link to={"/cropview?crop="+crop.name} className={"cropInfoLink"}>
            <div className ="cropInfoBox" id={'test' + key}>
                <div className={"cropRank"} >
                    <h3 style={{color: rankColorGradient.getColor(key+1)}}> {key + 1}{GetRankExtension(key)} </h3>
                    <Tooltip class="tooltip" placement="top" title="Maintainance cost" arrow>
                        <div style={ToolTipStyle} class="innerMaintenanceCostBox">
                            <img style={{height: "15px"}}src="/Images/App/info.png"></img>
                            <a style={{height: "fit-content"}}>£{crop.costAndMaintainance}</a>
                        </div>
                    </Tooltip>
                    <Tooltip class="tooltip" title="Growth time" arrow>
                        <div style={ToolTipStyle2} class="innerMaintenanceCostBox cropGrowthTime">
                            <img style={{height: "15px"}}src="/Images/App/timer.png"></img>
                            <a style={{height: "fit-content"}}>{crop.growthTime} days</a>
                        </div>
                    </Tooltip>
                </div>
                <img src={"/Images/Cropimages/"+crop.imageURL} width="100%" height="100%" alt={crop.name}></img>
                <div className="cropInfo">
                    
                        <h3>{crop.name}</h3>
                        <p>{cropList[crop.name].desc}</p>
                        <div class="cropIdealConditions">
                            <img src="/Images/App/moist.png"></img>
                            <a> {crop.lowerHumidityLimit}% - {crop.upperHumidityLimit}%</a>
                            <img src="/Images/App/ph.png"></img>
                            <a> {crop.lowerPHLimit} - {crop.upperPHLimit}</a>
                            <img src="/Images/App/sun.png"></img>
                            <a> {crop.lowerLightLimit}% - {crop.upperLightLimit}%</a>
                            <img src="/Images/App/temp.png"></img>
                            <a> {crop.lowerTempLimit}°C - {crop.upperTempLimit}°C</a>
                        </div>
                </div>
            </div>
            </Link>
        </>
    );
}

function toggleFadeOnScroll(e){
    let element = e.target;
    if((element.scrollHeight - element.scrollTop) == element.clientHeight){
        element.style = "--mask: none";
    }else{
        element.style = "--mask: linear-gradient(to bottom, rgba(0,0,0, 1) 0, rgba(0,0,0, 1) 90%, rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 0 ) 100% 50% / 100% 100% repeat-x;";
    }
}
function SuitableCrops(){

    const [moistValue, setmoistValue] = useState(30);
    const [phValue, setphValue] = useState(7);
    const [sunlightValue, setsunlightValue] = useState(30);
    const [tempValue, settempValue] = useState(23);
    const {selectedDate, setSelectedDate} = useContext(selectedDateContext);
    const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
    const setSoilVariableArray = [
        setmoistValue, setphValue, setsunlightValue, settempValue
    ];

    useEffect(() => {
        const search_crops_btn = document.getElementById("search_crops_btn");
        const [moisture, pH, sunlight, temp] = document.getElementsByTagName("input");

        search_crops_btn.addEventListener("click", () => {
            var SoilVariableArray = [
                moisture.value, pH.value, sunlight.value, temp.value
            ];
            setSoilVariableArray.map((setSoilVar, indexNum) => {setSoilVar(SoilVariableArray[indexNum])})
        });

    }, []);

    useEffect(() => {
        const [moisture, pH, sunlight, temp] = document.getElementsByTagName("input");
        var SoilVariableArray = [
            moisture.value, pH.value, sunlight.value, temp.value
        ];
        setSoilVariableArray.map((setSoilVar, indexNum) => {setSoilVar(SoilVariableArray[indexNum])})
    },[selectedDate, selectedLandPlot])// could have adjust soil slide values in a state variable instead and listen to those changes.

    const bestCropArray = GetBestCrops(moistValue,phValue,sunlightValue,tempValue);

    return(
        <>
            
            <div class="suitable_crops_box fill_in_box">
                <h1>Most Suitable Crops</h1>
                <div class="suitable_crops_innerBox" onScroll={(e) => toggleFadeOnScroll(e)}>
                    {bestCropArray.map((crop, key) =>(CreateCropInfoBox(crop, key)))}
                </div>
            </div>
        </>

    );
}

export default SuitableCrops;
