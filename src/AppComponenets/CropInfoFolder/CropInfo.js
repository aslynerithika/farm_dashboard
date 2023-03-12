import './CropInfo.css';
const cropList = {
  "Wheat" : {
    name  : "Wheat",
    desc  : "Wheat is a common grain that provides carbohydrates, fiber, vitamins, and minerals Eating wheat-based products can help maintain healthy blood sugar levels and reduce the risk of chronic diseases",
    Yield : "£450",
    Cost  : "£100",
    GrowTime : "45 Days"

  },
  "Rice"  : {
    name  : "Rice",
    desc  : "Rice is a staple food for more than half of the world's population, particularly in Asia. It is a cereal grain that grows in paddies, and is commonly eaten boiled or steamed as a side dish or base for many dishes",
    Yield : "£250",
    Cost  : "£50",
    GrowTime : "30 Days"

  },
  "Corn"  : {
    name  : "Corn",
    desc  : "Rice is a staple food for more than half of the world's population, particularly in Asia. It is a cereal grain that grows in paddies, and is commonly eaten boiled or steamed as a side dish or base for many dishes",
    Yield : "£400",
    Cost  : "£75",
    GrowTime : "30 Days"

  },
  "Barley" : {
    name  : "Barley",
    desc  : "Barley grains are small and oval-shaped, with a hard outer layer called the husk, and a soft starchy interior, Barley is a good source of dietary fiber and vitamins and it has been linked to various health benefits, such as reducing the risk of heart disease and improving digestion.",
    Yield : "£500",
    Cost  : "£150",
    GrowTime : "60 Days"
       
  },
  "Oats" : {
    name  : "Oats",
    desc  : "Oats are a type of cereal grain that is commonly used as a food source for both humans and livestock. They are a rich source of nutrients, including fiber, protein, vitamins, and minerals, making them a popular choice for people looking to improve their overall health.",
    Yield : "£300",
    Cost  : "£80",
    GrowTime : "30 Days"
       
  }

}
// const cropName = cropList["Wheat"].name;
// const btn = document.getElementById("button");
// btn.addEventListener("click", myfunct())
// var indexNum;
// function myfunct(){
// indexNum ++
// cropName = cropList[]
// }
// function changeCropinfo(cropname){
//   cropName = cropList[cropname].name;
// }

function CropInfo(){
  return(
    <>

      <div class="CropInfo_box fill_in_box">
        {/* <div class="Cropshow-container">
        <div class="numbertext">1/5</div>
        <div class="Caption"> 
        <h1>{cropName} </h1>
          <p>Wheat is a common grain that provides carbohydrates, fiber, vitamins, and minerals. 
            Eating wheat-based products can help maintain healthy blood sugar levels and reduce the risk of chronic diseases. </p>
            <ul>
              <li>The expenses and upkeep required for cultivating wheat: £100 </li>
              <li>The yield potential of wheat crops: £450</li>
              <li>The The typical duration of a wheat growth: 45 Days</li>
            </ul> 
            <img src="Images/App/Cropinfoimages/wheatimg.jpeg" alt="Image of wheat"></img>
            </div>


            <div class="numbertext">2/5</div>
        <div class="Caption"> 
        <h1>Rice</h1>
          <p>Wheat is a common grain that provides carbohydrates, fiber, vitamins, and minerals. 
            Eating wheat-based products can help maintain healthy blood sugar levels and reduce the risk of chronic diseases. </p>
            <ul>
              <li>The expenses and upkeep required for cultivating wheat: £50 </li>
              <li>The yield potential of wheat crops: £250</li>
              <li>The The typical duration of a wheat growth: 30
 Days</li>
            </ul> 
            <img src="Images/App/Cropinfoimages/wheatimg.jpeg" alt="Image of wheat"></img>
            </div>


         </div>  */}
        </div>
    </>
  );
}

export default CropInfo;