import './SuitableCrops.css';

function DisplayInfo(){
    
}
function SuitableCrops(){

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

    const Crop =
        (name,
            lowerPHLimit,
            upperPHLimit,
            lowerTempLimit,
            upperTempLimit,
            lowerHumidityLimit,
            upperHumidityLimit,
            LowerLightLimit,
            upperLightLimit,
            costAndMaintainance,
            cropYield,
            growthTime) => { return { name: name, lowerPHLimit: lowerPHLimit, upperPHLimit: upperPHLimit, lowerTempLimit: lowerTempLimit,
                            upperTempLimit:upperTempLimit, lowerHumidityLimit: lowerHumidityLimit, upperHumidityLimit:upperHumidityLimit,
                            LowerLightLimit: LowerLightLimit, upperLightLimit: upperLightLimit, costAndMaintainance: costAndMaintainance, cropYield: cropYield,
                            growthTime: growthTime
            }} 

    const wheat = Crop('Wheat','6','6.8','20','30','40',
        '60','35','65','100','450','45');
    
    const rice = Crop('Rice', '6', '6.7', '20', '27', '45',
        '75','50','70', '50', '250', '30')
    
    const corn = Crop('Corn', '5.5', '7', '26', '30', '50',
        '80', '35', '85','75','400','90')
    
    const barley = Crop('Barley','6.5','7','14','20','30',
        '60','20','50','150','500','60')
    
    const oats = Crop('Oats','6.2','6.6','15','25','25',
        '75','10','40','80','300','30')
    
    
  return(
    <>
      <div class="suitable_crops_box fill_in_box">
        <a></a>
          <div class ="cropInfoBox">
            <p class = "cropInfo">
              {wheat.name}<br></br>
              "PH: {wheat.lowerPHLimit} - {wheat.upperPHLimit} | Humidity: {wheat.lowerHumidityLimit}% - {wheat.upperHumidityLimit}"
            </p>
          </div>
      </div>
    </>
  );
}

  export default SuitableCrops;
