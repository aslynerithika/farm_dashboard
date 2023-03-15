import './CropInfo.css';
import cropList from '../../CustomHooks/FetchCropInfo';

//  const btn = document.getElementById("button");
// btn.addEventListener("click", myfunct())
// var indexNum;
// function myfunct(){
// indexNum ++
// cropName = cropList[Wheat]
// }
// function changeCropinfo(cropname){
//   cropName = cropList[cropname].name;
// }


function CropInfo(){
  const CropName = "Wheat";
  const crop = cropList[CropName]
  return(
    <>
      <div class="CropInfo_box fill_in_box">
         <div class="Cropshow-container">
        <div class="Caption"> 
        <h1>{crop.name}</h1>
          <p>{crop.desc}</p>
            <ul>
              <li>The expenses and upkeep required for cultivating {crop.name}: {crop.Cost} </li>
              <li>The yield potential of {crop.name} crops: {crop.Yield}</li>
              <li>The The typical duration of a {crop.name} growth: {crop.GrowTime}</li>
            </ul> 
        
            </div>  
            <img src={crop.image} alt="Image of wheat"></img> 
         </div> 
        </div>
    </>
  );
}

export default CropInfo;