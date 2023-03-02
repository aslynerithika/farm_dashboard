import AdjustSoilCon from '../src/AppComponenets/AdjustSoilConFolder/AdjustSoilCon.js';

function NavHeader(){
  return(
    <>
      <nav>
        <div class="nav_logo_container">
          <img class="nav_logo" src="/Images/App/TransparentElancoLogo.png"></img>
          <a href="https://www.elanco.com/en-us" class="nav_logo_Button"></a>
          <div class="nav_logo_DarkBlueCircle"></div>
        </div>
        <div class="nav_title_container">
          <img class="page_icon" src="/Images/App/farmlogo2.png"></img>
          <h1 class="page_title">FARM DASHBAORD</h1>
        </div>
        <div class="nav_links">
          <a href="">Home</a>
          <a href="">Land plots</a>
        </div>
      </nav>
    </>
  );
}

function App() {
  return(
    <>
      <NavHeader></NavHeader>
      <div class="page_content">
        <div class="adjust_soil_conditions">
          <AdjustSoilCon></AdjustSoilCon>
        </div>
        <div class="suitable_crops">

        </div>
      </div>
    </>
  );
}

export default App;
