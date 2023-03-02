import { Link } from "react-router-dom";

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
          <h1 class="page_title">FARM DASHBOARD</h1>
        </div>
        <div class="nav_links">
          <a><Link to="/">Home</Link></a>
          <a><Link to="/landplots">Land Plots</Link></a>
        </div>
      </nav>
    </>
  );
}

export default NavHeader;
